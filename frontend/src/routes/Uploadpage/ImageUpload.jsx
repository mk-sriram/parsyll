import React, { useState, useRef } from "react";
import "./ImageUpload.scss";
import assets from "../../assets";
import axios from "axios"; // Ensure axios is imported

const ImageUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [processingError, setProcessingError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const fileInputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isLoading) {
      setDragOver(true); //prevents file drop during upload
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
      const validFiles = [];
      const invalidFiles = [];

      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
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
      }
    }
  };

  const uploadFile = (file) => {
    console.log("upload file function running ");
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

  const fileUpload = async () => {
    console.log("file upload function runnning");
    if (files.length === 0) {
      setUploadFileError(true);
      return;
    }
    setServerError(false);
    setUploadFileError(false);
    setFileStatus(false);

    console.log("no error with file upload");

    setProcessingError(false);

    const formData = new FormData();
    files.forEach((file) => {
      //for each
      formData.append("files", file);
    });

    console.log("form data works");
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

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error: ", error);
      setServerError(true);
    }
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
        setFiles(selectedFile);
        uploadFile(selectedFile);
      } else {
        setProcessingError(true);
      }
    }
  };

  const removeFile = (event) => {
    event.stopPropagation(); // prevents the parent div functionality
    setFiles(null);
    setProgress(0);
    setIsLoading(false);
    setProcessingError(false);

    //remove from the database as well ??
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
            <div style={{ width: `${progress}%` }}></div>
          </div>
        )}
        {processingError && <p className="error">Error uploading file</p>}
      </div>
      <button onClick={fileUpload} className="upload-btn">
        Analyze
      </button>
      <div className="error-msg">
        {uploadFileError && <p className="error">No file Detected!!!</p>}
        {serverError && (
          <p className="error">Error uploading file to server!!!</p>
        )}
        {fileStatus && <p className="success">File Uploaded Successfully!!!</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
