
import { Router, response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"

import fs from "fs"; 
dotenv.config();

const router = Router();

// Middleware
router.use(cors());


// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize Multer with storage engine
const upload = multer({ storage });

// Ensure uploads directory exists
const dir = './uploads';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}


router.post("/upload", upload.single("file"), (request, response) => {
  if (!request.file) {
    return response.status(400).send("No file uploaded.");
  }

  const file = request.file;
  response.status(200).json({
    fileName: file.originalname,
    filePath: file.path,
  });
});

router.get("/upload", (request, response) => {
  response.send("ROUTER WORKS TO Upload");
});

//export
export default router;
