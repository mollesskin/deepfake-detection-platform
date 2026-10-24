# DeepCheck — Test Cases

## 1. Purpose

This document describes the main functional and integration test cases for the DeepCheck prototype.

The tests focus on image upload, validation, backend communication, ML inference, and result presentation.

---

## 2. Functional Test Cases

| ID | Test Case | Input | Expected Result |
|---|---|---|---|
| TC-01 | Upload valid JPG image | Valid JPG | Image is accepted and analysis starts |
| TC-02 | Upload valid PNG image | Valid PNG | Image is accepted and analysis starts |
| TC-03 | Upload unsupported file | TXT/PDF/other file | File is rejected |
| TC-04 | Upload corrupted image | Invalid image file | Image is rejected with an error |
| TC-05 | Upload empty input | No file | Upload is not submitted |
| TC-06 | Analyze REAL image | Real photograph | System returns REAL/AI prediction |
| TC-07 | Analyze AI-generated image | AI-generated image | System returns REAL/AI prediction |
| TC-08 | Display confidence | Valid image | Confidence value is displayed |
| TC-09 | Backend unavailable | Backend stopped | Frontend displays an understandable error |
| TC-10 | Repeated upload | Multiple images | Each image can be processed independently |

---

## 3. Integration Test

The complete application workflow is tested as follows:

```text
User
  ↓
Frontend
  ↓
Image Upload
  ↓
Backend API
  ↓
ML Model
  ↓
Prediction
  ↓
Backend Response
  ↓
Frontend Result

The integration test is considered successful when the uploaded image reaches the backend, is processed by the ML component, and the prediction is correctly returned to the frontend.

## 4. Negative Testing

The following negative cases should be tested:

- unsupported file formats;
- corrupted images;
- empty upload;
- oversized files;
- unavailable backend;
- model loading failure;
- ML inference failure;
- repeated requests.

The expected behavior is graceful error handling without crashing the application.

---

## 5. Evidence

Testing evidence should include:

- screenshots of the application;
- examples of REAL predictions;
- examples of AI predictions;
- examples of rejected files;
- examples of error states;
- recorded incorrect predictions when available.

---

## 6. Current Status

The prototype has been tested through the main image-analysis workflow.

The frontend can submit an image to the backend, the backend can process the image using the ML component, and the result can be displayed to the user.

Formal dataset-level model metrics should only be added after the evaluation dataset and measurement procedure are finalized.