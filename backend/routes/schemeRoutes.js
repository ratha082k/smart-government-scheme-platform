import express from "express";

import {
  addScheme,
  getAllSchemes,
  updateScheme,
  deleteScheme,
} from "../controllers/schemeController.js";

const router = express.Router();

router.get("/", getAllSchemes);

router.post("/", addScheme);

router.put("/:id", updateScheme);

router.delete("/:id", deleteScheme);

export default router;