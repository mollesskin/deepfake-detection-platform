# DeepCheck - Dataset and Training

## 1. Purpose

This document describes the dataset preparation and machine learning training workflow used for the DeepCheck project.

The purpose of this process is to prepare labeled image data, train a deepfake detection model, evaluate its predictions, and integrate the trained model into the DeepCheck backend.

---

## 2. Dataset

The project focuses on two main image classes:

- REAL
- AI-generated

The dataset is intended to contain authentic images and images generated or manipulated using artificial intelligence.

Each image should have an associated class label indicating whether it belongs to the REAL or AI-generated category.

The project plan specifies an initial target of approximately 1,000 images, or a smaller available pilot dataset if the full target cannot be obtained during the initial experiment.

---

## 3. Dataset Preparation

The dataset preparation process includes the following steps:

1. Collect images.
2. Identify the source of each image where possible.
3. Assign the correct class label.
4. Check image quality.
5. Remove duplicate images.
6. Remove corrupted or unreadable files.
7. Organize images into appropriate categories.
8. Prepare the dataset for training and evaluation.

The preparation stage is important because duplicated, corrupted, incorrectly labeled, or low-quality images can negatively affect the training process.

---

## 4. Dataset Classes

The project uses two primary classes:

```text
REAL
AI
```

### REAL

Images representing authentic photographs or other non-AI-generated visual content.

### AI

Images generated or significantly created using artificial intelligence.

The model learns to identify visual patterns that distinguish the two classes.

---

## 5. Dataset Split

The planned dataset split is:

| Dataset Part | Percentage | Purpose |
|---|---:|---|
| Training | 70% | Model training |
| Development / Validation | 15% | Model development and parameter checking |
| Testing / Checking | 15% | Final evaluation |

Related versions or highly similar images should remain within the same dataset split where possible to reduce data leakage.

The final report should use the actual split and dataset size from the completed experiment.

---

## 6. Training Workflow

The machine learning training process consists of several stages:

```text
Dataset
   ↓
Image Preparation
   ↓
Label Assignment
   ↓
Train / Validation / Test Split
   ↓
Model Training
   ↓
Validation
   ↓
Testing
   ↓
Model Evaluation
```

During training, the model learns patterns from the training images.

The development or validation data can be used to monitor the model during development.

The test data should be reserved for evaluating the final model.

---

## 7. Machine Learning Files

The project contains the following ML-related files:

```text
ml/
├── experiment_01.md
├── model.py
└── train.py
```

### `train.py`

The training script contains the code responsible for the model training process.

It can include:

- dataset loading;
- image preprocessing;
- training configuration;
- model training;
- validation;
- saving model information.

### `model.py`

The model module contains the machine learning model implementation and inference-related functionality.

It is used when the backend needs to classify a new image.

### `experiment_01.md`

This file documents the initial machine learning experiment and pilot results.

It should contain actual experimental information rather than estimated or assumed results.

---

## 8. Training Information

The following information should be recorded for each experiment:

- dataset used;
- number of images;
- class distribution;
- preprocessing method;
- model architecture;
- training parameters;
- number of epochs;
- training time;
- loss values;
- validation results;
- test results;
- problems encountered.

Only values obtained from the actual experiment should be included in the final evaluation.

---

## 9. Model Evaluation

The model should be evaluated using labeled images that were not used for training.

The evaluation should distinguish between four possible outcomes:

| Actual Class | Predicted Class | Result |
|---|---|---|
| REAL | REAL | Correct prediction |
| REAL | AI | False positive |
| AI | AI | Correct prediction |
| AI | REAL | False negative |

These results allow the team to identify both correct predictions and the types of errors produced by the model.

---

## 10. Evaluation Metrics

Possible evaluation metrics include:

- accuracy;
- precision;
- recall;
- F1-score;
- confusion matrix.

However, these values should only be included in the final report after they have been calculated from the actual evaluation dataset.

The project should not claim a specific accuracy or other metric without experimental evidence.

---

## 11. Model Integration

After training, the model is connected to the backend.

The complete inference workflow is:

```text
User uploads image
        ↓
Frontend
        ↓
FastAPI Backend
        ↓
Image preprocessing
        ↓
ML Model
        ↓
Prediction
        ↓
Confidence
        ↓
FastAPI Backend
        ↓
Frontend
```

The backend uses the trained model to process the uploaded image and return the prediction to the frontend.

---

## 12. Training Evidence

The project should preserve evidence of the training process.

Recommended evidence includes:

- training code;
- model code;
- experiment documentation;
- training/loss graph;
- dataset information;
- evaluation table;
- correct prediction examples;
- incorrect prediction examples.

This evidence helps demonstrate that the ML component was actually developed and evaluated.

---

## 13. Current Status

The project contains an ML component with training and model-related files.

The first prototype focuses on integrating the model with the web application and demonstrating the complete image-analysis workflow.

The final dataset-level performance should be added after the formal evaluation experiment has been completed.

---

## 14. Limitations

The first model may produce incorrect predictions.

Possible limitations include:

- limited dataset size;
- class imbalance;
- limited diversity of AI-generated images;
- image compression;
- image resizing;
- unseen image-generation methods;
- differences between training and real-world images;
- false positive predictions;
- false negative predictions.

These limitations should be documented in the final project report.

---

## 15. Future Improvements

Future improvements may include:

- increasing the dataset size;
- adding more AI-generation methods;
- improving dataset balance;
- applying additional data augmentation;
- testing unseen generators;
- improving the model architecture;
- performing systematic error analysis;
- adding video deepfake detection;
- implementing automated model evaluation.

---

## 16. Summary

The DeepCheck ML pipeline consists of dataset preparation, model training, evaluation, and backend integration.

The main workflow is:

**Dataset → Preparation → Training → Evaluation → Model Integration → Prediction**

The project prioritizes transparent reporting of actual experimental results and clearly documents the limitations of the current prototype.
```
