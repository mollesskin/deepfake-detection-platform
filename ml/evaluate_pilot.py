"""Повторная валидация pilot_model.pth без обучения и изменения весов.

Помести этот файл в папку ml рядом с model.py.
Запуск из корня проекта: python ml/evaluate_pilot.py

Важно: содержимое ml/data/cifake/train должно быть таким же, как при
обучении. В checkpoint сохранены номера файлов, а не их имена или хеши.
Папка test в этой проверке не используется.
"""

import sys
from pathlib import Path

import torch
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, transforms

from model import create_model


def main() -> None:
    ml_folder = Path(__file__).resolve().parent
    checkpoint_path = ml_folder / "checkpoints" / "pilot_model.pth"
    data_folder = ml_folder / "data" / "cifake" / "train"

    if not checkpoint_path.is_file():
        raise FileNotFoundError(f"Не найден файл модели: {checkpoint_path}")
    if not data_folder.is_dir():
        raise FileNotFoundError(f"Не найдена папка с данными: {data_folder}")

    print("Загружаю сохранённую модель. Обучение НЕ запускается.", flush=True)
    # Загружаем собственный checkpoint; ничего в него не записываем.
    checkpoint = torch.load(
        checkpoint_path, map_location="cpu", weights_only=True
    )
    required = {"model_state_dict", "class_to_idx", "image_size", "val_indices"}
    missing = required.difference(checkpoint)
    if missing:
        raise ValueError(
            "В файле модели нет необходимых полей: " + ", ".join(sorted(missing))
        )

    image_size = checkpoint["image_size"]
    if not isinstance(image_size, int) or image_size <= 0:
        raise ValueError("В checkpoint некорректный image_size.")

    transform = transforms.Compose([
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),
    ])
    dataset = datasets.ImageFolder(data_folder, transform=transform)
    if dataset.class_to_idx != checkpoint["class_to_idx"]:
        raise ValueError(
            "Классы в папке данных не совпадают с сохранёнными при обучении. "
            f"В папке: {dataset.class_to_idx}; "
            f"в модели: {checkpoint['class_to_idx']}"
        )
    if set(dataset.classes) != {"REAL", "FAKE"}:
        raise ValueError("Для этого пилота ожидаются только классы REAL и FAKE.")

    indices = checkpoint["val_indices"]
    if not isinstance(indices, (list, tuple)) or not indices:
        raise ValueError("В checkpoint нет непустого списка val_indices.")
    if any(not isinstance(i, int) or i < 0 or i >= len(dataset) for i in indices):
        raise ValueError(
            "Сохранённые номера изображений не подходят к текущим данным. "
            "Возможно, папка train изменилась после обучения."
        )
    if len(indices) != len(set(indices)):
        raise ValueError("В val_indices найдены повторяющиеся номера изображений.")
    train_indices = checkpoint.get("train_indices", [])
    if set(indices).intersection(train_indices):
        raise ValueError("В checkpoint пересекаются обучающие и проверочные индексы.")

    loader = DataLoader(
        Subset(dataset, indices),
        batch_size=16,
        shuffle=False,
        num_workers=0,
    )
    model = create_model().cpu()
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    # Строка — настоящая метка, столбец — предсказание модели.
    confusion = torch.zeros((2, 2), dtype=torch.int64)
    processed = 0
    print(f"Изображений для валидации: {len(indices)}", flush=True)
    print("Использую сохранённые val_indices; папку test не трогаю.", flush=True)
    print("Важно: содержимое папки train не должно меняться после обучения.")

    with torch.no_grad():
        for step, (images, labels) in enumerate(loader, start=1):
            scores = model(images)
            if scores.shape != (labels.size(0), 2):
                raise ValueError(f"Неожиданный размер ответа модели: {scores.shape}")
            if not torch.isfinite(scores).all():
                raise ValueError("В ответах модели есть NaN или бесконечные значения.")
            predictions = scores.argmax(dim=1)
            for true_label, prediction in zip(labels.tolist(), predictions.tolist()):
                confusion[true_label, prediction] += 1
            processed += labels.size(0)
            if step % 5 == 0 or processed == len(indices):
                print(f"Проверено: {processed}/{len(indices)}", flush=True)

    real = dataset.class_to_idx["REAL"]
    fake = dataset.class_to_idx["FAKE"]
    total = int(confusion.sum().item())
    correct = int(confusion.diag().sum().item())
    real_total = int(confusion[real].sum().item())
    fake_total = int(confusion[fake].sum().item())

    print("\n=== РЕЗУЛЬТАТ ВАЛИДАЦИИ ===")
    print(f"Всего: {total} (REAL: {real_total}, FAKE: {fake_total})")
    print(f"Правильных ответов: {correct}/{total}")
    print(f"Точность на этой выборке: {100 * correct / total:.1f}%")
    print(f"REAL -> REAL: {confusion[real, real].item()}")
    print(f"REAL -> FAKE: {confusion[real, fake].item()}")
    print(f"FAKE -> FAKE: {confusion[fake, fake].item()}")
    print(f"FAKE -> REAL: {confusion[fake, real].item()}")
    print("Файл pilot_model.pth не изменён.")
    print("Это валидация пилота, а не итоговая оценка на test.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, RuntimeError, TypeError) as error:
        print(f"\nПроверка остановлена: {error}", file=sys.stderr)
        print(
            "Пришли это сообщение для разбора. train.py заново не запускай.",
            file=sys.stderr,
        )
        sys.exit(1)
