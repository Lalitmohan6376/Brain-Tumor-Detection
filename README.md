# 🧠 Brain Tumor Detection Using Deep Learning

An AI-powered Brain Tumor Detection system built using **Python, TensorFlow, Keras, and MobileNetV2**. The project uses deep learning to classify brain MRI images into four categories and includes **Grad-CAM visualization** to help visualize the image regions that influence the model's predictions.

The project combines a deep learning model, a Python backend, and a frontend interface to provide an interactive way to explore brain tumor classification.

---

## ✨ Features

- 🧠 **Brain Tumor Classification:** Classifies brain MRI images into four categories.
- 🤖 **MobileNetV2 Transfer Learning:** Uses a pretrained MobileNetV2 architecture as the foundation for the image classification model.
- 🔬 **Deep Learning with TensorFlow/Keras:** Uses TensorFlow and Keras to build and run the classification model.
- 🌡️ **Grad-CAM Visualization:** Generates a heatmap to highlight image regions that contribute to a model prediction.
- 🖼️ **MRI Image Analysis:** Supports image-based brain tumor prediction through the application.
- ⚙️ **Python Backend:** Provides the backend logic for model inference and image processing.
- 🌐 **Frontend Interface:** Separates the user interface from the backend for a more organized application structure.
- 📦 **Saved Model:** Stores the trained model in Keras format for reuse during inference.

---

## 🎯 Project Objective

The primary objective of this project is to develop a deep learning-based system that can classify brain MRI images into different categories.

Instead of training an entire convolutional neural network from scratch, the project uses **MobileNetV2 transfer learning** to leverage pretrained image features and adapt the model to brain tumor classification.

The project also incorporates Grad-CAM visualization to make predictions easier to inspect by displaying a heatmap over the input image.

> ⚠️ This project is intended for educational and research purposes. Its predictions and heatmaps are not a substitute for professional medical diagnosis.

---

## 🏷️ Classification Categories

The model is designed to classify images into the following four categories:

| Class | Description |
|---|---|
| 🧠 `glioma_tumor` | Brain MRI images belonging to the glioma tumor category |
| 🧠 `meningioma_tumor` | Brain MRI images belonging to the meningioma tumor category |
| 🧠 `no_tumor` | Brain MRI images belonging to the no-tumor category |
| 🧠 `pituitary_tumor` | Brain MRI images belonging to the pituitary tumor category |

The predicted category depends on the trained model and the input image.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| 🐍 Python | Main programming language |
| 🧠 TensorFlow | Deep learning framework |
| 🔧 Keras | Model construction, training, and inference |
| 📱 MobileNetV2 | Transfer learning architecture for image classification |
| 🖼️ Image Processing | Preparing MRI images for model input |
| 🔥 Grad-CAM | Visualizing regions influencing model predictions |
| ⚙️ Python Backend | Model inference and application logic |
| 🌐 Frontend | User-facing application interface |
| 📓 Jupyter Notebook | Model development and experimentation |
| 📦 Git | Version control |

---

## 🧠 Deep Learning Model

### MobileNetV2

MobileNetV2 is a convolutional neural network architecture designed to extract useful visual features efficiently. It is commonly used for image classification and transfer learning.

In this project, MobileNetV2 serves as the foundation for a brain MRI image classification model.

**Why MobileNetV2?**

- ⚡ Efficient feature extraction.
- 🧩 Reuses knowledge learned from a pretrained image model.
- 🖼️ Suitable for image classification applications.
- 🔄 Can be adapted to a custom set of classification categories.

### Transfer Learning Workflow

The general transfer learning workflow is:

1. Load and prepare the brain MRI image dataset.
2. Resize images to the input dimensions expected by the model.
3. Use MobileNetV2 to extract image features.
4. Adapt the classification layers to the four target categories.
5. Train and validate the model.
6. Save the trained model in Keras format.
7. Load the saved model for predictions.

The exact training configuration and layer-freezing strategy depend on the implementation in the notebook.

---

## 🔬 Grad-CAM Visualization

Grad-CAM stands for **Gradient-weighted Class Activation Mapping**. It is a visualization technique used to highlight image regions that contribute to a model's prediction for a particular class.

In this project, Grad-CAM is implemented in `grad_cam.py`.

### How Grad-CAM Works

1. 🖼️ The input MRI image is passed through the trained model.
2. 🎯 The model produces class scores or predictions.
3. 🔬 Gradients associated with the selected class are used to estimate the importance of feature-map regions.
4. 🌡️ A heatmap is generated from the weighted feature maps.
5. 🧩 The heatmap can be visualized alongside or over the original MRI image.

The backend's `static` directory contains a `heatmap.png` file, which is associated with the project's visualization assets.

**Important:** A Grad-CAM heatmap shows which image regions influenced a model prediction. It is not a medically validated tumor segmentation mask and does not independently establish the presence or location of a tumor.

---

## 📂 Project Structure

```text
Brain-Tumor-Detection/
│
├── Notebooks/
│   └── Tumor.ipynb
│
├── backend/
│   ├── __pycache__/
│   │
│   ├── static/
│   │   └── heatmap.png
│   │
│   ├── app.py
│   ├── brain_tumor.keras
│   ├── grad_cam.py
│   └── requirements.txt
│
└── frontend/
    ├── public/
    ├── src/
    ├── .gitignore
    └── README.md
```

### 📁 Directory and File Explanation

#### `Notebooks/`

Contains the Jupyter notebook used for model development and experimentation.

- **`Tumor.ipynb`** — Notebook for working with the brain tumor dataset, developing the deep learning model, and performing experiments.

#### `backend/`

Contains the Python backend and trained deep learning model.

- **`app.py`** — Backend application entry point. It is intended to handle application requests and connect the model with the user interface.
- **`brain_tumor.keras`** — Saved Keras model used for brain tumor classification and inference.
- **`grad_cam.py`** — Contains the Grad-CAM implementation used to generate prediction-related heatmap visualizations.
- **`requirements.txt`** — Lists the Python dependencies required by the backend.
- **`static/`** — Stores static assets used by the backend.
- **`static/heatmap.png`** — Heatmap image associated with Grad-CAM visualization.
- **`__pycache__/`** — Python-generated cache files. These are not required as source code and generally should not be committed to version control.

#### `frontend/`

Contains the frontend application files.

- **`public/`** — Stores public static assets used by the frontend.
- **`src/`** — Contains the frontend source code and interface components.
- **`.gitignore`** — Defines files and directories that Git should ignore.
- **`README.md`** — Documentation file currently present inside the frontend directory.

---

## ⚙️ Application Workflow

The overall application workflow can be represented as follows:

```text
        🖼️ Brain MRI Image
                |
                v
      ⚙️ Image Preprocessing
                |
                v
       🧠 MobileNetV2 Model
                |
                v
      🎯 Classification Output
                |
                v
        🏷️ Predicted Class
                |
                v
        🔬 Grad-CAM Module
                |
                v
        🌡️ Heatmap Output
```

The frontend provides the user-facing interface, while the backend is responsible for the model-related processing. The exact request format and interaction between the frontend and backend are determined by their source code.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Brain-Tumor-Detection
```

Replace `<YOUR_REPOSITORY_URL>` with the actual Git repository URL.

### 2. Create a Python Virtual Environment

```bash
python -m venv venv
```

Activate the environment.

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

**Windows Command Prompt:**

```cmd
venv\Scripts\activate
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Ensure that the installed TensorFlow/Keras versions are compatible with the saved model and the project's Python version.

### 4. Start the Backend

```bash
python app.py
```

This command starts the Python application if `app.py` is configured with a runnable application entry point. The server address and port depend on the backend implementation.

### 5. Start the Frontend

Open a separate terminal and navigate to the frontend directory.

```bash
cd frontend
npm install
npm run dev
```

These commands assume that the frontend uses a Node.js-based development setup with a valid `package.json` containing the required scripts.

---

## 📊 Dataset and Model Development

The model is developed using a brain MRI image classification dataset organized into four classes.

The typical dataset organization is:

```text
dataset/
├── Training/
│   ├── glioma_tumor/
│   ├── meningioma_tumor/
│   ├── no_tumor/
│   └── pituitary_tumor/
│
└── Testing/
    ├── glioma_tumor/
    ├── meningioma_tumor/
    ├── no_tumor/
    └── pituitary_tumor/
```

This illustrates the dataset organization used for the project; the dataset directories are not shown in the provided repository screenshot.

A typical model development process includes:

- 📥 Loading MRI images from their class directories.
- 🔄 Resizing and preprocessing images.
- ✂️ Separating training and validation data.
- 🧠 Applying MobileNetV2 transfer learning.
- 📈 Evaluating the model on held-out test images.
- 💾 Saving the trained model for application use.
- 🔬 Generating Grad-CAM visualizations for model predictions.

Model accuracy, class-wise precision and recall, and a confusion matrix can be used to evaluate classification performance. Actual performance values should be reported from the model's evaluation results rather than assumed.

---

## 🔮 Future Improvements

Potential improvements for the project include:

- 📈 Add detailed evaluation metrics such as precision, recall, F1-score, and a confusion matrix.
- 🔍 Improve class-wise classification performance.
- 🌡️ Enhance Grad-CAM overlays for easier visual interpretation.
- 🖼️ Improve input image validation and error handling.
- ⚡ Optimize inference speed and model loading.
- 🧪 Test the model on independent data to evaluate generalization.
- 📱 Improve the frontend experience across desktop and mobile devices.
- 📝 Display prediction confidence where supported by the model output.

---

## ⚠️ Limitations

- Model predictions depend on the quality, diversity, and distribution of the training dataset.
- Performance on images from a different dataset or clinical environment may vary.
- Grad-CAM visualizations are explanatory aids, not definitive medical evidence.
- A model prediction should not be used alone to make medical decisions.
- The reliability of the system must be established through appropriate evaluation and independent validation.

---

## 👨‍💻 Author

**Lalit Mohan**

B.Tech student specializing in Artificial Intelligence and Machine Learning.

GitHub: [Lalitmohan6376](https://github.com/Lalitmohan6376)

---

## 📄 License

Add a `LICENSE` file to the repository if you intend to distribute the project under a specific open-source license.

---

⭐ If you find this project useful, consider giving the repository a star!
