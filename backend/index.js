//Module imports 
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3000;

//middleware 
app.use(express.json()); 
app.use(cors())

app.get("/", (request, response) => { 
    response.send("HELLOW WORLD");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
