//module imports
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Chatbox.scss";
import Message from "./Message";
import { useLocation } from "react-router-dom";

//functions setup 
const Chatbox = () => {
  //console.log("Chatbox Page called")
  //autoscorll ref div 
  const msgEnd = useRef(null); 
  const location = useLocation(); 
  //state variables assignment 
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "Assistant", content: location.state?.initialMessage || "Sorry We were not able to parse your file, can you input schedule info seperately.. " }, //content should be initial msg to gpt 
  ]);


  //auto scroll 
  //console.log("Input transfered from preloader ");
  useEffect(()=>{
    msgEnd.current.scrollIntoView({behavior: 'smooth'});
  }, [messages]); 

  const sendMessage = async (event) => {

    event.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages

    //compiling User message for Chat 
    const userMessage = { role: "user", content: message };
    setMessages([...messages, userMessage]); 

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        message,
      });

      const botMessage = {
        role: "Assistant",
        content: response.data.botMessage,
      };

      //adding bot messages to array
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      console.log(messages);
    } catch (error) {
      console.error("Error: ", error);
      const errorMessage = {
        role: "Assistant",
        content: "Error: Could not get response from the server.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setMessage(""); //clear the input field ( nice trick! )
  };

  return (
    <div className="main-container">
      <div className="chatbot-container">
        <div className="chatbot-header"></div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} message={msg.content} />
          ))}
          <div ref={msgEnd}/>
        </div>
        <div className="chatbot-input-bi">
          <div className="chatbot-input-container">
            <form onSubmit={sendMessage}>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Make your edits here . . ."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            </form>
          </div>
          
          <button
            className="chatbot-send-button"
            onClick={sendMessage}
          >
            &#x27A4;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
