import pandas as pd

def read_movie_data(file_path, page=1, limit=10, search=None):
    try:
        df = pd.read_csv(file_path, encoding='latin1')
        df = df[df['Movie Name'].apply(lambda x: x.isascii())]
    
        if search:
            df = df[df['Movie Name'].str.contains(search, case=False, na=False)]
        
        start_index = (page -1) * limit
        end_index = start_index + limit
        filtered_df = df.iloc[start_index:end_index]
        return filtered_df.to_dict(orient="records"), None
    except Exception as e:
        return None, str(e)