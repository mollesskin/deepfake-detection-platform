# System Architecture

## 1. Overview

DeepCheck is a web-based deepfake detection platform consisting of three main components:

1. Frontend
2. Backend API
3. Machine Learning component

The components work together to process an uploaded image and return a prediction indicating whether the image is classified as real or AI-generated.

The overall system follows the workflow:

**Image Upload → Frontend → FastAPI Backend → ML Model → Prediction → Frontend Result**

The architecture separates the user interface, API logic, and machine learning functionality so that each component can be developed and tested independently.

---

## 2. High-Level Architecture

```text
┌─────────────────────┐
│        User         │
│                     │
│   Uploads Image     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Frontend       │
│                     │
│ HTML / CSS / JS     │
│                     │
│ - Upload image      │
│ - Validate input    │
│ - Show status       │
│ - Send request      │
│ - Show prediction   │
└──────────┬──────────┘
           │
           │ HTTP Request
           ▼
┌─────────────────────┐
│    FastAPI Backend  │
│                     │
│ Python              │
│                     │
│ - Receive image     │
│ - Validate request  │
│ - Process image     │
│ - Call ML model     │
│ - Return result     │
└──────────┬──────────┘
           │
           │ Image
           ▼
┌─────────────────────┐
│  Machine Learning   │
│      Component      │
│                     │
│ - Image processing  │
│ - Model inference   │
│ - Classification    │
│ - Confidence score  │
└──────────┬──────────┘
           │
           │ Prediction
           ▼
┌─────────────────────┐
│    FastAPI Backend  │
│                     │
│ - Prepare response  │
└──────────┬──────────┘
           │
           │ JSON Response
           ▼
┌─────────────────────┐
│      Frontend       │
│                     │
│   Display Result    │
└─────────────────────┘
```

---

## 3. Frontend

The frontend provides the user interface for interacting with DeepCheck.

### Main Responsibilities

The frontend is responsible for:

- displaying the DeepCheck interface;
- allowing users to select and upload an image;
- validating the uploaded image;
- displaying the analysis state;
- sending the image to the backend API;
- receiving the prediction response;
- displaying the final classification;
- displaying the confidence score;
- handling user-facing errors;
- supporting multiple interface languages.

The frontend is implemented using:

- HTML;
- CSS;
- JavaScript.

### Frontend Structure

```text
frontend/
├── index.html
├── script.js
├── style.css
└── assets/
```

### `index.html`

Contains the main structure of the DeepCheck web interface.

### `style.css`

Contains the visual styling, layout, responsive behavior, and interface appearance.

### `script.js`

Contains client-side functionality including image upload, validation, API communication, interface states, and result presentation.

### `assets/`

Contains visual assets used by the frontend.

---

## 4. Backend API

The backend provides the API layer between the frontend and the machine learning component.

The backend is implemented using Python and FastAPI.

### Main Responsibilities

The backend is responsible for:

- accepting image upload requests;
- validating incoming files;
- reading the uploaded image;
- preparing the image for inference;
- passing the image to the machine learning component;
- receiving the prediction;
- returning the prediction to the frontend;
- returning confidence information;
- handling processing errors.

### Backend Structure

```text
backend/
└── main.py
```

### `main.py`

The main backend file contains the FastAPI application and the logic required to receive uploaded images and perform prediction through the machine learning component.

---

## 5. Machine Learning Component

The machine learning component is responsible for classifying an input image.

The current ML structure contains:

```text
ml/
├── experiment_01.md
├── model.py
└── train.py
```

### `train.py`

The training script is used for the model training process and experimentation.

It contains the code related to preparing the training process and training the detection model.

### `model.py`

The model module contains the machine learning model implementation and inference-related functionality.

It is used by the backend when an uploaded image needs to be classified.

### `experiment_01.md`

This file documents the initial machine learning experiment and pilot work.

It can contain information about the experiment, training process, observations, results, and limitations.

---

## 6. End-to-End Workflow

The complete DeepCheck workflow consists of the following steps:

1. The user selects an image.
2. The frontend validates the uploaded file.
3. The frontend sends the image to the FastAPI backend.
4. The backend receives the image.
5. The backend validates and reads the image.
6. The backend passes the image to the ML component.
7. The ML component performs inference.
8. The model returns a classification and confidence value.
9. The backend prepares the response.
10. The backend sends the result to the frontend.
11. The frontend displays the prediction and confidence to the user.

The complete data flow can be represented as:

```text
User
  ↓
Image Selection
  ↓
Frontend Validation
  ↓
HTTP Upload Request
  ↓
FastAPI Backend
  ↓
Image Processing
  ↓
ML Model Inference
  ↓
Prediction
  ↓
FastAPI Response
  ↓
Frontend
  ↓
Result Display
```

---

## 7. Analysis States

The application uses different states during image analysis.

A typical workflow is:

```text
Idle
  ↓
Image Selected
  ↓
Uploading
  ↓
Analyzing
  ↓
Result
```

If an error occurs, the workflow can move to an error state:

```text
Uploading / Analyzing
        ↓
      Error
```

These states allow the user to understand what the application is currently doing.

---

## 8. Prediction

The current prototype provides two main classification categories:

```text
REAL
AI
```

The model also provides a confidence value associated with the prediction.

A conceptual response can be represented as:

```json
{
  "prediction": "AI",
  "confidence": 0.94
}
```

The exact response structure depends on the current backend implementation.

The prediction should be interpreted as a model classification rather than a guaranteed forensic determination.

---

## 9. Communication Between Components

The application uses HTTP communication between the frontend and backend.

The frontend sends an image to the FastAPI endpoint using an HTTP request.

The backend:

1. receives the uploaded file;
2. validates the input;
3. processes the image;
4. calls the ML component;
5. receives the prediction;
6. prepares the API response.

The result is then returned to the frontend.

Conceptually:

```text
Frontend
   │
   │ HTTP image upload
   ▼
FastAPI API
   │
   │ ML inference
   ▼
ML Component
   │
   │ prediction
   ▼
FastAPI API
   │
   │ JSON response
   ▼
Frontend
```

---

## 10. Error Handling

The application should handle invalid input and processing failures.

Potential errors include:

- unsupported file format;
- invalid image;
- corrupted image;
- oversized file;
- empty upload;
- backend processing error;
- backend startup error;
- model loading error;
- ML inference failure;
- communication failure between frontend and backend.

The system should return an understandable error message instead of exposing unnecessary internal implementation details.

Example conceptual error response:

```json
{
  "error": "Invalid image file"
}
```

The exact error response depends on the current backend implementation.


## 11. Current Prototype Scope

The current architecture is designed for image-based deepfake detection.

The main scope includes:

- image upload;
- image validation;
- backend API processing;
- ML inference;
- REAL/AI classification;
- confidence display;
- frontend result presentation.

The following features are considered future improvements:

- video deepfake detection;
- larger-scale datasets;
- improved model architectures;
- stronger robustness testing;
- persistent user accounts;
- database integration;
- production deployment;
- monitoring and logging;
- large-scale inference infrastructure.

---

## 12. Architectural Limitations

The current system is a prototype and therefore has several limitations.

The ML model may incorrectly classify some images. Model performance depends on the training data, preprocessing, image characteristics, and the types of AI-generated content represented in the dataset.

The system should therefore not be presented as a guaranteed forensic verification service.

The final evaluation should report actual experimental results and clearly document the limitations of the current model.

---

## 13. Future Architecture Improvements

Future versions of DeepCheck may introduce:

- a dedicated model-serving service;
- database storage;
- user authentication;
- asynchronous inference;
- task queues;
- model versioning;
- monitoring;
- logging;
- automated testing;
- containerized deployment;
- video-processing services;
- improved model evaluation pipelines.

A possible future architecture could be:

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Frontend   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   API Layer  │
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
          ┌─────────────┐     ┌─────────────┐
          │ Image       │     │ Prediction  │
          │ Processing  │     │ Service     │
          └─────────────┘     └──────┬──────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │ ML Model    │
                               └─────────────┘
```

This architecture would allow the system to scale beyond the current academic prototype.

---

## 14. Summary

DeepCheck uses a modular architecture consisting of a frontend, FastAPI backend, and machine learning component.

The architecture provides a complete pipeline:

**User → Frontend → Backend → ML Model → Backend → Frontend**

This separation allows the individual components to be developed, tested, and improved independently.

The verification and evaluation process examines both the technical functionality of the application and the classification behavior of the machine learning model.

The current architecture is suitable for the prototype stage, while the documented future improvements provide a path toward a more scalable and production-oriented system.