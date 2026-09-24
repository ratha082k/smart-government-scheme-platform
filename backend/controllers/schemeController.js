import Scheme from "../models/Scheme.js";

// Add Scheme
export const addScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);

    res.status(201).json({
      success: true,
      message: "Scheme Added Successfully",
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Schemes
export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      schemes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Scheme
export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Scheme
export const deleteScheme = async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Scheme Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};