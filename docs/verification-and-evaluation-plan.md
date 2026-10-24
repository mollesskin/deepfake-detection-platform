## 1. Verification and Evaluation

Verification and evaluation are performed at both the application and machine learning levels.

The purpose of verification is to determine whether the complete system operates according to the intended workflow.

The purpose of evaluation is to examine the behavior of the ML model and identify correct predictions and classification errors.

### 1.1 Application Verification

The complete application workflow should be verified:

```text
Upload
  ↓
Validation
  ↓
Backend
  ↓
ML Inference
  ↓
Prediction
  ↓
Frontend Result
```

Each stage should be checked independently and as part of the complete workflow.

### 1.2 Functional Verification

The application should be tested with:

- valid JPG images;
- valid PNG images;
- unsupported file formats;
- invalid or corrupted images;
- large files;
- repeated uploads;
- real images;
- AI-generated images;
- different image conditions;
- desktop usage;
- mobile usage.

### 1.3 Frontend Verification

Frontend verification checks whether:

- an image can be selected;
- the upload interface works correctly;
- invalid files are rejected;
- the analysis state is displayed;
- the backend request is sent correctly;
- the returned prediction is displayed;
- the confidence value is displayed;
- errors are presented clearly.

### 1.4 Backend Verification

Backend verification checks whether:

- the API starts correctly;
- image upload requests are received;
- image files are validated;
- valid images are processed;
- invalid requests are rejected;
- the ML component is called;
- predictions are returned correctly;
- errors are handled without crashing the application.

### 1.5 Machine Learning Evaluation

The ML component should be evaluated using labeled REAL and AI images.

The evaluation should distinguish between:

| Actual Class | Predicted Class | Interpretation |
|---|---|---|
| REAL | REAL | Correct prediction |
| REAL | AI | False positive |
| AI | AI | Correct prediction |
| AI | REAL | False negative |

These results can be used to analyze the behavior and limitations of the detection model.

Accuracy and other statistical metrics should only be reported when they are calculated from a documented evaluation dataset.

### 1.6 Integration Verification

The integration test verifies the complete communication chain:

```text
Frontend
   ↓
API
   ↓
ML Model
   ↓
API
   ↓
Frontend
```

The integration test is successful when:

1. the user uploads an image;
2. the frontend sends the image;
3. the backend receives the image;
4. the ML model processes the image;
5. the backend receives the prediction;
6. the frontend receives the response;
7. the result is displayed correctly.

### 1.7 Negative Testing

Negative testing should include:

- unsupported file extensions;
- corrupted images;
- oversized files;
- empty upload;
- invalid requests;
- repeated uploads;
- unavailable backend;
- model loading failure;
- ML inference failure.

The expected behavior is that the system handles these cases gracefully and provides an understandable error.

### 1.8 Evaluation Evidence

The project should maintain evidence of the verification and evaluation process, including:

- test cases;
- screenshots;
- model predictions;
- correct prediction examples;
- incorrect prediction examples;
- false positive examples;
- false negative examples;
- training/loss graphs when available;
- documented errors;
- final limitations.

### 1.9 Current Prototype Evaluation

The current prototype has been tested through the complete image-analysis workflow.

The system is able to receive an image through the frontend, send it to the backend, process it using the ML component, and return a REAL/AI prediction with confidence information.

Formal dataset-level performance metrics should be added after the evaluation dataset and measurement procedure are finalized.
