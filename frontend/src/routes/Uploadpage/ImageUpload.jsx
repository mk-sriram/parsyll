import React, { useState, useRef } from "react";
import "./ImageUpload.scss";
import assets from "../../assets";

const ImageUpload = ({ name, size, getUrl, error }) => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processingError, setProcessingError] = useState(false);

  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const files = event.dataTransfer.files;
    if (files && files.length) {
      const uploadedFile = files[0];
      if (uploadedFile.type === "application/pdf") {
        setFile(uploadedFile);
        uploadFile(uploadedFile);
      } else {
        setProcessingError(true);
      }
    }
  };

  const uploadFile = (file) => {
    setIsLoading(true);
    setProcessingError(false);

    // Simulate file upload and progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const selectedFile = files[0];
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        selectedFile.type === "image/png"
      ) {
        setFile(selectedFile);
        uploadFile(selectedFile);
      } else {
        setProcessingError(true);
      }
    }
  };

  const removeFile = (event) => {
    event.stopPropagation(); // prevents the parent div functionality
    setFile(null);
    setProgress(0);
    setIsLoading(false);
    setProcessingError(false);
  };

  return (
    <div
      className={`drag-and-drop-area ${dragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <div>
        <img
          className="upload-icon"
          src={assets.fileupload}
          alt="upload-icon"
        />
      </div>
      <p>Drag and drop a file here, or click to select a file</p>
      {file && (
        <div className="upload-details">
          <div className="cancel-icon" onClick={removeFile}>
            <img
              className="cancel-icon-img"
              src={assets.cancelicon}
              alt="cancel-icon-img"
            />
          </div>
          <p>{file.name}</p>
          <p>{(file.size / 1000).toFixed(0)} KB</p>
        </div>
      )}
      {isLoading && (
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {processingError && <p className="error">Error uploading file</p>}
    </div>
  );
};

export default ImageUpload;
