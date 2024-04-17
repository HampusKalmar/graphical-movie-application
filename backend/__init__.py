from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
from data_loader import load_dataset, verify_dataset

app = Flask(__name__)
CORS(app)

@app.route('/')
def data():
    return jsonify({'message': 'Hello from the backend'})

@app.route('/api/imdb-data')
def load_data_route():
    dataset = load_dataset('IMDb Top 2000 Movies.csv')
    verify_dataset(dataset)
    sample_data = dataset.sample(n=5)
    return jsonify({'dataset': sample_data.to_dict(orient='records')})

if __name__ == '__main__':
    app.run(debug=True)