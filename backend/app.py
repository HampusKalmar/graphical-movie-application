from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/data')
def data():
    return jsonify({'message': 'Hello from the backend'})

if __name__ == '__main__':
    app.run(debug=True)