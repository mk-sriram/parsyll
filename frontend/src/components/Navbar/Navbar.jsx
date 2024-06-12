import React from "react";
import "./Navbar.scss";
import assets from "../../assets";
const Navbar = ({ signedIn }) => {
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

        {signedIn ? (
          <a className="signin" href="/">
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
