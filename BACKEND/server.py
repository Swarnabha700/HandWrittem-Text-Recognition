from flask import Flask, jsonify, request
import random
import time
import random
from lib.ocr import messages  


app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return "Welcome to your Flask app!"

# Post route example
@app.route('/api/data', methods=['POST'])
def post_data():
    
    data = request.json
    name = data.get("name")
    message = messages.get(name, "not found")

    if message == "not found":
        call another program
    else message != "not found":
        # Simulate a random delay between 25 seconds and 60 seconds (close to timeout)
        delay = random.randint(25, 60)
        time.sleep(delay)

    response = {
        "message": message
    }
    return jsonify(response), 201

if __name__ == '__main__':
    app.run(debug=True)



# https://stackoverflow.com/questions/36355732/how-to-increase-postman-client-request-timeout 

# client side
# import requests

# url = "http://127.0.0.1:5000/api/data"
# data = {"name": "img1"}

# try:
#     response = requests.post(url, json=data, timeout=30)  # Set a 30-second timeout
#     print(response.json())
# except requests.exceptions.Timeout:
#     print("Request timed out!")
