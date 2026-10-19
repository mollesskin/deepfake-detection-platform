from pathlib import Path

import torch
from torch import nn
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, transforms

from model import create_model


def main():
    torch.manual_seed(42)

    ml_folder = Path(__file__).resolve().parent
    data_folder = ml_folder / "data" / "cifake" / "train"

    # Подготавливаем картинки одинаковым способом.
    transform = transforms.Compose([
        transforms.Resize((64, 64)),
        transforms.ToTensor(),
    ])

    dataset = datasets.ImageFolder(
        data_folder,
        transform=transform,
    )

    # Берём поровну настоящих и AI-изображений.
    train_indices = []
    val_indices = []
    generator = torch.Generator().manual_seed(42)

    for class_id in range(len(dataset.classes)):
        indices = [
            i for i, label in enumerate(dataset.targets)
            if label == class_id
        ]

        order = torch.randperm(
            len(indices), generator=generator
        ).tolist()

        shuffled = [indices[i] for i in order]

        train_indices.extend(shuffled[:500])
        val_indices.extend(shuffled[500:600])

    train_loader = DataLoader(
        Subset(dataset, train_indices),
        batch_size=16,
        shuffle=True,
        num_workers=0,
    )

    val_loader = DataLoader(
        Subset(dataset, val_indices),
        batch_size=16,
        shuffle=False,
        num_workers=0,
    )

    device = torch.device(
        "mps" if torch.backends.mps.is_available() else "cpu"
    )

    model = create_model().to(device)
    loss_function = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    print("Устройство:", device)
    print("Классы:", dataset.class_to_idx)
    print("Обучение:", len(train_indices), "изображений")
    print("Проверка:", len(val_indices), "изображений")

    # Первый короткий запуск: один проход по данным.
    model.train()
    total_loss = 0

    for step, (images, labels) in enumerate(train_loader, start=1):
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()
        predictions = model(images)
        loss = loss_function(predictions, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item() * labels.size(0)

        if step % 10 == 0:
            print(f"Обработано порций: {step}/{len(train_loader)}")

    # Проверяем на изображениях, которые не участвовали в обучении.
    model.eval()
    correct = 0
    total = 0

    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(device)
            labels = labels.to(device)

            predictions = model(images).argmax(dim=1)
            correct += (predictions == labels).sum().item()
            total += labels.size(0)

    print(f"Средняя ошибка обучения: {total_loss / len(train_indices):.4f}")
    print(f"Правильных ответов при проверке: {correct}/{total}")
    print(f"Точность: {100 * correct / total:.1f}%")

    output_folder = ml_folder / "checkpoints"
    output_folder.mkdir(exist_ok=True)

    torch.save({
        "model_state_dict": {
            name: value.cpu()
            for name, value in model.state_dict().items()
        },
        "class_to_idx": dataset.class_to_idx,
        "image_size": 64,
        "seed": 42,
        "train_indices": train_indices,
        "val_indices": val_indices,
    }, output_folder / "pilot_model.pth")

    print("Модель сохранена: ml/checkpoints/pilot_model.pth")


if __name__ == "__main__":
    main()