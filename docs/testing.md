# DeepCheck — Testing

## 1. Purpose

This document describes the testing approach used for the DeepCheck platform.

The purpose of testing is to verify that the frontend, backend, machine learning component, and their integration operate correctly and handle expected and unexpected inputs.

Testing is performed at several levels:

- frontend testing;
- backend testing;
- machine learning testing;
- integration testing;
- negative testing;
- end-to-end testing.

---

## 2. Testing Objectives

The main testing objectives are:

1. Verify that users can upload supported images.
2. Verify that invalid files are rejected.
3. Verify that the frontend communicates correctly with the backend.
4. Verify that the backend receives and processes uploaded images.
5. Verify that the ML component performs inference.
6. Verify that predictions are returned to the frontend.
7. Verify that REAL and AI results are displayed correctly.
8. Verify that confidence information is displayed.
9. Verify that errors are handled correctly.
10. Verify the complete image-analysis workflow.

---

## 3. Testing Environment

The DeepCheck prototype consists of:

```text
Frontend
HTML / CSS / JavaScript
        ↓
FastAPI Backend
Python
        ↓
Machine Learning Component
        ↓
Prediction
```

Testing can be performed using a local development environment with the frontend and backend running together.

The exact environment and configuration should be documented according to the final project setup.

---

## 4. Functional Testing

Functional testing verifies whether the main application features work according to the intended requirements.

### 4.1 Image Upload

The user should be able to select an image through the upload interface.

Expected result:

- the image is selected successfully;
- the interface accepts the image;
- the application proceeds to validation or analysis.

### 4.2 Supported Image Formats

The application should support the image formats defined by the project requirements.

Expected supported formats include:

- JPG;
- JPEG;
- PNG.

Expected result:

The application accepts a valid image and allows it to proceed to analysis.

### 4.3 Invalid File Format

The application should reject unsupported file formats.

Example inputs:

- TXT;
- PDF;
- ZIP;
- other non-image files.

Expected result:

The application displays an understandable validation error and does not send the invalid file for ML analysis.

### 4.4 Corrupted Image

A corrupted or unreadable image should be rejected.

Expected result:

The application displays an error instead of attempting normal inference.

### 4.5 Large File

Large files should be checked against the configured upload limitations.

Expected result:

If the file exceeds the allowed limit, the application rejects it and displays an appropriate error.

---

## 5. Frontend Testing

Frontend testing focuses on the user interface and client-side behavior.

The following areas should be checked:

- page loading;
- image selection;
- upload interaction;
- file validation;
- analysis state;
- loading state;
- result state;
- error state;
- prediction display;
- confidence display;
- responsive behavior.

### Expected Frontend States

The application can be represented using the following flow:

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

If a problem occurs:

```text
Uploading / Analyzing
        ↓
      Error
```

Each state should provide clear feedback to the user.

---

## 6. Backend Testing

Backend testing verifies the FastAPI API and its communication with the ML component.

The following should be tested:

- API startup;
- image upload endpoint;
- file validation;
- image reading;
- image preprocessing;
- model loading;
- model inference;
- prediction generation;
- confidence generation;
- JSON response;
- error handling.

### Expected Backend Flow

```text
HTTP Request
     ↓
File Validation
     ↓
Image Processing
     ↓
ML Inference
     ↓
Prediction
     ↓
JSON Response
```

The backend should process valid requests successfully and reject invalid requests without crashing.

---

## 7. Machine Learning Testing

Machine learning testing focuses on the behavior of the detection model.

The model should be tested using labeled images representing the two primary classes:

```text
REAL
AI
```

The evaluation should identify whether the model produces:

- correct REAL predictions;
- correct AI predictions;
- false positive predictions;
- false negative predictions.

The following table describes the possible outcomes:

| Actual Class | Predicted Class | Result |
|---|---|---|
| REAL | REAL | Correct prediction |
| REAL | AI | False positive |
| AI | AI | Correct prediction |
| AI | REAL | False negative |

Actual performance metrics should only be added after the model has been evaluated using the documented test dataset.

---

## 8. Integration Testing

Integration testing verifies communication between the main system components.

The complete integration flow is:

```text
Frontend
   ↓
FastAPI API
   ↓
ML Component
   ↓
FastAPI API
   ↓
Frontend
```

The integration test is successful when:

1. the user selects an image;
2. the frontend validates the image;
3. the frontend sends the image to the API;
4. the backend receives the image;
5. the backend passes the image to the ML component;
6. the model performs inference;
7. the backend receives the prediction;
8. the backend returns a response;
9. the frontend receives the response;
10. the result is displayed to the user.

---

## 9. End-to-End Testing

End-to-end testing verifies the complete application from the user's perspective.

### Test Scenario

```text
User
 ↓
Select Image
 ↓
Upload
 ↓
Frontend Validation
 ↓
API Request
 ↓
Backend
 ↓
ML Inference
 ↓
Prediction
 ↓
API Response
 ↓
Frontend
 ↓
Result
```

The test is considered successful when the complete workflow finishes without an unexpected error.

---

## 10. Negative Testing

Negative testing checks how the application behaves when invalid or unexpected inputs are provided.

Test cases include:

- unsupported file format;
- corrupted image;
- oversized image;
- empty upload;
- invalid API request;
- unavailable backend;
- model loading failure;
- ML inference failure;
- repeated upload;
- interrupted request.

Expected behavior:

The application should handle the error gracefully and provide an understandable message to the user.

---

## 11. Test Cases

The following test cases can be used for the prototype:

| ID | Test Case | Input | Expected Result |
|---|---|---|---|
| TC-01 | Upload valid JPG | JPG image | Image accepted |
| TC-02 | Upload valid PNG | PNG image | Image accepted |
| TC-03 | Upload unsupported file | TXT/PDF | File rejected |
| TC-04 | Upload corrupted image | Invalid image | Error displayed |
| TC-05 | Upload large file | Oversized image | File rejected |
| TC-06 | Analyze REAL image | REAL image | REAL/AI prediction returned |
| TC-07 | Analyze AI image | AI image | REAL/AI prediction returned |
| TC-08 | Backend unavailable | Valid image | Error displayed |
| TC-09 | Repeat upload | Multiple images | Requests handled correctly |
| TC-10 | Complete workflow | Valid image | Result displayed |

---

## 12. Test Evidence

Testing evidence should be collected during development and final verification.

Recommended evidence includes:

- screenshots of the upload interface;
- screenshots of validation errors;
- screenshots of analysis states;
- screenshots of REAL predictions;
- screenshots of AI predictions;
- screenshots of confidence values;
- backend logs where relevant;
- test case results;
- ML prediction examples;
- incorrect prediction examples;
- integration test results.

The evidence should correspond to actual tests performed by the team.

---

## 13. Test Results

The final project report should record the actual results of the performed tests.

A test result table can be structured as follows:

| Test ID | Result | Status | Notes |
|---|---|---|---|
| TC-01 | Valid JPG upload | Passed / Failed | Actual observation |
| TC-02 | Valid PNG upload | Passed / Failed | Actual observation |
| TC-03 | Unsupported file | Passed / Failed | Actual observation |
| TC-04 | Corrupted image | Passed / Failed | Actual observation |
| TC-05 | Large file | Passed / Failed | Actual observation |
| TC-06 | REAL image | Passed / Failed | Actual observation |
| TC-07 | AI image | Passed / Failed | Actual observation |
| TC-08 | Backend unavailable | Passed / Failed | Actual observation |
| TC-09 | Repeated upload | Passed / Failed | Actual observation |
| TC-10 | End-to-end workflow | Passed / Failed | Actual observation |

The team should replace the placeholders with the results of the tests actually performed.

---

## 14. Known Testing Limitations

The current prototype has several testing limitations.

These may include:

- limited test dataset;
- limited number of AI-generated image types;
- limited number of test cases;
- differences between laboratory images and real-world images;
- possible model classification errors;
- limited testing of unseen AI generators.

These limitations should be considered when interpreting the results.

---

## 15. Future Testing Improvements

Future versions of DeepCheck may introduce:

- automated unit tests;
- automated API tests;
- larger test datasets;
- regression testing;
- browser compatibility testing;
- automated model evaluation;
- performance testing;
- load testing;
- security testing;
- continuous integration testing;
- systematic error analysis.

---

## 16. Summary

Testing of DeepCheck covers the frontend, backend, machine learning component, integration, and complete end-to-end workflow.

The main testing pipeline is:

**Input Validation → API Processing → ML Inference → Prediction → Result Display**

The testing process is intended to identify functional problems, integration issues, invalid-input handling problems, and machine learning classification errors.

Final test results should be based on actual tests performed by the project team and documented with appropriate evidence.
```
