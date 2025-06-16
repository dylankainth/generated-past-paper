from fastapi import Form
from fastapi import Request
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from typing import List
import os
import google.generativeai as genai
from google.genai import types
import pathlib
import httpx

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

    client = genai.Client()

    filepath = pathlib.Path("uploaded_files", module, files[0].filename)

    contents = [

        types.Content(
            type=types.Content.Type.TEXT,
            text=prompt
        )
    ]

    for file in files:
        contents.append(
            types.Content(
                type=types.Content.Type.FILE,
                file=types.File(
                    name=file.filename,
                    mime_type=file.content_type,
                    data=httpx.get(filepath).read()
                )
            )
        )

    prompt = "Generate 5 exam-style questions with answers from the files uplooaded and return it in a json format for us to extract the data"
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=content
    )

    print(response)

    return JSONResponse(content={"message": "Module processing is not implemented yet."})

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
