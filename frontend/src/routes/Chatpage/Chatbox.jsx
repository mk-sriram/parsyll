//module imports
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Chatbox.scss";
import Message from "./Message";
import { useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

//functions setup
const Chatbox = () => {
  //console.log("Chatbox Page called")
  //autoscorll ref div
  const msgEnd = useRef(null);
  const location = useLocation();
  const session = useSession();
  //state variables assignment
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //  {
  //       role: "user",
  //       content:
  //         "Sorry We were not able to parse your file, can you input schedule info seperately.. ",
  //     }, //location.state?.initialMessage ||content should be initial msg to gpt
  //auto scroll
  //console.log("Input transfered from preloader ");
  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages

    //compiling User message for Chat
    const userMessage = { role: "user", parts: message };
    setMessages([...messages, userMessage]);
    console.log(userMessage);
    console.log(messages);
    try {
      const response = await axios.post("http://localhost:3000/chat", {
        messages,
      });

      const botMessage = {
        role: "model",
        parts: response.data.botMessage,
      };

      //adding bot messages to array
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      console.log(messages);
    } catch (error) {
      console.error("Error: ", error);
      const errorMessage = {
        role: "model",
        parts: "Error: Could not get response from the server.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setMessage(""); //clear the input field ( nice trick! )
  };

  const sendToCalendar = async () => {
    console.log(session)
    try {
      const response = await axios.post("http://localhost:3000/calendar", {
        token: session.provider_token,
        calendarObj : messages
      });
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending to calendar:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="chatbot-container">
        <div className="chatbot-header"></div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} message={msg.parts} />
          ))}
          <div ref={msgEnd} />
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

          <button className="chatbot-send-button" onClick={sendMessage}>
            &#x27A4;
          </button>
        </div>
      </div>
      <div className="send-calendar-container">
        <button className="send-to-calendar-button" onClick={sendToCalendar}>
          Send to Calendar
        </button>
       
      </div>
    </div>
  );
};

export default Chatbox;
