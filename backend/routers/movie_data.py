from fastapi import APIRouter, HTTPException
from config import DATA_FILE
from dependencies import read_movie_data

router = APIRouter()

@router.get("/movie-data")
def get_movie_data():
    data, error = read_movie_data(DATA_FILE)
    if error:
        raise HTTPException(status_code=500, detail=error)
    return data
    