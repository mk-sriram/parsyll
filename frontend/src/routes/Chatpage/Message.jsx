import React from "react";
import "./Message.scss";
import assets from "../../assets";
const Message = ({bot, text}) => {
  
  return (
    <div className={bot ? "message-container-bot" : "message-container-user"} >
      {/* <img className="message-user" src={assets.profilepic} alt="" /> */}
      <div className={bot ? "message-text-bot" : "message-text-user"}>
        <p> {text}</p>
      </div>
    </div>
  );
};

export default Message;
