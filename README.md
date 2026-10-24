<<<<<<< HEAD
# DeepCheck - Deepfake Detection Platform

DeepCheck is a web-based deepfake detection prototype designed to analyze uploaded images and identify whether they are likely to be real or AI-generated.

The project combines a multilingual web interface, a FastAPI backend, and a machine-learning image classification component.

## Project Goal

The main goal of DeepCheck is to provide a simple and accessible interface for checking suspicious images.

The prototype focuses on the following workflow:

```text
User
  ↓
Upload Image
  ↓
Frontend Validation
  ↓
FastAPI Backend
  ↓
ML Image Classification
  ↓
Prediction
  ↓
REAL / AI + Confidence
  ↓
Result Display
```

The current project is an experimental prototype. The machine-learning component is being developed and evaluated iteratively.

## Main Features

- Image upload through a web interface
- JPG and PNG image support
- Client-side image validation
- Backend image validation
- FastAPI REST API
- Machine-learning image classification
- REAL / AI prediction
- Confidence score display
- Error handling for invalid uploads
- Multilingual interface
- Responsive web interface
- Separation between frontend, backend and ML components

## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Responsive UI
- Multilingual interface

### Backend

- Python
- FastAPI
- Uvicorn
- Pillow
- Python Multipart

### Machine Learning

- PyTorch
- Torchvision
- Hugging Face Transformers
- Image classification
- Custom training pipeline

### Project Management

- Git
- GitHub
- YouTrack

## Project Structure

```text
deepfake-detection-platform/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── assets/
│
├── ml/
│   ├── experiment_01.md
│   ├── model.py
│   └── train.py
│
├── docs/
│   ├── architecture.md
│   ├── dataset-and-training.md
│   ├── existing-system-comparison.md
│   ├── literature-review.md
│   ├── project-management-and-risks.md
│   ├── project-proposal.md
│   ├── requirements.md
│   ├── team-contributions.md
│   ├── technology-comparison.md
│   ├── testing.md
│   └── verification-and-evaluation-plan.md
│
├── diagrams/
│   ├── system_architecture.png
│   └── application_flow.png
│
├── screenshots/
│   ├── homepage.png
│   ├── how_it_works.png
│   ├── about.png
│   ├── upload.png
│   └── ai_result.png
│
├── tests/
│   └── test-cases.md
│
├── README.md
└── .gitignore
```

## System Architecture

The system consists of three main components.

```text
┌───────────────────────┐
│       FRONTEND        │
│     HTML / CSS / JS   │
└───────────┬───────────┘
            │
            │ HTTP Request
            ↓
┌───────────────────────┐
│       BACKEND         │
│       FastAPI         │
└───────────┬───────────┘
            │
            │ Image
            ↓
┌───────────────────────┐
│     ML COMPONENT      │
│   Image Classifier    │
└───────────┬───────────┘
            │
            ↓
       REAL / AI
       + Confidence
```

More detailed architectural information is available in:

`docs/architecture.md`

## Application Flow

```text
1. User selects an image
          ↓
2. Frontend validates the file
          ↓
3. Image is uploaded to the API
          ↓
4. Backend validates and reads the image
          ↓
5. ML model performs inference
          ↓
6. Backend determines the prediction
          ↓
7. API returns the result
          ↓
8. Frontend displays the result
```

## Running the Backend

Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required packages:

```bash
pip install fastapi uvicorn python-multipart pillow torch torchvision transformers
```

Navigate to the backend directory:

```bash
cd backend
```

Start the development server:

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

The root endpoint can be used to verify that the backend is running.

## Running the Frontend

The frontend is implemented using HTML, CSS and JavaScript.

The main files are:

```text
frontend/index.html
frontend/style.css
frontend/script.js
```

The frontend communicates with the FastAPI backend through HTTP requests.

For local development, the frontend can be opened using a local development server or through the development environment used by the team.

## Machine Learning

The `ml/` directory contains the experimental machine-learning implementation.

```text
ml/
├── model.py
├── train.py
└── experiment_01.md
```

`model.py` contains the model architecture.

`train.py` contains the training and validation pipeline.

`experiment_01.md` documents the initial experiment.

The project is designed to support a dedicated training and evaluation pipeline using real and AI-generated images.

The planned workflow is:

```text
Dataset
   ↓
Image Preparation
   ↓
Train / Validation / Test Split
   ↓
Model Training
   ↓
Validation
   ↓
Evaluation
   ↓
Model Checkpoint
   ↓
Backend Integration
```

The custom dataset and final model evaluation are still part of the ongoing development process. Therefore, final accuracy and other performance metrics are not presented in this README until they are measured using a defined evaluation procedure.

## Testing

The project includes functional and integration testing.

Main test areas include:

- Valid JPG upload
- Valid PNG upload
- Unsupported file formats
- Corrupted images
- Empty upload
- REAL image analysis
- AI-generated image analysis
- Confidence display
- Backend unavailable state
- Repeated uploads
- ML inference errors

Test documentation:

```text
tests/test-cases.md
docs/testing.md
```

The complete application flow is tested as:

```text
Frontend
   ↓
Upload
   ↓
Backend API
   ↓
ML Inference
   ↓
Prediction
   ↓
Frontend Result
```

## Documentation

The repository contains additional project documentation:

| Document | Description |
|---|---|
| `architecture.md` | System architecture and component interaction |
| `dataset-and-training.md` | Dataset preparation and ML training process |
| `existing-system-comparison.md` | Comparison with existing solutions |
| `literature-review.md` | Research and literature review |
| `project-management-and-risks.md` | Project management and risks |
| `project-proposal.md` | Project proposal and objectives |
| `requirements.md` | Functional and non-functional requirements |
| `team-contributions.md` | Team roles and contributions |
| `technology-comparison.md` | Technology selection and comparison |
| `testing.md` | Testing strategy and results |
| `verification-and-evaluation-plan.md` | Verification and evaluation methodology |

## Project Management

The project is managed using YouTrack.

The main workflow is:

```text
Backlog
   ↓
Develop
   ↓
Review
   ↓
Test
   ↓
Staging
   ↓
Done
```

Current project tasks cover:

- Frontend upload interface
- Image validation
- Result presentation
- Prediction API
- Dataset preparation
- Model training
- ML/backend integration
- Frontend/backend integration
- Application testing
- Project documentation

## Team

### Nariman Nurai - SE-2410

Role: Frontend Developer

Main responsibilities:

- Web interface
- Image upload interface
- Validation states
- Result presentation
- Frontend/backend integration
- UI testing and screenshots

GitHub: `nuraikaan`

### Omar Moldir - SE-2426

Role: Machine Learning Developer

Main responsibilities:

- Dataset preparation
- ML model development
- Training experiments
- Model evaluation
- ML documentation

GitHub: `mollesskin`

### Talgatova Ayaulym - SE-2427

Role: Backend Developer

Main responsibilities:

- FastAPI backend
- Image upload API
- Backend validation
- ML integration
- API testing

GitHub: `Tayalov`

## Current Development Status

The prototype currently provides the main application architecture:

```text
Frontend
   ↓
FastAPI
   ↓
ML Inference
   ↓
Prediction
   ↓
Frontend Result
```

The frontend, backend API and initial ML integration have been implemented.

The machine-learning pipeline is being developed separately so that the project can later use a properly trained and evaluated project-specific model.

Current limitations include:

- The ML dataset still needs to be prepared in the local project environment.
- The custom training pipeline requires a completed training run.
- Final model metrics have not yet been established.
- Deepfake detection is probabilistic and may produce incorrect predictions.
- Image-only detection cannot guarantee that an image is authentic.

## Future Improvements

Planned improvements include:

1. Prepare and finalize the training dataset.
2. Train the project-specific detection model.
3. Evaluate the model on a separate test set.
4. Calculate accuracy, precision, recall and F1-score.
5. Analyze false-positive and false-negative cases.
6. Integrate the evaluated model into the FastAPI backend.
7. Improve robustness to different image sources and compression levels.
8. Extend the system to video deepfake detection.
9. Improve model explainability.
10. Deploy the application to a production environment.


=======
# DeepCheck - Deepfake Detection Platform

DeepCheck is a web-based deepfake detection prototype designed to analyze uploaded images and identify whether they are likely to be real or AI-generated.

The project combines a multilingual web interface, a FastAPI backend, and a machine-learning image classification component.

## Project Goal

The main goal of DeepCheck is to provide a simple and accessible interface for checking suspicious images.

The prototype focuses on the following workflow:

```text
User
  ↓
Upload Image
  ↓
Frontend Validation
  ↓
FastAPI Backend
  ↓
ML Image Classification
  ↓
Prediction
  ↓
REAL / AI + Confidence
  ↓
Result Display
```

The current project is an experimental prototype. The machine-learning component is being developed and evaluated iteratively.

## Main Features

- Image upload through a web interface
- JPG and PNG image support
- Client-side image validation
- Backend image validation
- FastAPI REST API
- Machine-learning image classification
- REAL / AI prediction
- Confidence score display
- Error handling for invalid uploads
- Multilingual interface
- Responsive web interface
- Separation between frontend, backend and ML components

## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Responsive UI
- Multilingual interface

### Backend

- Python
- FastAPI
- Uvicorn
- Pillow
- Python Multipart

### Machine Learning

- PyTorch
- Torchvision
- Hugging Face Transformers
- Image classification
- Custom training pipeline

### Project Management

- Git
- GitHub
- YouTrack

## Project Structure

```text
deepfake-detection-platform/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── assets/
│
├── ml/
│   ├── experiment_01.md
│   ├── model.py
│   └── train.py
│
├── docs/
│   ├── architecture.md
│   ├── dataset-and-training.md
│   ├── existing-system-comparison.md
│   ├── literature-review.md
│   ├── project-management-and-risks.md
│   ├── project-proposal.md
│   ├── requirements.md
│   ├── team-contributions.md
│   ├── technology-comparison.md
│   ├── testing.md
│   └── verification-and-evaluation-plan.md
│
├── diagrams/
│   ├── system_architecture.png
│   └── application_flow.png
│
├── screenshots/
│   ├── homepage.png
│   ├── how_it_works.png
│   ├── about.png
│   ├── upload.png
│   └── ai_result.png
│
├── tests/
│   └── test-cases.md
│
├── README.md
└── .gitignore
```

## System Architecture

The system consists of three main components.

```text
┌───────────────────────┐
│       FRONTEND        │
│     HTML / CSS / JS   │
└───────────┬───────────┘
            │
            │ HTTP Request
            ↓
┌───────────────────────┐
│       BACKEND         │
│       FastAPI         │
└───────────┬───────────┘
            │
            │ Image
            ↓
┌───────────────────────┐
│     ML COMPONENT      │
│   Image Classifier    │
└───────────┬───────────┘
            │
            ↓
       REAL / AI
       + Confidence
```

More detailed architectural information is available in:

`docs/architecture.md`

## Application Flow

```text
1. User selects an image
          ↓
2. Frontend validates the file
          ↓
3. Image is uploaded to the API
          ↓
4. Backend validates and reads the image
          ↓
5. ML model performs inference
          ↓
6. Backend determines the prediction
          ↓
7. API returns the result
          ↓
8. Frontend displays the result
```

## Running the Backend

Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required packages:

```bash
pip install fastapi uvicorn python-multipart pillow torch torchvision transformers
```

Navigate to the backend directory:

```bash
cd backend
```

Start the development server:

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

The root endpoint can be used to verify that the backend is running.

## Running the Frontend

The frontend is implemented using HTML, CSS and JavaScript.

The main files are:

```text
frontend/index.html
frontend/style.css
frontend/script.js
```

The frontend communicates with the FastAPI backend through HTTP requests.

For local development, the frontend can be opened using a local development server or through the development environment used by the team.

## Machine Learning

The `ml/` directory contains the experimental machine-learning implementation.

```text
ml/
├── model.py
├── train.py
└── experiment_01.md
```

`model.py` contains the model architecture.

`train.py` contains the training and validation pipeline.

`experiment_01.md` documents the initial experiment.

The project is designed to support a dedicated training and evaluation pipeline using real and AI-generated images.

The planned workflow is:

```text
Dataset
   ↓
Image Preparation
   ↓
Train / Validation / Test Split
   ↓
Model Training
   ↓
Validation
   ↓
Evaluation
   ↓
Model Checkpoint
   ↓
Backend Integration
```

The custom dataset and final model evaluation are still part of the ongoing development process. Therefore, final accuracy and other performance metrics are not presented in this README until they are measured using a defined evaluation procedure.

## Testing

The project includes functional and integration testing.

Main test areas include:

- Valid JPG upload
- Valid PNG upload
- Unsupported file formats
- Corrupted images
- Empty upload
- REAL image analysis
- AI-generated image analysis
- Confidence display
- Backend unavailable state
- Repeated uploads
- ML inference errors

Test documentation:

```text
tests/test-cases.md
docs/testing.md
```

The complete application flow is tested as:

```text
Frontend
   ↓
Upload
   ↓
Backend API
   ↓
ML Inference
   ↓
Prediction
   ↓
Frontend Result
```

## Documentation

The repository contains additional project documentation:

| Document | Description |
|---|---|
| `architecture.md` | System architecture and component interaction |
| `dataset-and-training.md` | Dataset preparation and ML training process |
| `existing-system-comparison.md` | Comparison with existing solutions |
| `literature-review.md` | Research and literature review |
| `project-management-and-risks.md` | Project management and risks |
| `project-proposal.md` | Project proposal and objectives |
| `requirements.md` | Functional and non-functional requirements |
| `team-contributions.md` | Team roles and contributions |
| `technology-comparison.md` | Technology selection and comparison |
| `testing.md` | Testing strategy and results |
| `verification-and-evaluation-plan.md` | Verification and evaluation methodology |

## Project Management

The project is managed using YouTrack.

The main workflow is:

```text
Backlog
   ↓
Develop
   ↓
Review
   ↓
Test
   ↓
Staging
   ↓
Done
```

Current project tasks cover:

- Frontend upload interface
- Image validation
- Result presentation
- Prediction API
- Dataset preparation
- Model training
- ML/backend integration
- Frontend/backend integration
- Application testing
- Project documentation

## Team

### Nariman Nurai - SE-2410

Role: Frontend Developer

Main responsibilities:

- Web interface
- Image upload interface
- Validation states
- Result presentation
- Frontend/backend integration
- UI testing and screenshots

GitHub: `nuraikaan`

### Omar Moldir - SE-2426

Role: Machine Learning Developer

Main responsibilities:

- Dataset preparation
- ML model development
- Training experiments
- Model evaluation
- ML documentation

GitHub: `mollesskin`

### Talgatova Ayaulym - SE-2427

Role: Backend Developer

Main responsibilities:

- FastAPI backend
- Image upload API
- Backend validation
- ML integration
- API testing

GitHub: `Tayalov`

## Current Development Status

The prototype currently provides the main application architecture:

```text
Frontend
   ↓
FastAPI
   ↓
ML Inference
   ↓
Prediction
   ↓
Frontend Result
```

The frontend, backend API and initial ML integration have been implemented.

The machine-learning pipeline is being developed separately so that the project can later use a properly trained and evaluated project-specific model.

Current limitations include:

- The ML dataset still needs to be prepared in the local project environment.
- The custom training pipeline requires a completed training run.
- Final model metrics have not yet been established.
- Deepfake detection is probabilistic and may produce incorrect predictions.
- Image-only detection cannot guarantee that an image is authentic.

## Future Improvements

Planned improvements include:

1. Prepare and finalize the training dataset.
2. Train the project-specific detection model.
3. Evaluate the model on a separate test set.
4. Calculate accuracy, precision, recall and F1-score.
5. Analyze false-positive and false-negative cases.
6. Integrate the evaluated model into the FastAPI backend.
7. Improve robustness to different image sources and compression levels.
8. Extend the system to video deepfake detection.
9. Improve model explainability.
10. Deploy the application to a production environment.


>>>>>>> 34ebeebbfb97ad95e165c6aa194c3fd0e424ed5f
