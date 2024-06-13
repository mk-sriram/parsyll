import React from 'react'
import "./Chatpage.scss"
import Chatbox from './Chatbox'
const Chatpage = () => {
  return (
    <div className="chatpage">
      <Chatbox />
      <div className="send-calendar-container">
        <button className="send-to-calendar-button">Send to Calendar</button>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Chatpage
