import os  # <-- ДОБАВЬ ЭТУ СТРОЧКУ ПЕРВОЙ

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import contact

app = FastAPI(title="ESVIEM API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),  # <-- ЗАМЕНИ ЭТУ СТРОЧКУ
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/contact", tags=["contact"])

@app.get("/")
async def root():
    return {"message": "ESVIEM API v1.0.0"}
