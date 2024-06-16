import { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// router configuration and middleware
dotenv.config();
const router = Router();
router.use(cors());

// Gemini Init
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/chat", async (request, response) => {
  const { messages } = request.body;
  console.log("SERVER SIDE", messages);
  try {
    // If there are no previous messages, initialize history with an empty array
    let history =
      messages.length > 0
        ? messages.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.parts }], // Ensure parts is an array of objects with a text property
          }))
        : [];

    // If no previous messages, initialize with a starting message
    if (history.length === 0) {
      const initialMessage = {
        role: "user",
        parts: [{ text: "Hello, let's start our conversation!" }],
      };
      history.push(initialMessage);
    }

    console.log("HISTORY", history);

    // Start chat with history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 150,
      },
    });

    // Send user message
    const userMessage =
      messages.length > 0
        ? messages[messages.length - 1].parts
        : "Hello, let's start our conversation!";
    console.log(userMessage);
    const result = await chat.sendMessage(userMessage);
    const botMessage = result.response.text();

    response.json({ botMessage });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Error, try again!" });
  }
});

router.get("/chat", (request, response) => {
  response.send("ROUTER WORKS TO CHAT");
});

// export
export default router;
