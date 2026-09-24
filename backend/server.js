import "./config/env.js";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/recommend", recommendationRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use(
  "/api/document",
  documentRoutes
);

app.get("/", (req, res) => {
  res.send("🚀 Smart Government Scheme Recommendation Platform API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});