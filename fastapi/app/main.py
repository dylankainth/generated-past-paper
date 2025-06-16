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

modules = [
    {
        "id": "cs101",
        "name": "Computer Science 201",
        "description": "Introduction to Programming",
        "progress": 75,
        "color": "from-blue-500 to-cyan-500",
        "papers": [
            {
                "id": "midterm-2023",
                "name": "Midterm Exam 2023",
                "questions": [
                    {
                        "id": 1,
                        "question": "What is the time complexity of binary search?",
                        "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                        "correctAnswer": 1,
                        "explanation": "Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity."
                    },
                    {
                        "id": 2,
                        "question": "Which data structure uses LIFO (Last In, First Out) principle?",
                        "options": ["Queue", "Stack", "Array", "Linked List"],
                        "correctAnswer": 1,
                        "explanation": "A stack follows the LIFO principle where the last element added is the first one to be removed."
                    },
                    {
                        "id": 3,
                        "question": "What does API stand for?",
                        "options": [
                            "Application Programming Interface",
                            "Advanced Programming Instructions",
                            "Automated Program Integration",
                            "Application Process Integration"
                        ],
                        "correctAnswer": 0,
                        "explanation": "API stands for Application Programming Interface, which allows different software applications to communicate with each other."
                    }
                ],
                "completed": 12,
                "difficulty": "Medium",
                "timeLimit": "90 min"
            },

        ]
    }
]


papers = [{
    'id': 'paper1'
}]


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


@app.get("/api/dashboardData")
def get_dashboard_data():
    return {
        "modules": modules,
        "totalModules": len(modules)
    }


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
