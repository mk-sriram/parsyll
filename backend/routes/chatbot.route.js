//Module imports 
import { Router } from "express";
import { Configuration , OpenAIApi } from 'openai'
import dotenv from 'dotenv'

//router configuration and middleware 
dotenv.config(); 
const router = Router(); 

//openAI 
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}); 
const openai = new OpenAIApi(configuration); 

const chatComplete = async ()=>{
    const chatCompletetion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      messages : [
        {role: 'user', content: "what is the campital of usa"}
      ]
    });

    console.log(chatCompletetion); 
}

//routes 
router.post('/')


//export 
export default router; 