from fastapi import FastAPI, File, UploadFile
from routers import movie_data
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

origins = os.getenv("ALLOWED_ORIGINS").split(",")

app.include_router(movie_data.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def data_root():
    return {"Message": "Welcome to the Movie Data API!"}
