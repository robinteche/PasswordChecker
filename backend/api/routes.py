from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.analyzer import analyze_password
from services.generator import generate_passwords

router = APIRouter()

class PasswordRequest(BaseModel):
    password: str

class PasswordResponse(BaseModel):
    score: int
    entropy: float
    label: str
    issues: list[str]
    feedback_suggestions: list[str]
    generated_alternatives: list[str]

@router.post("/analyze", response_model=PasswordResponse)
def analyze(req: PasswordRequest):
    if not req.password:
        raise HTTPException(status_code=400, detail="Password cannot be empty")
    
    analysis_result = analyze_password(req.password)
    alternatives = generate_passwords(count=3)
    
    return PasswordResponse(
        score=analysis_result["score"],
        entropy=analysis_result["entropy"],
        label=analysis_result["label"],
        issues=analysis_result["issues"],
        feedback_suggestions=analysis_result["feedback_suggestions"],
        generated_alternatives=alternatives
    )
