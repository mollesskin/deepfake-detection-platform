#!/usr/bin/env python3
"""Собрать ZIP пилотной модели, не запуская обучение или предсказания.

Положите этот файл в ml и запустите из корня проекта:
    python ml/prepare_pilot_handoff.py

Скрипт читает код и веса, собирает сведения о среде и создаёт новый ZIP.
Изображения, .venv, .env и содержимое .git в архив НЕ включаются.
"""

from datetime import datetime
from hashlib import sha256
from importlib.metadata import PackageNotFoundError, version
from pathlib import Path
import json
import platform
import sys
from zipfile import ZIP_DEFLATED, ZipFile


REPORT = """Результат валидации пилотной модели

Источник: вывод evaluate_pilot.py, предоставленный Мөлдір.
Это запись уже выполненной проверки, а не новый запуск.
Дата самого измерения не зафиксирована в предоставленном выводе.

Выборка: 200 изображений (100 REAL и 100 FAKE).
По выводу программы использованы сохранённые val_indices из папки train.
Содержимое train должно оставаться неизменным относительно обучения.
Программа валидации не использовала папку test.

Правильных ответов: 144 из 200.
Accuracy (доля правильных ответов): 72.0%.

Истинный класс -> Предсказанный класс: количество
REAL -> REAL: 56
REAL -> FAKE: 44
FAKE -> FAKE: 88
FAKE -> REAL: 12

Верно распознано REAL: 56 из 100 (56%).
Верно распознано FAKE: 88 из 100 (88%).

Ограничения:
- Это валидация пилота, а не итоговая оценка на test.
- Результат относится к указанной выборке, а не ко всем фотографиям.
- По этой проверке нельзя установить качество на новых генераторах ИИ.
- Метка FAKE — предсказание модели, не доказательство подделки.
- Модель экспериментальная; ошибки должны быть отражены в интерфейсе.

Скрипт упаковки не перепроверяет эти метрики. Они относятся к ранее
проверенному pilot_model.pth при условии, что после проверки файл не менялся.
"""


README = """Пилотная модель: комплект для подключения к серверу

1. Распакуйте архив в отдельную папку, сохранив структуру ml/.
   Не заменяйте существующие файлы вашего проекта без сравнения версий.
2. Создайте отдельное виртуальное окружение Python. Версия исходной среды
   записана в environment.json. Архив НЕ содержит виртуальное окружение.
3. Установите зависимости в этом окружении:

   python -m pip install -r requirements-pilot.txt

   Это версии из исходной среды, а не гарантия совместимости с любой ОС.
   Если для вашей платформы нет нужных пакетов, отдельно согласуйте версии.
4. Из корня распакованной папки запустите проверку одного изображения:

   python ml/predict.py "/полный/путь/к/изображению.jpg"

   Текущий predict.py использует ml/checkpoints/pilot_model.pth.
   Ожидаемый формат стандартного вывода: Ответ модели: REAL или FAKE.
   Для одного предсказания набор CIFAKE не нужен.

ml/results/pilot_validation.txt содержит результаты ранее выполненной
валидации: 144/200, 72.0%, с указанием ошибок и ограничений.
SHA-256 файла весов на момент упаковки записан в environment.json.

В архив включены существующие model.py и predict.py без редактирования.
Если доступны train.py и evaluate_pilot.py, они добавлены для воспроизводимости.
Для повторения обучения или валидации понадобится соответствующий набор
данных и неизменное расположение файлов. Обучение здесь запускать не нужно.

Это комплект ML-файлов, а НЕ готовый сервер/API. Подключение к серверу
и проверка ответа через сайт выполняются отдельно.
При показе результата укажите: «Экспериментальная модель. Возможны ошибки».
Не показывайте 72% как вероятность подделки отдельной фотографии.
"""


def file_sha256(path: Path) -> str:
    digest = sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def main() -> int:
    ml_dir = Path(__file__).resolve().parent
    if ml_dir.name != "ml":
        print("Положи prepare_pilot_handoff.py в папку ml и запусти снова.")
        return 1

    required = [
        ml_dir / "model.py",
        ml_dir / "predict.py",
        ml_dir / "checkpoints" / "pilot_model.pth",
    ]
    missing = [str(path) for path in required if not path.is_file()]
    if missing:
        print("Архив не создан. Не найдены обязательные файлы:")
        print("\n".join(missing))
        return 1
    if required[-1].stat().st_size == 0:
        print("Файл pilot_model.pth пуст. Архив не создан.")
        return 1

    packages = {}
    for name in ("torch", "torchvision", "Pillow"):
        try:
            packages[name] = version(name)
        except PackageNotFoundError:
            print(f"Не найден пакет {name}. Активируй .venv и запусти снова.")
            return 1

    now = datetime.now().astimezone()
    archive_path = ml_dir.parent / (
        "pilot_for_backend_" + now.strftime("%Y%m%d_%H%M%S_%f") + ".zip"
    )
    metadata = {
        "packaged_at": now.isoformat(),
        "python": platform.python_version(),
        "source_os": platform.system(),
        "source_architecture": platform.machine(),
        "packages": packages,
        "checkpoint_sha256": file_sha256(required[-1]),
        "metrics_source": "User-provided output of a prior evaluate_pilot.py run",
        "training_started": False,
        "evaluation_started": False,
    }
    files_to_add = list(required)
    for name in ("train.py", "evaluate_pilot.py"):
        candidate = ml_dir / name
        if candidate.is_file():
            files_to_add.append(candidate)

    print("Собираю код, веса, версии библиотек и запись результатов.", flush=True)
    created = False
    try:
        with ZipFile(archive_path, mode="x", compression=ZIP_DEFLATED) as archive:
            created = True
            for path in files_to_add:
                archive.write(path, arcname=path.relative_to(ml_dir.parent).as_posix())
            archive.writestr("README_PILOT.txt", README)
            archive.writestr("ml/results/pilot_validation.txt", REPORT)
            archive.writestr(
                "requirements-pilot.txt",
                "".join(f"{name}=={value}\n" for name, value in packages.items()),
            )
            archive.writestr(
                "environment.json", json.dumps(metadata, ensure_ascii=False, indent=2) + "\n"
            )
        with ZipFile(archive_path, mode="r") as archive:
            bad_file = archive.testzip()
        if bad_file is not None:
            raise RuntimeError(f"Ошибка проверки архива: {bad_file}")
        if file_sha256(required[-1]) != metadata["checkpoint_sha256"]:
            raise RuntimeError("Файл весов изменился во время упаковки. Останови обучение и повтори.")
    except BaseException:
        if created:
            archive_path.unlink(missing_ok=True)
        raise

    print("\n=== АРХИВ ГОТОВ ===")
    print(archive_path)
    print(f"Размер: {archive_path.stat().st_size / (1024 * 1024):.1f} МБ")
    print("Обучение и предсказания не запускались. Исходные файлы не изменены.")
    print("Фотографии, .venv и .env в архив не включены.")
    print("Передай этот ZIP Аяулым вместе с оговоркой: модель экспериментальная.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\nУпаковка остановлена. Исходные файлы не изменены.")
        sys.exit(130)
    except Exception as exc:
        print(f"Не удалось создать архив: {exc}", file=sys.stderr)
        sys.exit(1)
