import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ImageUpload.scss";
import assets from "../../assets";

const ImageUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [processingError, setProcessingError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
    setProcessingError(false);

    const droppedFiles = event.dataTransfer.files;
    processFiles(droppedFiles);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    processFiles(selectedFiles);
  };

  const processFiles = (selectedFiles) => {
    console.log(selectedFiles)
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
      console.log(validFiles);
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      
      setUploadFileError(false);
    }
    
  };

  const handleSubmit = () => {
    
    if (files.length === 0) {
      setUploadFileError(true);
      return;
    }
    console.log(files) 
    navigate("/preloader", { state: { files } });
  };

  const removeFile = (event, fileToRemove) => {
    event.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    setProcessingError(false);
    setUploadFileError(false);
  };

  return (
    <div className="drag-drop-with-btn">
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
        {processingError && <p className="error">Invalid file type selected</p>}
      </div>
      <button onClick={handleSubmit} className="upload-btn">
        Analyze
      </button>
      <div className="error-msg">
        {uploadFileError && <p className="error">No file detected</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
