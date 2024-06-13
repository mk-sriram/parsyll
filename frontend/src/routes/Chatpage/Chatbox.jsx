import React,{useState} from 'react'
import "./Chatbox.scss"
import Message from './Message.jsx';


const Chatbox = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    // console.log(message);
    // try {
    //   const response = await fetch("http://localhost:3000/chatpage", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ message }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok ");
    //   }
    //   const data = await response.json();
    //   console.log("Success:", data);
    // } catch (error) {
    //   console.error("Error: ", error);
    // }
  };

  return (
    <div className="main-container">
      <div className="chatbot-container">
        <div className="chatbot-header"></div>
        <div className="chatbot-messages">
          {/* MESSAGES GO INSIDE HERE, script to add messags ( map and then make divs ) */}
          <Message bot={true} text={"I'M a BOT"}/>
          <Message bot={false} text={ "I'M the USER"}/>
        </div>
        <div className="chatbot-input-bi">
          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Make your edits here . . ."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="chatbot-send-button" onClick={sendMessage}>
            &#x27A4;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox
