<<<<<<< Updated upstream
import React, { useState, useRef } from "react";
=======
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
>>>>>>> Stashed changes
import "./ImageUpload.scss";
import assets from "../../assets";
import axios from "axios"; // Ensure axios is imported

<<<<<<< Updated upstream
const ImageUpload = () => {
=======
const ImageUpload = ({ name, size, getUrl, error }) => {
  //States ( probabyl don't need some ofe these ( fix loading screen for the files ))
>>>>>>> Stashed changes
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [processingError, setProcessingError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [fileStatus, setFileStatus] = useState(false);


  const fileInputRef = useRef(null);
<<<<<<< Updated upstream

=======

  const navigate = useNavigate();

  useEffect(() => {
    // Clear the chat state when the component mounts
    localStorage.removeItem("chatState");
  }, []);

>>>>>>> Stashed changes
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

    const files = event.dataTransfer.files;
    if (files && files.length) {
      const uploadedFile = files[0];
      if (
        uploadedFile.type === "application/pdf" ||
        uploadedFile.type === "image/jpeg" ||
        uploadedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        uploadedFile.type === "image/png"
      ) {
        setFile(uploadedFile);
        uploadFile(uploadedFile);
      } else {
        setProcessingError(true);
      }
    }
  };

<<<<<<< Updated upstream
  

  const fileUpload = async () => {
    setServerError(false);
    setUploadFileError(false);
    setFileStatus(false);
    console.log();
    //console.log("file upload function runnning")
    if (!file) {
      uploadFileError(true);
      return;
    }
    //console.log("no error with file upload");

    setProcessingError(false);

    const formData = new FormData();
    formData.append("file", file);

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
=======
  // const redirectChatpage = () => {
  //   navigate("/chat");
  // };

   const handleSubmit = () => {
     if (files.length === 0) {
       setUploadFileError(true);
       return;
     }
     navigate("/preloader", { replace: true, state: { files } });
   };
  // const fileUpload = async () => {
  //   if (files.length === 0) {
  //     setUploadFileError(true);
  //     return;
  //   }

  //   setIsLoading(true);
  //   setProcessingError(false);
  //   setUploadFileError(false);
  //   setServerError(false);

  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append("files", file);
  //   });

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("Files uploaded successfully:", response.data);

  //     setIsLoading(false);
  //     setProgress({});

  //     //redirectNavigatio
  //     redirectChatpage();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setServerError(true);
  //     setIsLoading(false);
  //   }
  // };
>>>>>>> Stashed changes

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

    //remove from the database as well ??
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
<<<<<<< Updated upstream
      <button onClick={fileUpload} className="upload-btn">
=======
      <button
        onClick={handleSubmit}
        className="upload-btn"
        disabled={isLoading}
      >
>>>>>>> Stashed changes
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
