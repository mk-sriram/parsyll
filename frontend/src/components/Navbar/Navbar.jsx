import React from "react";
import "./Navbar.scss";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";

const Navbar = ({ signedIn }) => {
  const navigate = useNavigate();

  const signInPage = (event) => {
    event.preventDefault();
    console.log("Signin page fnuciton ");
    navigate("/login");
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

        {!signedIn ? (
          <a className="signin" onClick={signInPage} href="/">
            Sign in
          </a>
        ) : (
          <div className="outer-circle">
            <div className="inner-circle">
              <img className="pfp" src={assets.profilepic} alt="Profile" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
