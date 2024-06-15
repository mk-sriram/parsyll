import React, {useEffect} from "react";
import "./Message.scss";
import assets from "../../assets";
const Message = ({role, message}) => {
  //typing animation 
  // const [displayedText, setDisplayedText] = useState("");
  // const [isTyping, setIsTyping] = useState(true);
  return (
    <div
      className={
        role === "Assistant"
          ? "message-container-bot"
          : "message-container-user"
      }
    >
      {/* <img className="message-user" src={assets.profilepic} alt="" /> */}
      <div
        className={
          role === "Assistant" ? "message-text-bot" : "message-text-user"
        }
      >
        <p> {message}</p>
      </div>
    </div>
  );
};

export default Message;
