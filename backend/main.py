
from datetime import datetime, timezone
from functools import lru_cache
from io import BytesIO
from time import perf_counter

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from transformers import pipeline


app = FastAPI(
    title="DeepCheck Backend",
    description="Backend API for AI-generated image detection",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_FORMATS = {"JPEG", "PNG"}

MODEL_NAME = "capcheck/ai-image-detection"


@lru_cache(maxsize=1)
def get_detector():
    """Load the model once and reuse it for subsequent requests."""
    return pipeline(
        "image-classification",
        model=MODEL_NAME,
        device=-1,  # CPU
    )


@app.get("/")
def home():
    return {
        "message": "DeepCheck Backend is running",
        "model": MODEL_NAME,
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "deepcheck-backend",
    }


@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    start = perf_counter()

    if not image.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is missing",
        )

    content_type = (image.content_type or "").lower()

    if content_type not in {"image/jpeg", "image/png"}:
        raise HTTPException(
            status_code=415,
            detail="Only JPG and PNG images are supported",
        )

    data = await image.read(MAX_FILE_SIZE + 1)

    if not data:
        raise HTTPException(
            status_code=400,
            detail="Image is empty",
        )

    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image must be 10 MB or smaller",
        )

    try:
        with Image.open(BytesIO(data)) as source:
            image_format = source.format

            if image_format not in ALLOWED_FORMATS:
                raise HTTPException(
                    status_code=415,
                    detail="Only JPG and PNG images are supported",
                )

            source.verify()

        with Image.open(BytesIO(data)) as source:
            img = source.convert("RGB")

    except HTTPException:
        raise
    except (
        UnidentifiedImageError,
        OSError,
        ValueError,
    ):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image",
        )

    try:
        detector = get_detector()
        predictions = detector(img, top_k=2)

        if not predictions:
            raise HTTPException(
                status_code=500,
                detail="The model returned no predictions",
            )

        best = max(
            predictions,
            key=lambda item: float(item["score"]),
        )

        label = str(best["label"]).strip().lower()
        confidence = round(float(best["score"]) * 100, 2)

        if any(
            token in label
            for token in ("fake", "ai-generated", "ai generated", "artificial", "synthetic")
        ):
            prediction = "ai"

        elif any(
            token in label
            for token in ("real", "human")
        ):
            prediction = "real"

        else:
            raise HTTPException(
                status_code=500,
                detail=f"Unsupported model label: {label}",
            )

    except HTTPException:
        raise
    except Exception:

        raise HTTPException(
            status_code=500,
            detail=(
                "Model inference failed. Check the backend terminal "
                "for details and verify that the model can be downloaded."
            ),
        )

    elapsed_ms = round(
        (perf_counter() - start) * 1000,
        2,
    )

    return {
        "filename": image.filename,
        "status": "completed",
        "format": image_format,
        "prediction": prediction,
        "confidence": confidence,
        "model_version": MODEL_NAME,
        "processing_time_ms": elapsed_ms,
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "message": (
            "Image analysis completed. "
            "The prediction is an estimate, not proof of authenticity."
        ),
    }
