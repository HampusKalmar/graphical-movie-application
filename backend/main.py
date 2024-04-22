from fastapi import FastAPI, File, UploadFile
import pandas as pd


app = FastAPI()

@app.get("/")
def data_root():
    return {"pandas": pd.__version__}

@app.get("/movie-data")
def read_file():
    try:
        df = pd.read_csv("imdb-movies.csv", encoding='latin1')
        return df.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}
    