from fastapi import APIRouter
from utils.jwt_handler import create_jwt_token
from pydantic import BaseModel

router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/token", response_model=Token)
def login():
    token = create_jwt_token({"user": "test_user"})
    return {"access_token": token, "token_type": "bearer"}