import { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

dotenv.config();

const router = Router();

// Middleware
router.use(cors());

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

router.post("/upload", upload.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  const files = req.files.map((file) => ({
    fileName: file.originalname,
    filePath: file.path,
  }));

  res.status(200).json(files);
});

router.get("/upload", (req, res) => {
  res.send("ROUTER WORKS TO Upload");
});

// Export
export default router;
