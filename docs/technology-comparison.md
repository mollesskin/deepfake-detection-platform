# DeepCheck — Technology Comparison

## 1. Frontend

The current prototype uses standard web technologies:

- HTML;
- CSS;
- JavaScript.

This approach keeps the frontend lightweight and makes the upload and result workflow easy to inspect.

## 2. Backend

Python with FastAPI is used for the backend API.

FastAPI provides a lightweight way to expose the image-analysis functionality through HTTP endpoints and connect the web interface with the ML component.

## 3. Machine Learning

The ML component is implemented in Python. The repository contains model-related and training-related files under the `ml/` directory.

The exact model architecture and training parameters should be taken from the current implementation and experiment records.

## 4. Alternative Technologies

| Area | Selected | Possible Alternative | Reason for Current Choice |
|---|---|---|---|
| Frontend | HTML/CSS/JavaScript | React | Simple prototype and direct browser control |
| Backend | FastAPI | Flask / Django | Suitable for an API-oriented ML prototype |
| ML | Python | Other ML ecosystems | Strong ecosystem for image ML |
| API | HTTP/JSON + image upload | GraphQL | Simpler for the current workflow |

## 5. Selection Principle

Technology selection prioritizes:

- ease of integration;
- development speed;
- maintainability;
- suitability for ML inference;
- clear separation between frontend, backend, and ML components.

## 6. Future Changes

If the system grows beyond the prototype, the team may consider a more structured frontend framework, asynchronous inference, persistent storage, authentication, monitoring, containerization, and production deployment.