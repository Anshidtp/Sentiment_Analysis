from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from app.services.sentiment import analyze_file
from utils.jwt_handler import verify_jwt_token
from typing import List

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    token: str = Query(..., description="Authentication token")
) -> List[dict]:
    # Verify token
    try:
        verify_jwt_token(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

    print(f"Processing file: {file.filename}")  # Debug log
    
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=422,
            detail="File must be a CSV file with .csv extension"
        )
    
    try:
        results = analyze_file(file)
        #print(results)
        return results
    except Exception as e:
        print(f"Error processing file: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))