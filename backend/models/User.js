import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  category: String,
  occupation: String,
  annualIncome: Number,

  state: String,
  district: String,

  education: String,

  disability: Boolean,

  minority: Boolean,

  bpl: Boolean,

  farmer: Boolean,

  student: Boolean,

  maritalStatus: String,
});

export default mongoose.model("UserProfile", userProfileSchema);