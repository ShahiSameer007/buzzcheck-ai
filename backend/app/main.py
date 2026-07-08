from fastapi import FastAPI
from app.services import test_gemini, analyze_news
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsRequest(BaseModel):
    text: str

@app.post("/analyze")
def analyze(request: NewsRequest):
    try:
        result = analyze_news(request.text)
        return result

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


@app.get("/")
def home():
    return {"message": "News Analyzer API is running"}


@app.get("/test-gemini")
def gemini_test():
    return {
        "response": test_gemini()
    }