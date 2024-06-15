import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Preloader.scss";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { files } = location.state;
  console.log(files)
  // useEffect(() => {
    // const incrementProgress = () => {
    //   setProgress((prevProgress) => {
    //     if (prevProgress < 100) {
    //       return prevProgress + 1;
    //     } else {
    //       clearInterval(progressInterval);
    //       navigate("/chat", {
    //         replace: true, //prevents adding preloader to history , back button to upload instead of here 
    //         state: { initialMessage: "Files processed successfully." },
    //       });
    //       return prevProgress;
    //     }
    //   });
    // };

    // const progressInterval = setInterval(incrementProgress, 70); // Adjust the interval as needed

  //   return () => clearInterval(progressInterval); // Cleanup on unmount
  // }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
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
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            },
          }
        );

        // const chatResponse = await axios.post("http://localhost:3000/chat", {
        //   messages: [
        //     {
        //       role: "system",
        //       content:
        //         "Extract information from these files: " +
        //         response.data.map((file) => file.fileName).join(", "),
        //     },
        //   ],
        // });

        // navigate("/chat", {
        //   replace: true,
        //   state: { initialMessage: chatResponse.data.botMessage },
        // });

        //navigate to chat route, state carries the info from API 
        navigate("/chat", {
          replace: true,
          state: { initialMessage: "inital Schedule info from API for bot" },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [files, navigate]);

  return (
    <div className="preloader-container">
      <p>Processing your file!</p>
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Preloader;
