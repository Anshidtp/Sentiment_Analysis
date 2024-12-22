from fastapi import APIRouter, UploadFile, HTTPException, Depends
from app.model import SentimentRequest, SentimentResponse
from app.services.auth import authenticate_user
from utils.sentiment_analysis import analyze_sentiment
import pandas as pd
from datetime import datetime

router = APIRouter()

@router.post("/upload-csv")
async def upload_csv(file: UploadFile, token: str = Depends(authenticate_user)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    try:
        data = pd.read_csv(file.file)
        if 'id' not in data.columns or 'text' not in data.columns:
            raise HTTPException(status_code=400, detail="CSV must contain 'id' and 'text' columns")

        results = []
        for index, row in data.iterrows():
            sentiment = analyze_sentiment(row['text'])
            results.append({
                "id": row['id'],
                "text": row['text'],
                "sentiment": sentiment,
                "timestamp": row.get('timestamp', datetime.now().isoformat())
            })

        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-text", response_model=SentimentResponse)
async def analyze_text(request: SentimentRequest, token: str = Depends(authenticate_user)):
    sentiment = analyze_sentiment(request.text)
    return {
        "id": 1,
        "text": request.text,
        "sentiment": sentiment,
        "timestamp": datetime.now().isoformat()
    }