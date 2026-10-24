# DeepCheck — Project Proposal

## 1. Project Overview

DeepCheck is a web-based prototype for detecting whether an uploaded image is real or AI-generated. The system combines a multilingual frontend, a Python backend API, and a machine-learning detection component.

The prototype demonstrates the complete workflow:

**image upload → backend API → ML model → prediction → result shown to the user**

The current project focuses on image analysis. Video detection is considered a future extension after the initial image-based prototype is evaluated.

## 2. Problem Statement

The rapid development of generative AI has made it increasingly difficult to distinguish authentic images from AI-generated content. A practical detection system should provide a simple interface where a user can submit an image and receive an automated prediction.

The project addresses this problem by integrating a trained detection model into a web application.

## 3. Project Goal

The main goal is to develop a working prototype that can:

- accept JPG and PNG images;
- validate uploaded files;
- send images to the backend;
- process the image with a detection model;
- return a prediction;
- display the result and confidence information to the user.

## 4. Target Users

The prototype is intended for users who need a quick initial assessment of whether an image is real or AI-generated.

Potential future users include:

- students and researchers;
- content moderators;
- journalists;
- social-media users;
- organizations working with digital media verification.

## 5. Scope

### Included

- multilingual web interface;
- image upload;
- upload validation;
- backend API;
- ML model integration;
- REAL/AI prediction;
- confidence display;
- basic error handling;
- testing and project documentation.

### Not Included in the Current Prototype

- reliable video deepfake detection;
- production-scale deployment;
- guaranteed forensic accuracy;
- complete protection against adversarial manipulation.

## 6. Expected Outcome

The expected result is a functional prototype demonstrating the complete technical pipeline from image upload to ML prediction and frontend presentation.

The project documentation records the architecture, dataset/training approach, testing process, team responsibilities, risks, and limitations.