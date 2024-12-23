from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.services.sentiment import analyze_file
from utils.jwt_handler import verify_jwt_token
from typing import List

router = APIRouter()

@router.post("/upload", dependencies=[Depends(verify_jwt_token)])
def upload_file(file: UploadFile = File(...)) -> List[dict]:
    print("File received:", file.filename)
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV file.")
    try:
        return analyze_file(file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))