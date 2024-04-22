from fastapi import APIRouter, HTTPException, Query
from config import DATA_FILE
from dependencies import read_movie_data

router = APIRouter()

@router.get("/movie-data")
def get_movie_data(search: str = Query(None), limit: int = Query(10, ge=1, le=2000)):
    data, error = read_movie_data(DATA_FILE)
    
    if error is not None:
        raise HTTPException(status_code=500, detail=error)
    
    if search: 
        data = [d for d in data if search.lower() in d['Movie Name'].lower()]
    
    return data[:limit]
    