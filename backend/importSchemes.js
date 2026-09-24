import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Scheme from "./models/Scheme.js";

dotenv.config();

// Read schemes.json
const schemes = JSON.parse(
  fs.readFileSync("./data/schemes.json", "utf-8")
);

const importSchemes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Remove old schemes
    await Scheme.deleteMany();

    console.log("🗑 Old schemes deleted");

    // Insert new schemes
    await Scheme.insertMany(schemes);

    console.log(`✅ ${schemes.length} Schemes Imported Successfully`);

    await mongoose.disconnect();

    console.log("✅ MongoDB Disconnected");

    process.exit(0);
  } catch (error) {
    console.error("❌ Import Failed");
    console.error(error);

    process.exit(1);
  }
};

importSchemes();