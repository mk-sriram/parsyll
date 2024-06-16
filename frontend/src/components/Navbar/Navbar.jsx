import React from "react";
import "./Navbar.scss";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Navbar = ({ signedIn }) => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const session = useSession();
  const signInPage = (event) => {
    event.preventDefault();
    console.log("Signin page fnuciton ");
    navigate("/login");
  };

  const signOut = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="nav-background">
      <div className="left">
        <a className="logo" href="/">
          <img src={assets.parsyllLogo} alt="" />
          <span>PARSYLL</span>
        </a>
      </div>
      <div className="right">
        <a href="https://github.com/mk-sriram/parsyll">Github</a>

        {!session ? (
          <a className="signin" onClick={signInPage} href="/">
            Sign in
          </a>
        ) : (
          // <div className="outer-circle">
          //   <div className="inner-circle">
          //     <img className="pfp" src={assets.profilepic} alt="Profile" />
          //   </div>
          // </div>
          <a className="signin" onClick={signOut} href="/">
            Sign Out
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
