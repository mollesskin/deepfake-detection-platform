# DeepCheck — Project Management and Risks

## 1. Project Management

The project is managed using YouTrack with the workflow:

**Backlog → Develop → Review → Test → Staging → Done**

The project tasks cover frontend development, upload validation, backend API development, dataset preparation, model training, integration, testing, and documentation.

## 2. Main Workstreams

### Frontend

- image upload interface;
- upload validation;
- analysis states;
- result display.

### Backend

- prediction API;
- image reception;
- validation;
- ML integration.

### Machine Learning

- dataset preparation;
- model training;
- evaluation;
- error analysis.

### Documentation

- architecture;
- testing;
- training documentation;
- team contributions;
- final evidence.

## 3. Main Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Small dataset | High | Document limitations and expand dataset |
| Dataset imbalance | High | Check class distribution |
| Model errors | High | Record false positives/negatives |
| Data leakage | High | Keep related images in the same split |
| Invalid uploads | Medium | Validate file type and image content |
| Backend failure | Medium | Add error handling and testing |
| Integration problems | High | Test API and model independently |
| Limited time | High | Prioritize working prototype and evidence |
| Overstated metrics | High | Report only measured results |

## 4. Project Constraints

The prototype is being developed within an academic project timeframe. Therefore, the first objective is a demonstrable end-to-end system rather than a production-ready forensic platform.

## 5. Risk Response Principle

Risks should be documented transparently. If a limitation affects the results, it should be included in the final report rather than hidden.