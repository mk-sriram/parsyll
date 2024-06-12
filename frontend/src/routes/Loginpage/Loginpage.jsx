import React from "react";
import "./Loginpage.scss";
import assets from "../../assets"
const Loginpage = () => {
  return (
    <div className="loginpage">
      <div className="login-container">
        <button>
          <img
            className="google-btn"
            src={assets.googleLogo}
            alt="Google logo"
          />
          Continue with Google
        </button>
        <button>
          <img
            className="notion-btn"
            src={assets.notionLogo}
            alt="Notion Logo"
          />
          Continue with Notion
        </button>
        <button>
          <img className="apple-btn" src={assets.appleLogo} alt="Apple Logo" />
          Continue with Apple
        </button>
      </div>
    </div>
  );
};

export default Loginpage;
