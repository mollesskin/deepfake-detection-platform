# DeepCheck - Literature Review

## 1. Background

Deepfakes are synthetic or manipulated media produced using machine-learning techniques. The increasing accessibility of generative AI has created a need for methods that can distinguish authentic media from generated or manipulated content.

Deepfake detection is challenging because generative models continue to improve, reducing obvious visual artifacts and increasing the diversity of generated images.

## 2. Main Research Direction

The project focuses on image-level deepfake detection using machine learning. The practical objective is to classify an input image as REAL or AI-generated.

The project materials identify model training, image preparation, evaluation, and integration with a web application as important parts of the workflow.

## 3. Detection Challenges

Important challenges include:

- differences between datasets and real-world images;
- image compression;
- resizing and preprocessing;
- new image-generation methods;
- unseen generators;
- visually convincing synthetic images;
- false positive and false negative predictions.

A model that performs well on one dataset may not necessarily generalize to images produced by different generators or captured in different conditions.

## 4. Relevance to DeepCheck

The literature context supports the need for an experimental and evidence-based approach. The project therefore separates:

- dataset preparation;
- model training;
- evaluation;
- integration;
- application-level testing.

The final project should report actual experimental results and limitations rather than presenting assumed accuracy values.

## 5. Research Gap for the Prototype

The purpose of DeepCheck is not to claim a universal solution to deepfake detection. Instead, the project demonstrates how a trained detection model can be integrated into a usable web application and evaluated through controlled testing.

Future research can investigate larger datasets, stronger architectures, cross-generator evaluation, robustness testing, and video detection.
