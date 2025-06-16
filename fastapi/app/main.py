from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from fastapi.responses import JSONResponse
from typing import List
import os

load_dotenv()

app = FastAPI()

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Allow frontend (usually Vite dev server runs on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI"}


@app.get("/api/plan")
def generate_plan(request, goal: str):
    api_key = "AIzaSyCM1H-QJnCRaytFVaW6XsjO1erGT3yheNA"
    if not api_key:
        return {"error": "Missing GEMINI_API_KEY in .env"}

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key=api_key
    )

    prompt = f"Create a 3-day meal and workout plan for a student with the goal: {goal}"
    try:
        return {"plan": llm.invoke(prompt)}
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/modules")
def get_modules():
    return [
        {
            'id': 'cs101',
            'name': 'Computer Science 201',
            'description': 'Introduction to Programming',
            'papers': 12,
            'questions': 156,
            'lastActivity': '2 days ago',
            'progress': 75,
            'color': 'from-blue-500 to-cyan-500'
        }
    ]

# the new module endpoint has a formdata body with a multiple files;


@app.post("/api/newModule")
async def upload_files(files: List[UploadFile] = File(...)):
    saved_files = []

    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        saved_files.append(file.filename)

    return JSONResponse(content={"message": "Files uploaded successfully", "files": saved_files})
