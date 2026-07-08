import os
import json

from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel, ValidationError

from app.prompts import SYSTEM_PROMPT

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# -----------------------------
# Pydantic Models
# -----------------------------

class Credibility(BaseModel):
    writing_quality: int
    evidence_quality: int


class Sensationalism(BaseModel):
    overall: int
    emotional_language: int
    clickbait: int
    fear_words: list[str]
    all_caps: list[str]
    excessive_punctuation: bool


class Emotion(BaseModel):
    fear: int
    anger: int
    joy: int
    neutral: int


class NewsAnalysis(BaseModel):
    summary: str
    credibility: Credibility
    sensationalism: Sensationalism
    emotion: Emotion
    claims: list[str]
    credibility_flags: list[str]
    manipulation_indicators: list[str]
    verdict: str


# -----------------------------
# Gemini Test
# -----------------------------

def test_gemini():

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say hello to Sameer in one sentence."
    )

    return response.text


# -----------------------------
# News Analysis
# -----------------------------

def analyze_news(text: str):

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            SYSTEM_PROMPT,
            text
        ]
    )

    try:

        data = json.loads(response.text)

        validated = NewsAnalysis.model_validate(data)

        result = validated.model_dump()

        # -----------------------------
        # Backend Scoring Logic
        # -----------------------------

        writing = result["credibility"]["writing_quality"]
        facts = result["credibility"]["evidence_quality"]
        sensationalism = result["sensationalism"]["overall"]

        trust_score = round(
            writing * 0.25 +
            facts * 0.65 +
            (100 - sensationalism) * 0.10
        )

        trust_score = max(0, min(100, trust_score))

        result["overall_trust"] = trust_score
        result["trust_score"] = trust_score

        return result

    except json.JSONDecodeError:

        return {
            "success": False,
            "error": "Gemini returned invalid JSON."
        }

    except ValidationError as e:

        print("\n========== VALIDATION ERROR ==========")
        print(e)
        print("======================================\n")

        print("\n========== GEMINI RESPONSE ==========")
        print(data)
        print("=====================================\n")

        return {
            "success": False,
            "error": "Gemini returned an invalid schema.",
            "details": e.errors()
        }
    
