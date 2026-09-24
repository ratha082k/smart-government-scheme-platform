import express from "express";
import multer from "multer";
import { uploadDocument } from "../controllers/documentController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

export default router;