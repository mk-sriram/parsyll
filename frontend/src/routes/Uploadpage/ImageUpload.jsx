import React, { useState, useRef } from "react";
import axios from "axios"; // Ensure axios is imported
import "./ImageUpload.scss";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";

const ImageUpload = ({ name, size, getUrl, error }) => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [processingError, setProcessingError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const redirectChatpage = () => {
    navigate("/chat");
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isLoading) {
      setDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!isLoading) {
      setDragOver(false);
      setProcessingError(false);

      const droppedFiles = event.dataTransfer.files;
      processFiles(droppedFiles);
    }
  };

  const handleFileSelect = (event) => {
    if (!isLoading) {
      const selectedFiles = event.target.files;
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles) => {
    const validFiles = [];
    const invalidFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (
        file.type === "application/pdf" ||
        file.type === "image/jpeg" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "image/png"
      ) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    }

    if (invalidFiles.length > 0) {
      setProcessingError(true);
    }

    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setUploadFileError(false);
      //validFiles.forEach((file) => uploadFile(file));
    }
  };

  const fileUpload = async () => {
    if (files.length === 0) {
      setUploadFileError(true);
      return;
    }

    setIsLoading(true);
    setProcessingError(false);
    setUploadFileError(false);
    setServerError(false);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Files uploaded successfully:", response.data);

      setIsLoading(false);
      setProgress({});

      //redirectNavigatio
      redirectChatpage();
    } catch (error) {
      console.error("Error:", error);
      setServerError(true);
      setIsLoading(false);
    }
  };

  const removeFile = (event, fileToRemove) => {
    event.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    setProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      delete newProgress[fileToRemove.name];
      return newProgress;
    });
    setIsLoading(false);
    setProcessingError(false);
    setUploadFileError(false);
    setServerError(false);
  };

  return (
    <div className="drag-drop-with-btn">
      <div
        className={`drag-and-drop-area ${dragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          disabled={isLoading}
          multiple
        />
        <div>
          <img
            className="upload-icon"
            src={assets.fileupload}
            alt="upload-icon"
          />
        </div>
        <p>Drag and drop files here, or click to select files</p>
        {files.length > 0 && (
          <div className="upload-details">
            {files.map((file, index) => (
              <div key={index} className="file-details">
                <div
                  className="cancel-icon"
                  onClick={(event) => removeFile(event, file)}
                >
                  <img
                    className="cancel-icon-img"
                    src={assets.cancelicon}
                    alt="cancel-icon-img"
                  />
                </div>
                <p>{file.name}</p>
                <p>{(file.size / 1000).toFixed(0)} KB</p>
              </div>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="progress-bar">
            <div style={{ width: `${progress.total || 0}%` }}></div>
          </div>
        )}
        {processingError && <p className="error">Invalid file type selected</p>}
      </div>
      <button onClick={fileUpload} className="upload-btn" disabled={isLoading}>
        Analyze
      </button>
      <div className="error-msg">
        {uploadFileError && <p className="error">No file detected</p>}
        {serverError && <p className="error">Error uploading file to server</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
