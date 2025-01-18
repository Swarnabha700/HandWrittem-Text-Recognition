from flask import Flask, jsonify, request

app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return "Welcome to your Flask app!"

# Post route example
@app.route('/api/data', methods=['POST'])
def post_data():
    response = {
        "message": "Data successfully received!"
    }
    return jsonify(response), 201

if __name__ == '__main__':
    app.run(debug=True)