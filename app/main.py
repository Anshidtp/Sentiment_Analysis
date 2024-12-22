from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services import sentiment

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(sentiment.router)