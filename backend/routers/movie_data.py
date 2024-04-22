from fastapi import APIRouter, HTTPException, Query
from config import DATA_FILE
from dependencies import read_movie_data

router = APIRouter()

@router.get("/movie-data")
def get_movie_data(limit: int = Query(10, ge=1, le=2000)):
    data, error = read_movie_data(DATA_FILE)
    
    if error is not None:
        raise HTTPException(status_code=500, detail=error)
    
    return data[:limit]
    