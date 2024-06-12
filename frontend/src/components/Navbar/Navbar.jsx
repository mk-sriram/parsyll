import React from "react";
import "./Navbar.scss"
import logo from "../../assets/logo.png"
const Navbar = () => {
  return (
    <nav className="nav-background">
      <div className="left">
        <a className="logo" href="/">
          <img src={logo} alt="" />
          <span>PARSYLL</span>
        </a>
      </div>
      <div className="right">
        <a href="https://github.com/mk-sriram/parsyll">Github</a>
        <a className="signin" href="/">
          Sign in
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
