import React from "react";
import "./Loginpage.scss";
import assets from "../../assets"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const navigate = useNavigate(); 
  const supabase = useSupabaseClient(); //talks to supabase client wemade before
  const googleSignIn = async () =>{
    try{
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar",
          
        },
      });


    }catch(error){
      alert("error Logging in to Google provider"); 
      console.log(error);
    }
     
  }


  return (
    <div className="loginpage">
      <div className="login-container">
        <button onClick={googleSignIn}>
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
