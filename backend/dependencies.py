import pandas as pd

def read_movie_data(file_path):
    try:
        df = pd.read_csv(file_path, encoding='latin1')
        df = df[df['Movie Name'].apply(lambda x: x.isascii())]
        return df.to_dict(orient="records"), None
    except Exception as e:
        return None, str(e)