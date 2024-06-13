import React, { useState } from "react";
import "./Chatbox.scss";
import Message from "./Message.jsx";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "Assistant", message: "I'M a BOT" },
    //messages would be the inital output from CHATGPT
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const userMessage = { role: "user", content: message };

    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        message,
      });

      const botMessage = {
        role: "assistant",
        content: response.data.botMessage,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error: ", error);
      const errorMessage = {
        role: "assistant",
        content: "Error: Could not get response from the server.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="main-container">
      <div className="chatbot-container">
        <div className="chatbot-header"></div>
        <div className="chatbot-messages">
          {/* Message go here  */}
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} message={msg.message} />
          ))}
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

export default Chatbox;
