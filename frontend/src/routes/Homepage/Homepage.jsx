import React from "react";
import assets from "../../assets";
import "./Homepage.scss";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const signedIn = false;  //change the value to session present logged in or not
  const navigate = useNavigate(); 

  const navigateUpload =(e)=>{
    navigate('/upload')
  }
  return (
    <div className="homepage">
      <div className="text-container">
        <h3>WELCOME TO PARSYLL</h3>
        <h1>
          Syllabus To Calendar <br />
          Made Easy
        </h1>
        {!signedIn ? (
          <button className="google-btn">
            <img src={assets.googleLogo} alt="Google logo" />
            Sign in with Google
          </button>
        ) : (
          <button className="uploadfiles-btn" onClick={navigateUpload}>
            Upload Files
          </button>
        )}
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Homepage;
