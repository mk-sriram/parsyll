import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "./Preloader.scss";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { files } = location.state;
  console.log(files);

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      console.log("form data function evoked"); 
      
      const extractedTexts = await Promise.all(
        files.map(async (file) => {
          if (file.type === "application/pdf") {
            const text = await extractTextFromPDF(file);
            return { name: file.name, text };
          } else {
            return { name: file.name, text: "Non-PDF file" };
          }
        })
      );

      extractedTexts.forEach((extractedText, index) => {
        formData.append(`file${index}_name`, extractedText.name);
        formData.append(`file${index}_text`, extractedText.text);
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

        const chatResponse = await axios.post("http://localhost:3000/chat", {
          messages: [
            {
              role: "system",
              content:
                "Extract information from these files: " +
                response.data.map((file) => file.fileName).join(", "),
            },
          ],
        });

        navigate("/chat", {
          replace: true,
          state: { initialMessage: chatResponse.data.botMessage },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const extractTextFromPDF = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extractedText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + " ";
      }

      return extractedText;
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
