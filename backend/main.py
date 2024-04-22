from fastapi import FastAPI, File, UploadFile
from routers import movie_data


app = FastAPI()

app.include_router(movie_data.router)

@app.get("/")
def data_root():
    return {"Message": "Welcome to the Movie Data API!"}

    