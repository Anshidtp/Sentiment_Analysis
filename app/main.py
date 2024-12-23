from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services import sentiment
from app.routes.analysis import router as analysis_router
from app.services.auth import router as auth_router

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000""http://192.168.1.6:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router)
app.include_router(analysis_router)