import mongoose from "mongoose";
import dotenv from "dotenv";

import Scheme from "../models/Scheme.js";
import schemes from "./schemes.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Scheme.deleteMany();

    await Scheme.insertMany(schemes);

    console.log("Schemes Inserted Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedDatabase();