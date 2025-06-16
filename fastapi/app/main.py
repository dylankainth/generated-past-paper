from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

app = FastAPI()

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
