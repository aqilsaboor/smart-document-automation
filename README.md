# 🤖 Smart Document Automation System (SDAS)

[![Docker](https://img.shields.io/badge/Docker-2CA5E0?logo=docker&logoColor=white)](https://www.docker.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)

Enterprise-grade AI document processing system that automatically classifies documents and extracts key fields.

![System Architecture](https://i.imgur.com/VzR7lDg.png)

## ✨ Features
- Document type classification (invoices, resumes, contracts)
- Key field extraction with confidence scores
- Human-in-the-loop validation UI
- Containerized deployment
- Production-ready architecture

## ⚙️ Tech Stack
| Component       | Technology                          |
|-----------------|-------------------------------------|
| **Backend**     | FastAPI, Pydantic                   |
| **ML Engine**   | Hugging Face Transformers (mocked) |
| **Frontend**    | React, Tailwind CSS, Vite           |
| **Deployment**  | Docker, Docker Compose              |

## 🚀 Quick Start
1. Clone the repo:
```bash
git clone https://github.com/aqilsaboor/smart-document-automation.git
cd smart-document-automation