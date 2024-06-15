//Module imports
import { Router, response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import OpenAI from "openai";

//router configuration and middleware
dotenv.config();
const router = Router();

//OPEN init

//const openai = new OpenAI();

router.post("/chat", async (request, response) => {
  const { messages } = request.body;
  console.log(messages);
  response.json({
    botMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  });
  // try {
  //   // Call OpenAI's chat completion API
  //   const completion = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo-16k",
  //     messages: messages,
  //     max_tokens: 150, // Set a limit to control cost and response length
  //   });

  //   // Extract the assistant's message from the response
  //   const botMessage = completion.choices[0].message.content;

  //   res.json({ botMessage });
  // } catch (error) {
  //   console.error("Error:", error);
  //   res.status(500).json({ error: "Error, try again!" });
  // }
});

router.get("/chat", (request, response) => {
  response.send("ROUTER WORKS TO CHAT");
});

//export
export default router;
