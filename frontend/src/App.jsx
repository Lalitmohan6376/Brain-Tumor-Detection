import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://192.168.1.11:5000";

function formatClassName(name) {
  return String(name || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [heatmapVersion, setHeatmapVersion] = useState(0);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    setError("");
    setResult(null);

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handlePredict() {
    if (!image) {
      setError("Please upload a brain MRI image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Prediction failed. Please try again.");
      }

      if (!data || !data.prediction) {
        throw new Error("The server returned an invalid prediction result.");
      }

      setResult(data);
      setHeatmapVersion(Date.now());
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to Flask. Check that the backend is running."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    if (preview) URL.revokeObjectURL(preview);

    setImage(null);
    setPreview("");
    setResult(null);
    setError("");
    setLoading(false);

    const input = document.getElementById("mri-upload");
    if (input) input.value = "";
  }

  const heatmapUrl =
    result?.heatmap && result.heatmap.startsWith("http")
      ? `${result.heatmap}${result.heatmap.includes("?") ? "&" : "?"}t=${heatmapVersion}`
      : result?.heatmap
        ? `${API_URL}${result.heatmap.startsWith("/") ? "" : "/"}${result.heatmap}?t=${heatmapVersion}`
        : "";

  return (
    <main className="app-shell" id="home">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="ambient ambient-three"></div>

      <header className="topbar glass-surface">
        <a className="brand" href="#home" aria-label="NeuroScan home">
          <span className="brand-icon">✳</span>
          <span>NeuroScan</span>
        </a>

        <div className="topbar-right">
          <span className="status-badge">
            <span className="status-dot"></span>
            AI Image Analysis
          </span>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">
          <span className="eyebrow-line"></span>
          BRAIN MRI CLASSIFICATION
          <span className="eyebrow-line"></span>
        </div>

        <h1>
          Brain Tumor
          <span> Detection</span>
        </h1>

        <p className="hero-description">
          Upload a brain MRI image to analyze it with a trained deep learning
          model and explore its visual attention map.
        </p>

        <div className="hero-divider">
          <span></span>
          <i></i>
          <span></span>
        </div>
      </section>

      <section className="workspace">
        <div className="panel upload-panel glass-surface">
          <div className="panel-heading">
            <div className="heading-group">
              <span className="section-number">01</span>
              <div>
                <h2>Upload MRI</h2>
                <p className="panel-subtitle">Select a scan to begin</p>
              </div>
            </div>
            <span className="file-type">JPG · PNG · WEBP</span>
          </div>

          <label
            className={`upload-area ${preview ? "has-image" : ""} ${loading ? "is-disabled" : ""}`}
            htmlFor="mri-upload"
          >
            {preview ? (
              <>
                <img
                  className="image-preview"
                  src={preview}
                  alt="Uploaded brain MRI preview"
                />
                {loading && (
                  <div className="preview-scan-overlay">
                    <div className="preview-scan-line"></div>
                    <span>SCANNING IMAGE</span>
                  </div>
                )}
                {!loading && <span className="image-ready-tag">Image ready</span>}
              </>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon-wrap">
                  <div className="upload-icon">↑</div>
                  <span className="upload-icon-orbit"></span>
                </div>
                <h3>Upload your MRI image</h3>
                <p>Choose a file from your device</p>
                <span className="browse-button">Choose Image <span>↗</span></span>
                <span className="upload-limit">Maximum file size: 10 MB</span>
              </div>
            )}
          </label>

          <input
            id="mri-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={loading}
            hidden
          />

          {image && (
            <div className="file-info">
              <div className="file-icon">MRI</div>
              <div className="file-details">
                <span className="file-name" title={image.name}>{image.name}</span>
                <span className="file-size">
                  {(image.size / (1024 * 1024)).toFixed(2)} MB · Ready for analysis
                </span>
              </div>
              <button
                className="remove-button"
                type="button"
                onClick={handleReset}
                aria-label="Remove uploaded image"
                disabled={loading}
              >
                ×
              </button>
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              <span className="error-symbol">!</span>
              <span>{error}</span>
            </div>
          )}

          <button
            className={`analyze-button ${loading ? "is-loading" : ""}`}
            type="button"
            onClick={handlePredict}
            disabled={!image || loading}
          >
            {loading ? (
              <>
                <span className="button-scan-icon" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span className="button-copy">
                  <strong>Analyzing MRI</strong>
                  <small>Reading image features</small>
                </span>
                <span className="button-live-line"></span>
              </>
            ) : (
              <>
                <span>Analyze MRI</span>
                <span className="button-arrow">↗</span>
              </>
            )}
          </button>

          <div className="privacy-note">
            <span className="privacy-icon">◇</span>
            Your image is sent to the configured backend for analysis.
          </div>
        </div>

        <div className={`panel results-panel glass-surface ${loading ? "results-loading" : ""}`}>
          <div className="panel-heading">
            <div className="heading-group">
              <span className="section-number">02</span>
              <div>
                <h2>Analysis Results</h2>
                <p className="panel-subtitle">Your model output</p>
              </div>
            </div>
            <span className={`result-badge ${result ? "complete" : loading ? "processing" : ""}`}>
              <span className="result-badge-dot"></span>
              {result ? "Completed" : loading ? "Processing" : "Awaiting scan"}
            </span>
          </div>

          {!result ? (
            <div className={`empty-results ${loading ? "empty-results-loading" : ""}`}>
              <div className="result-illustration">
                <div className="scan-circle">
                  <div className="scan-brain">✳</div>
                  <div className="scan-ring scan-ring-one"></div>
                  <div className="scan-ring scan-ring-two"></div>
                  <div className="scan-cross scan-cross-one">+</div>
                  <div className="scan-cross scan-cross-two">+</div>
                  <div className="scan-sweep"></div>
                </div>
              </div>
              <h3>{loading ? "Analyzing your scan" : "Ready when you are"}</h3>
              <p>
                {loading
                  ? "The model is examining image patterns and preparing your results."
                  : "Upload a brain MRI image and select Analyze MRI to view the prediction and its heatmap."}
              </p>
              {loading ? (
                <div className="analysis-progress">
                  <span className="progress-track"><span></span></span>
                  <span className="progress-caption">AI ANALYSIS IN PROGRESS</span>
                </div>
              ) : (
                <div className="ready-indicator">
                  <span></span>
                  Waiting for image
                </div>
              )}
            </div>
          ) : (
            <div className="result-content">
              <div className="prediction-card">
                <div className="prediction-card-top">
                  <span className="result-label">PREDICTED RESULT</span>
                  <span className="prediction-check">✓</span>
                </div>
                <h3 className="prediction-name">{formatClassName(result.prediction)}</h3>

                {typeof result.confidence === "number" && (
                  <div className="confidence-section">
                    <div className="confidence-heading">
                      <span>Model confidence</span>
                      <strong>{(result.confidence * 100).toFixed(2)}%</strong>
                    </div>
                    <div className="confidence-track">
                      <div
                        className="confidence-fill"
                        style={{
                          width: `${Math.max(0, Math.min(100, result.confidence * 100))}%`
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="visualization-section">
                <div className="visualization-heading">
                  <div>
                    <span className="visualization-kicker">VISUAL EXPLANATION</span>
                    <h4>Grad-CAM Heatmap</h4>
                    <p>Areas that influenced the model's prediction</p>
                  </div>
                  <span className="heatmap-indicator"><span></span> Attention map</span>
                </div>

                <div className="visualization-card">
                  {heatmapUrl ? (
                    <img
                      className="heatmap-image"
                      src={heatmapUrl}
                      alt="Grad-CAM heatmap overlaid on the uploaded MRI"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        const fallback = event.currentTarget.parentElement?.querySelector(".visualization-placeholder");
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="visualization-placeholder"
                    style={{ display: heatmapUrl ? "none" : "flex" }}
                  >
                    <span className="placeholder-symbol">⌁</span>
                    <strong>Heatmap unavailable</strong>
                    <span>Check that Flask saved the image to its static folder.</span>
                  </div>
                </div>
                <div className="heatmap-caption">
                  <span><i className="caption-dot"></i> MRI attention overlay</span>
                  <span>Grad-CAM · 224 × 224 input</span>
                </div>
              </div>

              <p className="medical-note">
                <span className="medical-note-icon">i</span>
                Educational use only—not a medical diagnosis. The heatmap shows
                model attention and does not identify exact tumor boundaries.
              </p>

              <button className="reset-button" type="button" onClick={handleReset}>
                <span>↻</span> Analyze Another Image
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <span><strong>NeuroScan</strong> · Brain MRI Classification</span>
        <span><span className="footer-status"></span> Educational AI Project</span>
      </footer>
    </main>
  );
}

export default App;