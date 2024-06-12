import React from "react";
import "./Uploadpage.scss";
import ImageUpload from "./ImageUpload";
const Uploadpage = () => {
  return (
    <div className="uploadpage">
      <ImageUpload />
       <button className="upload-btn">Analyze</button>
    </div>
  );
};

export default Uploadpage;
