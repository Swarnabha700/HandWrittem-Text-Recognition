from flask import Flask, jsonify, request
import os

app = Flask(__name__)

image_name = ""

# Directory to save uploaded images
UPLOAD_FOLDER = './data/page'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'jfif', 'heic'}

# Configure the upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    """Check if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def image_upload(file):
    global image_name

    # Check if a file is selected
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Validate file type
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400

    # Save the file
    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    image_name = filename

    return filepath

@app.route('/api/data', methods=['POST'])
def upload_file():

    # Check if a file is included in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
        
    file = request.files['image']

    filepath = image_upload(file)

    # Respond with success
    return jsonify({'message': f'File {image_name} uploaded successfully', 'path': filepath}), 200


if __name__ == '__main__':
    app.run(debug=True)
