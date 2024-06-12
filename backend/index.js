// import express from "express"
// import dotenv from "dotenv"
// import cors from "cors"
// dotenv.config(); 

// const app = express(); 
// const PORT = process.env.PORT || 3000;
// app.use(express.json()); 
// app.use(cors())

// app.get("/", (request, response) => { 
//     response.send("HELLOW WORLD");
// });

// app.listen(PORT, ()=>{
//     console.log(`Server is running on ${PORT}`)
// })

import OpenAI from "openai";
import dotenv from "dotenv";
import axios from "axios";
import axiosRateLimit from "axios-rate-limit";
//router configuration and middleware
dotenv.config();
//

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function chatComplete(){
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Ansewer in just one word." }, {role:"user", content: " What is the capital USA"}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion);
};

chatComplete(); 
