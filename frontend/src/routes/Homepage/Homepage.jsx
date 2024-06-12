import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import googleLogo from "../../assets/google-logo.png"
import "./Homepage.scss";
const Homepage = () => {
  return (
    <>
      <Navbar />

      <div className="maincontainer">
        <h3>WELCOME TO PARSYLL</h3>
        <h1>
          Syllabus To Calendar <br />
          Made Easy
        </h1>
        <button className="google-btn" >
          <img src={googleLogo} alt="Google logo" />
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default Homepage;
