import React from 'react'
import "./layout.scss"
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';


const layout = () => {
  
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar signedIn={false} />
      </div>
      <div className="content">
        <Outlet  />
      </div>
    </div>
  );
}

export default layout
