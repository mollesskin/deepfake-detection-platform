# First Pilot Training

Date: 19 October 2026

Model: ResNet-18 trained from scratch, without pretrained weights
Dataset: A small subset of CIFAKE
Training images: 1,000
Validation images: 200 separate images from the training directory
Epochs: 1
Image size: 64 × 64 pixels
Device: Apple M1, MPS

Average training loss: 0.6532
Correct validation predictions: 144 out of 200
Validation accuracy: 72%

Class mapping: FAKE = 0, REAL = 1
Saved model: ml/checkpoints/pilot_model.pth

The official test directory has not been used.

These results are preliminary and do not establish performance
on arbitrary images or unseen generators.