import React from "react";
import assets from "../../assets";
import "./Homepage.scss";
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="text-container">
        <h3>WELCOME TO PARSYLL</h3>
        <h1>
          Syllabus To Calendar <br />
          Made Easy
        </h1>
        <button className="google-btn">
          <img src={assets.googleLogo} alt="Google logo" />
          Sign in with Google
        </button>
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Homepage;
