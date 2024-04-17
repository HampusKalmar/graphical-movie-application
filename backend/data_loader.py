import pandas as pd # type: ignore

def load_dataset(file_path):
    dataset = pd.read_csv(file_path, encoding='latin1')
    return dataset

def verify_dataset(dataset):
    if dataset.isnull().values.any():
        dataset.fillna(value=0, inplace=True)
    if dataset.duplicated().any():
        dataset.drop_duplicates(inplace=True)
    if dataset.shape[0] < 10:
        raise ValueError("Dataset is too small")
    if dataset.shape[1] < 2:
        raise ValueError("Dataset is too small")
    if len(dataset.select_dtypes(exclude=['object']).columns) < len(dataset.columns):
        print("Note: Dataset contains non-numeric values, but this is acceptable.")

    return True