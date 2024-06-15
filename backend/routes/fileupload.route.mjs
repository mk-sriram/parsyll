import { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

dotenv.config();

const router = Router();

// Middleware
router.use(cors());
//router.use(express.json()); // Ensure that express.json() middleware is used for parsing JSON request bodies

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize Multer with storage engine
const upload = multer({ storage });

// Ensure uploads directory exists
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Update the route to handle multiple files with the field name 'files'
router.post("/upload", upload.array("files"), (request, response) => {
  console.log("UPLOAD route called ");
  if (!request.files || request.files.length === 0) {
    return response.status(400).send("No files uploaded.");
  }

  const files = request.files.map((file) => ({
    fileName: file.originalname,
    filePath: file.path,
  }));

  response.status(200).json(files);
});

router.get("/upload", (request, response) => {
  response.send("ROUTER WORKS TO Upload");
});

// Export the router
export default router;
