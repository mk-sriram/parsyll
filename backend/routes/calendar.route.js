//Module imports
import { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

//router configuration and middleware
dotenv.config();
const router = Router();

router.post("/calendar", async (request, response) =>{
    const { token, calendarObj } = request.body; 

    if (!token ) {
      return res.status(400).send("Token is missing.");
    }

    if (!calendarObj) {
      return res.status(400).send("calendarObj is missing.");
    }

    

})
export default router;
