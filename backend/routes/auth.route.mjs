//Module imports
import { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";


//router configuration and middleware
dotenv.config();
const router = Router(); 


const supabase = createClient("your-supabase-url", "your-supabase-anon-key");

router.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return res.status(400).send(error.message);

    res.cookie("access_token", data.session.access_token, { httpOnly: true });
    res.cookie("refresh_token", data.session.refresh_token, { httpOnly: true });

    res.redirect("/");
  } else {
    res.status(400).send("Code not found");
  }
});

export default router;