
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np


def generate_gradcam(model, image):
    base_model = model.layers[1]
    last_layer = base_model.get_layer("out_relu")

    feature_model = tf.keras.Model(
        base_model.input, [last_layer.output, base_model.output]
    )

    with tf.GradientTape() as tape:
        x = model.layers[0](image)
        features, _ = feature_model(x, training=False)
        tape.watch(features)

        pooled = model.layers[2](features)
        pooled = model.layers[3](pooled, training=False)
        predictions = model.layers[4](pooled)
        index = tf.argmax(predictions[0])
        score = predictions[:, index]

    gradients = tape.gradient(score, features)
    weights = tf.reduce_mean(gradients, axis=(0, 1, 2))
    heatmap = tf.reduce_sum(features[0] * weights, axis=-1)

    heatmap = tf.maximum(heatmap, 0)
    heatmap = heatmap / (tf.reduce_max(heatmap) + 1e-8)

    plt.figure(figsize=(5, 5))
    plt.imshow(image[0].astype("uint8"))
    plt.imshow(tf.image.resize(heatmap[..., None], (224, 224)).numpy().squeeze(), cmap="jet", alpha=0.4)
    plt.axis("off")
    plt.savefig("static/heatmap.png", bbox_inches="tight", pad_inches=0)
    plt.close()

    return "static/heatmap.png"
