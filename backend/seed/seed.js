import mongoose from "mongoose";
import dotenv from "dotenv";
import Scheme from "../models/Scheme.js";
import schemes from "./schemes.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await Scheme.deleteMany({});
    console.log("🗑️ Existing schemes cleared");

    await Scheme.insertMany(schemes);
    console.log(`🌱 ${schemes.length} schemes inserted successfully`);

    await mongoose.disconnect();
    console.log("✅ Database seeding completed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();