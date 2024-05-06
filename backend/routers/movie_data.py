from fastapi import APIRouter, HTTPException, Query
from config import DATA_FILE
from dependencies import read_movie_data

# Creating an APIRouter instance
router = APIRouter()

# Defining the route for getting movie data with optional search, pagination and limit query parameters.
@router.get("/movie-data")
def get_movie_data(search: str = Query(None), page: int = Query(1, ge=1), limit: int = Query(10, ge=1, le=2000)):
    # Read movie data from csv file
    data, error = read_movie_data(DATA_FILE, page=page, limit=limit, search=search)
    
    if error is not None:
        raise HTTPException(status_code=500, detail=error)
    
    # If search query is provided, filter the data based on the search query.
    if search: 
        data = [d for d in data if search.lower() in d['Movie Name'].lower()]
    
    return data[:limit]
    