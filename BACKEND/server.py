from flask import Flask, jsonify, request
from flask_cors import CORS

from tensorflow.keras.layers.experimental.preprocessing import StringLookup
from tensorflow import keras
import matplotlib.pyplot as plt
import tensorflow as tf
import pickle

import numpy as np
import os
import re

from PIL import Image as im
import numpy as np
from word_detector import detect, prepare_img, sort_multiline
from path import Path
import matplotlib.pyplot as plt
import cv2
from typing import List
import argparse
from os import listdir
from os.path import isfile, join
import shutil #delete folder


app = Flask(__name__)
CORS(app)

batch_size = 64
padding_token = 99
image_width = 128
image_height = 32
max_len = 21
list_img_names_serial = []
t_images = []
base_path = "./"
base_image_path = ""
AUTOTUNE = ""
char_to_num = ""
num_to_chars = ""
inf_images = []
model = ""
custom_objects = ""
reconstructed_model = ""
prediction_model = ""
pred_test_text = []
flat_list = []
sentence = ""

image_file_name = "r06-137.png"

# Directory to save uploaded images
UPLOAD_FOLDER = './data/page'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'jfif', 'heic'}

# Configure the upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)



parser = argparse.ArgumentParser()
parser.add_argument('--kernel_size', type=int, default=25)
parser.add_argument('--sigma', type=float, default=11)
parser.add_argument('--theta', type=float, default=7)
parser.add_argument('--min_area', type=int, default=100)
parser.add_argument('--img_height', type=int, default=1000)
parsed = parser.parse_args()

np.random.seed(42)
tf.random.set_seed(42)

base_path = "./"



def allowed_file(filename):
    """Check if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def image_upload(file):
    global image_file_name

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
    image_file_name = filename



def reset_values_of_global_variables():
  global image_file_name, t_images, base_path, base_image_path, AUTOTUNE, char_to_num, num_to_chars, inf_images, model, custom_objects, reconstructed_model, prediction_model, pred_test_text, flat_list, batch_size, padding_token, image_width, image_height, max_len
  batch_size = 64
  padding_token = 99
  image_width = 128
  image_height = 32
  max_len = 21
  list_img_names_serial = []
  t_images = []
  base_path = "./"
  base_image_path = ""
  AUTOTUNE = ""
  char_to_num = ""
  num_to_chars = ""
  inf_images = []
  model = ""
  custom_objects = ""
  reconstructed_model = ""
  prediction_model = ""
  pred_test_text = []
  flat_list = []

def delete_folders():
    folder_path = "./test_images"

    if os.path.exists(folder_path):
        # Remove the folder and all its contents
        shutil.rmtree(folder_path)
        print(f"Folder '{folder_path}' and its contents have been deleted.")
    else:
        print(f"Folder '{folder_path}' does not exist.")

def save_image_names_to_text_files():
    fn_img = f"{os.getcwd()}/data/page/{image_file_name}"
    print(f'Processing file {fn_img}')
    img = prepare_img(cv2.imread(fn_img), parsed.img_height)
    detections = detect(img,
                        kernel_size=parsed.kernel_size,
                        sigma=parsed.sigma,
                        theta=parsed.theta,
                        min_area=parsed.min_area)
    lines = sort_multiline(detections)
    plt.imshow(img, cmap='gray')
    num_colors = 7
    colors = plt.cm.get_cmap('rainbow', num_colors)
    for line_idx, line in enumerate(lines):
        for word_idx, det in enumerate(line):
            xs = [det.bbox.x, det.bbox.x, det.bbox.x +
                    det.bbox.w, det.bbox.x + det.bbox.w, det.bbox.x]
            ys = [det.bbox.y, det.bbox.y + det.bbox.h,
                    det.bbox.y + det.bbox.h, det.bbox.y, det.bbox.y]
            plt.plot(xs, ys, c=colors(line_idx % num_colors))
            plt.text(det.bbox.x, det.bbox.y, f'{line_idx}/{word_idx}')
            print(det.bbox.x, det.bbox.y, det.bbox.w, det.bbox.h)
            crop_img = img[det.bbox.y:det.bbox.y +
                            det.bbox.h, det.bbox.x:det.bbox.x+det.bbox.w]
            
            path = './test_images'
            isExist = os.path.exists(path)
            if isExist == False:
                os.mkdir(path)
                print("Directory Created")

            cv2.imwrite(f"{path}/line" + str(line_idx) + "word" +
                        str(word_idx) + ".jpg", crop_img)
            full_img_path = "line" + \
                str(line_idx) + "word" + str(word_idx)+".jpg"
            list_img_names_serial.append(full_img_path)
            print(list_img_names_serial)
            list_img_names_serial_set = set(list_img_names_serial)

            textfile = open("./examples/img_names_sequence.txt", "w")
            for element in list_img_names_serial:
                textfile.write(element + "\n")
            textfile.close()

def atoi(text):
    return int(text) if text.isdigit() else text

def natural_keys(text):
    '''
    alist.sort(key=natural_keys) sorts in human order
    http://nedbatchelder.com/blog/200712/human_sorting.html
    (See Toothy's implementation in the comments)
    '''
    return [ atoi(c) for c in re.split(r'(\d+)', text) ]

def distortion_free_resize(image, img_size):
  w, h = img_size
  image = tf.image.resize(image, size=(h, w), preserve_aspect_ratio=True)

  # Check tha amount of padding needed to be done.
  pad_height = h - tf.shape(image)[0]
  pad_width = w - tf.shape(image)[1]

  # only necessary if you want to do same amount of padding on both sides.
  if pad_height % 2 != 0:
    height = pad_height // 2
    pad_height_top = height +1
    pad_height_bottom = height
  else:
    pad_height_top = pad_height_bottom = pad_height // 2

  if pad_width % 2 != 0:
    width = pad_width // 2
    pad_width_left = width + 1
    pad_width_right = width
  else:
    pad_width_left = pad_width_right = pad_width // 2

  image = tf.pad(
      image, paddings=[
          [pad_height_top, pad_height_bottom],
          [pad_width_left, pad_width_right],
          [0, 0],
      ],
  )
  image = tf.transpose(image, perm=[1,0,2])
  image = tf.image.flip_left_right(image)
  return image

def preprocess_image(image_path, img_size=(image_width, image_height)):
  image = tf.io.read_file(image_path)
  image = tf.image.decode_png(image, 1)
  image = distortion_free_resize(image, img_size)
  image = tf.cast(image, tf.float32) / 255.0
  return image

def process_images_2(image_path):
  image = preprocess_image(image_path)
  # label = vectorize_label(label)
  return {"image": image}
  
def prepare_test_images(image_paths):
  dataset = tf.data.Dataset.from_tensor_slices((image_paths)).map(
    process_images_2, num_parallel_calls=AUTOTUNE
  )

  # return dataset
  return dataset.batch(batch_size).cache().prefetch(AUTOTUNE)

class CTCLayer(keras.layers.Layer):

  def __init__(self, name=None):
    super().__init__(name=name)
    self.loss_fn = keras.backend.ctc_batch_cost

  def call(self, y_true, y_pred):
    batch_len = tf.cast(tf.shape(y_true)[0], dtype="int64")
    input_length = tf.cast(tf.shape(y_pred)[1], dtype="int64")
    label_length = tf.cast(tf.shape(y_true)[1], dtype="int64")

    input_length = input_length * tf.ones(shape=(batch_len, 1), dtype="int64")
    label_length = label_length * tf.ones(shape=(batch_len, 1), dtype="int64")
    loss = self.loss_fn(y_true, y_pred, input_length, label_length)
    self.add_loss(loss)

    # At test time, just return the computed predictions.
    return y_pred

def build_model():
  input_img = keras.Input(shape=(image_width, image_height, 1), name="image")
  labels = keras.layers.Input(name="label", shape=(None,))

  # first conv block
  x = keras.layers.Conv2D(
      32, (3,3), activation = "relu",
      kernel_initializer="he_normal",
      padding="same",
      name="Conv1"
  )(input_img)
  x = keras.layers.MaxPooling2D((2,2), name="pool1")(x)

  # Second conv block
  x = keras.layers.Conv2D(
      64, (3,3), activation = "relu", kernel_initializer="he_normal",
      padding="same",
      name="Conv2"
  )(x)
  x = keras.layers.MaxPooling2D((2,2), name="pool2")(x)

  # We have two maxpool layers with pool size and strides 2
  # Hence downsampled feature maps are 4x smaller the number of filters in the last layer is 64, 
  # Reshape accordingly before passing the output to the RNN part of the model.
  
  new_shape = ((image_width // 4), (image_height // 4) * 64)
  x = keras.layers.Reshape(target_shape=new_shape, name="reshape")(x)
  x = keras.layers.Dense(64, activation="relu", name="dense1")(x)
  x = keras.layers.Dropout(0.2)(x)

  # RNN
  x = keras.layers.Bidirectional(
      keras.layers.LSTM(128, return_sequences=True, dropout=0.25)
  )(x)
  x = keras.layers.Bidirectional(
    keras.layers.LSTM(64, return_sequences=True, dropout=0.25)
  )(x)
  # +2 is to account for the two special tokens introduced by the CTC loss.
  # The recommendation comes here: https://git.10/J0eXP.
  x = keras.layers.Dense(
    len(char_to_num.get_vocabulary()) + 2, activation="softmax", name="dense2"
  )(x)
  # Add CTC layer for calculating CTC Loss at each step.
  output = CTCLayer(name="ctc_loss")(labels, x)

  # Define the model.
  model = keras.models.Model(
      inputs=[input_img, labels], outputs=output, name="handwriting_recognizer"
  )
  
  # optimizer
  opt = keras.optimizers.Adam()
  # Compile the model and return
  model.compile(optimizer=opt)
  return model

def decode_batch_predictions(pred):
    input_len = np.ones(pred.shape[0]) * pred.shape[1]
    results = keras.backend.ctc_decode(pred, input_length=input_len, greedy=True)[0][0][
        :, :max_len
    ]

    output_text = []

    for res in results:
      res = tf.gather(res, tf.where(tf.math.not_equal(res, -1)))
      res = tf.strings.reduce_join(num_to_chars(res)).numpy().decode("utf-8")
      output_text.append(res)

    return output_text

for batch in inf_images[:3]:
    batch_images = batch["image"]
    # batch_images= tf.expand_dims(batch_images, axis=0)
    print(batch_images.shape)
    # print(batch_images.shape)

    _, ax = plt.subplots(4, 4, figsize=(15, 8))

    preds = prediction_model.predict(batch_images)
    pred_texts = decode_batch_predictions(preds)
    pred_test_text.append(pred_texts)

    for i in range(16):
      img = batch_images[i]
      img = tf.image.flip_left_right(img)
      img = tf.transpose(img, perm=[1, 0, 2])
      img = (img * 255.0).numpy().clip(0, 255).astype(np.uint8)
      img = img[:, :, 0]

      title = f"Prediction: {pred_texts[i]}"
      ax[i // 4, i % 4].imshow(img, cmap = "gray")
      ax[i // 4, i % 4].set_title(title)
      ax[i // 4, i % 4].axis("off")



@app.route('/api/data', methods=['POST'])
def post_data():
    global image_file_name, t_images, base_path, base_image_path, AUTOTUNE, char_to_num, num_to_chars, inf_images, model, custom_objects, reconstructed_model, prediction_model, pred_test_text, flat_list, sentence


  # *---------TODO----------*
    # get the name 
    # image_file_name = name

    # Check if a file is included in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
        
    file = request.files['image']

    image_upload(file)


    # data = request.get_json()

    # image_file_name = data['filename']

    save_image_names_to_text_files()

    base_image_path = os.path.join(base_path, "test_images")

    for f in listdir(base_image_path):
        t_images_path = os.path.join(base_image_path, f)
        t_images.append(t_images_path)
    
    t_images.sort(key=natural_keys)

    with open("./characters", "rb") as fp:   # Unpickling
        b = pickle.load(fp)

    AUTOTUNE = tf.data.experimental.AUTOTUNE
    char_to_num = StringLookup(vocabulary=b, mask_token=None)
    num_to_chars = StringLookup(vocabulary=char_to_num.get_vocabulary(), mask_token=None, invert=True)

    inf_images = prepare_test_images(t_images)

    model = build_model()
    model.summary()

    custom_objects = {"CTCLayer": CTCLayer}

    reconstructed_model = keras.models.load_model("./ocr_model_50_epoch.h5", custom_objects=custom_objects)
    prediction_model = keras.models.Model(
      reconstructed_model.get_layer(name="image").input, reconstructed_model.get_layer(name="dense2").output
    )

    for batch in inf_images.take(3):
      batch_images = batch["image"]
      _, ax = plt.subplots(4, 4, figsize=(15, 8))

      preds = prediction_model.predict(batch_images)
      pred_texts = decode_batch_predictions(preds)
      pred_test_text.append(pred_texts)

      for i in range(16):
        img = batch_images[i]
        img = tf.image.flip_left_right(img)
        img = tf.transpose(img, perm=[1, 0, 2])
        img = (img * 255.0).numpy().clip(0, 255).astype(np.uint8)
        img = img[:, :, 0]

        title = f"Prediction: {pred_texts[i]}"
        ax[i // 4, i % 4].imshow(img, cmap = "gray")
        ax[i // 4, i % 4].set_title(title)
        ax[i // 4, i % 4].axis("off")

    flat_list = [item for sublist in pred_test_text for item in sublist]

    # Now return the sentence formed from pred_test_text
    sentence = ' '.join(flat_list)

    reset_values_of_global_variables()
    
    delete_folders()

    response = {
        "message": sentence
    }

    return jsonify(response), 201

@app.route('/api/data', methods=['GET'])
def get_data():
    global sentence
    

    # Create a response sentence from the `flat_list`


    return jsonify(sentence), 200


if __name__ == '__main__':
    app.run(debug=True)