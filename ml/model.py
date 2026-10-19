from torch import nn
from torchvision.models import resnet18


def create_model():
    model = resnet18(weights=None)

    model.fc = nn.Linear(model.fc.in_features, 2)

    return model


if __name__ == "__main__":
    model = create_model()
    print("Модель создана. Классов:", model.fc.out_features)