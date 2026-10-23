import sys
from pathlib import Path

import torch
from PIL import Image
from torchvision import transforms

from model import create_model


def predict(image_path):
    checkpoint_path = (
        Path(__file__).resolve().parent
        / "checkpoints"
        / "pilot_model.pth"
    )

    checkpoint = torch.load(
        checkpoint_path,
        map_location="cpu",
        weights_only=True,
    )

    model = create_model()
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    transform = transforms.Compose([
        transforms.Resize((
            checkpoint["image_size"],
            checkpoint["image_size"],
        )),
        transforms.ToTensor(),
    ])

    with Image.open(image_path) as image:
        image = image.convert("RGB")
        image_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        scores = model(image_tensor)
        predicted_class = scores.argmax(dim=1).item()

    class_names = {
        number: name
        for name, number in checkpoint["class_to_idx"].items()
    }

    return class_names[predicted_class]


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Укажи путь к одной фотографии.")
        sys.exit(1)

    result = predict(sys.argv[1])
    print("Ответ модели:", result)