import React from "react";
import assets from "../../assets";
import "./Homepage.scss";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
const Homepage = () => {
  const session = useSession();  //change the value to session present logged in or not
  const navigate = useNavigate(); 

  const navigateUpload =(e)=>{
    navigate('/upload')
  }
  const navigateLogin = (e) =>{
    navigate('/login')
  }
  return (
    <div className="homepage">
      <div className="text-container">
        <h3>WELCOME TO PARSYLL</h3>
        <h1>
          Syllabus To Calendar <br />
          Made Easy
        </h1>
        {session ? (
          <button className="uploadfiles-btn" onClick={navigateUpload}>
            Upload Files
          </button>
        ) : (
          <button className="uploadfiles-btn" onClick={navigateLogin}>
            Get Started
          </button>
        )}
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Homepage;
