# DeepCheck — Requirements

## 1. Functional Requirements

### FR-01 — Image Upload

The system shall allow the user to select and upload an image for analysis.

### FR-02 — Supported Formats

The prototype shall support JPG/JPEG and PNG image formats.

### FR-03 — Upload Validation

The frontend and/or backend shall reject unsupported or invalid image uploads.

### FR-04 — Backend Processing

The backend shall receive the uploaded image and pass it to the ML prediction component.

### FR-05 — Prediction

The system shall return a classification indicating whether the image is predicted to be REAL or AI-generated.

### FR-06 — Confidence

The system shall provide a confidence value associated with the prediction when available from the model.

### FR-07 — Result Display

The frontend shall display the prediction and related analysis information to the user.

### FR-08 — Error Handling

The system shall provide an understandable response when an upload is invalid or processing fails.

### FR-09 — Multilingual Interface

The frontend shall support the project languages implemented in the prototype: English, Russian, and Kazakh.

## 2. Non-Functional Requirements

### NFR-01 — Usability

The upload and analysis workflow should be understandable without technical knowledge.

### NFR-02 — Responsiveness

The interface should remain usable on common desktop and mobile screen sizes.

### NFR-03 — Maintainability

Frontend, backend, and ML components should remain separated so that each part can be modified independently.

### NFR-04 — Reliability

The application should handle invalid input and backend failures without crashing the user interface.

### NFR-05 — Reproducibility

The repository should contain the relevant training code, model-related code, and documentation required to understand the experiment.

## 3. Project Constraints

The project is currently a prototype. Model performance, dataset size, training configuration, and final evaluation metrics must be reported from actual experiments rather than assumed values.

The first implementation focuses on image detection. Video analysis is outside the current prototype scope.

## 4. Acceptance Criteria

The prototype can be considered functionally complete for the current scope when:

1. a supported image can be uploaded;
2. the backend receives the image;
3. the ML component produces a prediction;
4. the prediction is returned to the frontend;
5. the frontend displays the result;
6. invalid uploads are handled;
7. the complete workflow can be demonstrated and documented.