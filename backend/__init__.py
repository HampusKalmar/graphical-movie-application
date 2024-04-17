from flask import Flask, request, jsonify
from data_loader import load_dataset, verify_dataset

app = Flask(__name__)

@app.route('/')
def data():
    return jsonify({'message': 'Hello from the backend'})

@app.route('/imdb-data')
def load_data_route():
    dataset = load_dataset('IMDb Top 2000 Movies.csv')
    verify_dataset(dataset)
    sample_data = dataset.sample(n=5)
    return jsonify({'data': sample_data.to_dict(orient='records')})

if __name__ == '__main__':
    app.run(debug=True)