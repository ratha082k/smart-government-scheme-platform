import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
    },

    occupation: {
      type: String,
    },

    income: {
      type: Number,
    },

    state: {
      type: String,
    },

    district: {
      type: String,
    },

    category: {
      type: String,
    },

    education: {
      type: String,
    },

    disability: {
      type: Boolean,
      default: false,
    },

    minority: {
      type: Boolean,
      default: false,
    },

    bpl: {
      type: Boolean,
      default: false,
    },

    farmer: {
      type: Boolean,
      default: false,
    },

    student: {
      type: Boolean,
      default: false,
    },

    maritalStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);