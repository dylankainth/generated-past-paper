from fastapi import FastAPI, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from typing import List
import os
from google import genai
from google.genai import types
import pathlib
import httpx
import random

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


@app.get("/api/dashboardData")
def get_dashboard_data():
    return {
        "modules": modules,
        "totalModules": len(modules)
    }


@app.post("/api/newModule")
async def new_module(
    module: str = Form(...),
    files: List[UploadFile] = File(...)
):

    # check if a module folder with the name exists
    module_dir = os.path.join(UPLOAD_DIR, module)
    if not os.path.exists(module_dir):
        # create a subdirectory with the name of the module
        os.makedirs(module_dir, exist_ok=True)

    # take the uploaded files and save them in the module directory
    for upload in files:
        file_path = os.path.join(module_dir, upload.filename)
        content = await upload.read()
        with open(file_path, "wb") as f:
            f.write(content)

    # configure GenAI client with API key from .env
    client = genai.Client(api_key="AIzaSyCM1H-QJnCRaytFVaW6XsjO1erGT3yheNA")

    # define the text prompt first
    prompt = "Generate 8 exam-style questions with answers from the files uploaded and return it ONLY ONE JSON OBJECT and nothing else for us to extract the data; reply as [{question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, explanation: 'Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity.'}, {question: 'Which data structure uses LIFO (Last In, First Out) principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctAnswer: 1, explanation: 'A stack follows the LIFO principle where the last element added is the first one to be removed.'}, {question: 'What does API stand for?', options: ['Application Programming Interface', 'Advanced Programming Instructions', 'Automated Program Integration', 'Application Process Integration'], correctAnswer: 0, explanation: 'API stands for Application Programming Interface, which allows different software applications to communicate with each other.'}] etc"

    filepath = pathlib.Path(UPLOAD_DIR, "abc12322",
                            "Lecture02 - Java, Linked Lists.pdf")

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            types.Part.from_bytes(
                data=filepath.read_bytes(),
                mime_type='application/pdf',
            ),
            prompt])

    # get text response from the model and remove "```json" and "```" from the response
    text_response = response.text.strip()
    if text_response.startswith("```json"):
        text_response = text_response[7:].strip()
    if text_response.endswith("```"):
        text_response = text_response[:-3].strip()
    # print the response as json
    try:
        # Use eval to convert string to list of dicts
        questions = eval(text_response)

        # put this in the modules arrray
        new_module = {
            "id": module,
            "name": module,
            "description": "Newly created module",
            "progress": 0,
            "color": "from-blue-500 to-cyan-500",
            "papers": [
                {
                    "id": f"{module}-paper" + str(random.randint(1000, 9999)),
                    "name": f"{module} Paper" + str(random.randint(1000, 9999)),
                    "questions": questions,
                    "completed": 0,
                    "difficulty": "Medium",
                    "timeLimit": "60 min"
                }
            ]
        }
        modules.append(new_module)

        return JSONResponse(content={"message": "Module processed", "questions": questions}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": "Failed to parse response", "details": str(e)}, status_code=500)

    # # Create module directory
    # module_dir = os.path.join(UPLOAD_DIR, module)
    # os.makedirs(module_dir, exist_ok=True)

    # # Save uploaded files
    # saved_files = []
    # for upload in files:
    #     file_path = os.path.join(module_dir, upload.filename)
    #     content = await upload.read()
    #     with open(file_path, "wb") as f:
    #         f.write(content)
    #     saved_files.append(upload.filename)

    # # Initialize Gemini LLM
    # api_key = "AIzaSyC3k0wjs5lYiGC1OFoM8NYdVHYpil_U2AY"
    # if not api_key:
    #     return JSONResponse(content={"error": "Missing GEMINI_API_KEY"}, status_code=500)

    # llm = ChatGoogleGenerativeAI(
    #     model="gemini-2.0-flash",
    #     google_api_key=api_key
    # )

    # # Process each file with Gemini
    # results = []
    # for filename in saved_files:
    #     file_path = os.path.join(module_dir, filename)
    #     try:
    #         with open(file_path, "rb") as f:
    #             file_data = f.read()
    #             print(file_data)
    #         response = llm.invoke([
    #             {"type": "file", "mime_type": "application/pdf", "data": file_data},
    #             {"type": "text", "text": "Generate 5 exam-style questions with answers from the files uplooaded and return it in a json format for us to extract the data"}
    #         ])
    #         print(response)
    #         results.append({
    #             "filename": filename,
    #             "questions": response
    #         })
    #     except Exception as e:
    #         results.append({
    #             "filename": filename,
    #             "error": str(e)
    #         })

    # return JSONResponse(content={"message": "Module processed", "results": results})
