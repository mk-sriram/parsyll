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
  //   console.log("Router works");
  //   // const completion = await openai.chat.completions.create({
  //   //   messages: messages,
  //   //   model: "gpt-3.5-turbo-16k",
  //   // });
  //   // console.log(completion.choices[0]);
  //   response
  // } catch (error) {
  //   console.error(error);
  //   response.status(500).json({ error: "Error, try again!" });
  // }
});

router.get("/chat", (request, response) => {
  response.send("ROUTER WORKS TO CHAT");
});

//export
export default router;