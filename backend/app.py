
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import cv2
import numpy as np
from grad_cam import generate_gradcam

app = Flask(__name__)
CORS(app)

model = load_model("Brain_Tumor.keras", compile=False)
for i, layer in enumerate(model.layers):
    print(i, layer.name, type(layer).__name__)
classes = ["meningioma_tumor", "no_tumor", "pituitary_tumor"]


@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["file"]

    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (224, 224))
    image = np.expand_dims(image, axis=0).astype("float32")

    predictions = model.predict(image, verbose=0)[0]
    heatmap = generate_gradcam(model, image)
    index = np.argmax(predictions)

    return jsonify({
        "prediction": classes[index],
        "confidence": float(predictions[index]),
        "probabilities": {classes[i]: float(predictions[i]) for i in range(3)},
        "heatmap": heatmap
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
