import pandas as pd

# Function to read movie data from csv file
def read_movie_data(file_path, page=1, limit=10, search=None):
    try:
        df = pd.read_csv(file_path, encoding='latin1')
        
        # Remove non-ascii characters from the column names.
        df = df[df['Movie Name'].apply(lambda x: x.isascii())]
    
        if search:
            df = df[df['Movie Name'].str.contains(search, case=False, na=False)]
        
        # Calculate the start and end index for pagination.
        start_index = (page -1) * limit
        end_index = start_index + limit
        
        # Slice the dataframe to get desired page of data.
        filtered_df = df.iloc[start_index:end_index]
        return filtered_df.to_dict(orient="records"), None
    except Exception as e:
        return None, str(e)