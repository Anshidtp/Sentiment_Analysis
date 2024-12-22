from pydantic import BaseModel

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    id: int
    text: str
    sentiment: str
    timestamp: str