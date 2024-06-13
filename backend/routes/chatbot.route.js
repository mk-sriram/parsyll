//Module imports
import { Router } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import axios from "axios";
import OpenAI from "openai";

//router configuration and middleware
dotenv.config();
const router = Router();

//OPEN init

const openai = new OpenAI();

router.post("/chat", async (request, response) => {
  const { messages } = request.body;
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo-16k",
    });
    console.log(completion.choices[0]);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error, try again!" });
  }
});

//export
export default router;
