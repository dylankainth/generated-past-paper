# 🧠 Full-Stack Vite + Django Project

This is a full-stack web application with:

- **Frontend**: Vite + TypeScript + Tailwind CSS
- **Backend**: Django (Python)
- **Deployment**: Google Cloud Run (via Docker)

---

## 🚀 Project Structure


GENERATED-PAST-PAPER-5/
│
├── backend/ # Django project
├── src/ # Frontend source (Vite)
├── venv/ # Python virtual environment (optional for local dev)
├── Dockerfile.backend # Docker config for Django
├── Dockerfile.frontend # Docker config for Vite
├── requirements.txt # Python dependencies
├── package.json # Frontend dependencies
├── cloudbuild.yaml # Optional GCP CI/CD config
└── README.md # You're here

yaml
Copy
Edit

---

## 🧑‍💻 Development Setup

### 1. Frontend (Vite + Tailwind)

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
Runs at: http://localhost:5173

If you're calling the backend, proxy config should be in vite.config.ts.

2. Backend (Django)
bash
Copy
Edit
# Set up virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Django dev server
python backend/manage.py runserver
Runs at: http://localhost:8000