"""DeepCheck: локальный backend с вашей сохранённой пилотной моделью.

Положите файл в backend/main_local.py. Исходный backend/main.py не меняйте.
Запуск из корня deepfake-detection-platform, в уже работающей ML-среде .venv:
    python -m pip install fastapi uvicorn python-multipart
    python -m uvicorn backend.main_local:app --host 127.0.0.1 --port 8000

Это локальный прототип, не сервер для открытого доступа из интернета.
Обучение не запускается; веса и исходные ML-файлы не перезаписываются.
"""

from contextlib import asynccontextmanager
from datetime import datetime, timezone
from hashlib import sha256
from io import BytesIO
import logging
from pathlib import Path
import sys
from threading import Lock
from time import perf_counter
from typing import Any

from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from starlette.concurrency import run_in_threadpool
import torch
from torchvision import transforms

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CHECKPOINT_PATH = PROJECT_ROOT / "ml" / "checkpoints" / "pilot_model.pth"
MODEL_VERSION = "pilot-cifake-v1"
MAX_FILE_SIZE = 10 * 1024 * 1024
# Дополнительная защита памяти при распаковке сильно сжатых изображений.
MAX_IMAGE_PIXELS = 40_000_000
ALLOWED_FORMATS = {"JPEG", "PNG"}
logger = logging.getLogger("uvicorn.error")


class PilotDetector:
    """Загружает локальные веса один раз; обучение отсутствует."""

    def __init__(self) -> None:
        if not CHECKPOINT_PATH.is_file():
            raise FileNotFoundError(
                f"Не найден файл модели: {CHECKPOINT_PATH}. "
                "Проверьте расположение уже сохранённого pilot_model.pth. "
                "Повторное обучение не требуется."
            )
        if not (PROJECT_ROOT / "ml" / "model.py").is_file():
            raise FileNotFoundError("Не найден ml/model.py рядом с папкой backend.")

        # Позволяет импортировать ml/model.py, даже если backend запускают
        # с --app-dir. train.py и predict.py здесь не импортируются.
        if str(PROJECT_ROOT) not in sys.path:
            sys.path.insert(0, str(PROJECT_ROOT))
        from ml.model import create_model

        # Загружайте только собственный доверенный checkpoint.
        checkpoint = torch.load(
            CHECKPOINT_PATH, map_location="cpu", weights_only=True
        )
        required = {"model_state_dict", "image_size", "class_to_idx"}
        if not isinstance(checkpoint, dict) or not required.issubset(checkpoint):
            raise ValueError(
                "В checkpoint нужны model_state_dict, image_size и class_to_idx."
            )
        image_size = checkpoint["image_size"]
        if type(image_size) is not int or not 1 <= image_size <= 2048:
            raise ValueError("Некорректный image_size в checkpoint.")

        mapping = checkpoint["class_to_idx"]
        if (
            not isinstance(mapping, dict)
            or set(mapping) != {"REAL", "FAKE"}
            or any(type(index) is not int for index in mapping.values())
            or set(mapping.values()) != {0, 1}
        ):
            raise ValueError("Ожидаются классы REAL и FAKE с разными индексами 0 и 1.")
        # Не предполагаем, какой класс равен нулю: читаем это из весов.
        self.class_names = {index: name for name, index in mapping.items()}
        self.model = create_model().to("cpu")
        self.model.load_state_dict(checkpoint["model_state_dict"], strict=True)
        self.model.eval()
        self.model.requires_grad_(False)
        # Совпадает с присланным predict.py: RGB -> Resize -> ToTensor.
        # Не добавляем другую нормализацию или случайные преобразования.
        self.transform = transforms.Compose([
            transforms.Resize((image_size, image_size)),
            transforms.ToTensor(),
        ])
        self.lock = Lock()
        digest = sha256()
        with CHECKPOINT_PATH.open("rb") as weights_file:
            for chunk in iter(lambda: weights_file.read(1024 * 1024), b""):
                digest.update(chunk)
        self.checkpoint_sha256 = digest.hexdigest()

    def classify(self, img: Image.Image) -> dict[str, Any]:
        # Один CPU-вызов модели за раз, без изменения её параметров.
        with self.lock, torch.inference_mode():
            tensor = self.transform(img).unsqueeze(0)
            logits = self.model(tensor)
            if tuple(logits.shape) != (1, 2) or not torch.isfinite(logits).all().item():
                raise RuntimeError("Модель вернула некорректные оценки классов.")
            predicted_index = int(logits.argmax(dim=1).item())
            label = self.class_names[predicted_index]
            score = float(torch.softmax(logits, dim=1)[0, predicted_index].item())
        return {
            "prediction": "ai" if label == "FAKE" else "real",
            "label": label,
            "confidence": round(score * 100, 2),
        }


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Загружаю локальную модель из %s. Обучение НЕ запускается.", CHECKPOINT_PATH)
    try:
        app.state.detector = await run_in_threadpool(PilotDetector)
    except Exception:
        logger.exception("Не удалось загрузить пилотную модель.")
        raise
    logger.info("Пилотная модель загружена: %s", MODEL_VERSION)
    try:
        yield
    finally:
        app.state.detector = None


app = FastAPI(
    title="DeepCheck Backend — Local Pilot",
    description="Проверка изображений вашей локальной пилотной моделью",
    version="1.0.0-pilot",
    lifespan=lifespan,
)
app.state.detector = None
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


def get_detector(request: Request) -> PilotDetector:
    detector = request.app.state.detector
    if detector is None:
        raise HTTPException(status_code=503, detail="Pilot model is not loaded")
    return detector


@app.get("/")
def home():
    return {
        "message": "DeepCheck Backend is running with the local pilot model",
        "model": MODEL_VERSION,
        "weights_file": "ml/checkpoints/pilot_model.pth",
    }


@app.get("/health")
def health(request: Request):
    detector = get_detector(request)
    return {
        "status": "ok",
        "service": "deepcheck-backend",
        "model": MODEL_VERSION,
        "model_loaded": True,
        "weights_file": "ml/checkpoints/pilot_model.pth",
        "checkpoint_sha256": detector.checkpoint_sha256,
    }


def analyze_bytes(detector: PilotDetector, data: bytes) -> dict[str, Any]:
    # Проверяем реальное содержимое файла, а не только MIME-тип и расширение.
    try:
        with Image.open(BytesIO(data)) as source:
            image_format = source.format
            if image_format not in ALLOWED_FORMATS:
                raise HTTPException(415, "Only JPG and PNG images are supported")
            if source.width * source.height > MAX_IMAGE_PIXELS:
                raise HTTPException(413, "Image must contain at most 40 million pixels")
            source.verify()
        with Image.open(BytesIO(data)) as source:
            img = source.convert("RGB")
    except HTTPException:
        raise
    except Image.DecompressionBombError:
        raise HTTPException(413, "Image dimensions are too large") from None
    except (UnidentifiedImageError, OSError, ValueError, SyntaxError):
        raise HTTPException(400, "The uploaded file is not a valid image") from None

    try:
        result = detector.classify(img)
    finally:
        img.close()
    return {"format": image_format, **result}


@app.post("/predict")
async def predict(request: Request, image: UploadFile = File(...)):
    start = perf_counter()
    filename = image.filename
    try:
        if not filename:
            raise HTTPException(400, "Filename is missing")
        content_type = (image.content_type or "").lower()
        if content_type not in {"image/jpeg", "image/png"}:
            raise HTTPException(415, "Only JPG and PNG images are supported")
        data = await image.read(MAX_FILE_SIZE + 1)
        if not data:
            raise HTTPException(400, "Image is empty")
        if len(data) > MAX_FILE_SIZE:
            raise HTTPException(413, "Image must be 10 MB or smaller")
    finally:
        await image.close()

    detector = get_detector(request)
    try:
        # Декодирование и PyTorch не блокируют цикл обработки HTTP-запросов.
        result = await run_in_threadpool(analyze_bytes, detector, data)
    except HTTPException:
        raise
    except Exception:
        logger.exception("Ошибка выполнения локальной пилотной модели.")
        raise HTTPException(
            500,
            "Local pilot inference failed. Check the backend terminal for details.",
        ) from None

    # Сохраняем поля ответа, используемые исходным frontend/script.js.
    return {
        "filename": filename,
        "status": "completed",
        **result,
        "model_version": MODEL_VERSION,
        "checkpoint_sha256": detector.checkpoint_sha256,
        "processing_time_ms": round((perf_counter() - start) * 1000, 2),
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "confidence_type": "uncalibrated_softmax_percent",
        "experimental": True,
        "message": (
            "Experimental local pilot. Confidence is a model score, not measured "
            "accuracy or proof of authenticity. Predictions may be incorrect."
        ),
    }
