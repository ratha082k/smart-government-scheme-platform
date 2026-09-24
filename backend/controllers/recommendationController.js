import { findEligibleSchemes } from "../services/schemeEligibilityService.js";

export const getRecommendations = async (req, res) => {
  try {
    const required = ["age", "income", "gender", "occupation", "category", "state", "district"];
    const missing = required.filter((key) => req.body?.[key] === undefined || req.body?.[key] === "");

    if (missing.length) {
      return res.status(400).json({
        message: `Please provide: ${missing.join(", ")}`
      });
    }

    const schemes = await findEligibleSchemes(req.body);

    return res.status(200).json(schemes);
  } catch (error) {
    console.error("Recommendation error:", error);
    return res.status(500).json({ message: "Unable to generate recommendations" });
  }
};
