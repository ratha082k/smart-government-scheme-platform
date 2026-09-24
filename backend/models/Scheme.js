import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    schemeType: { type: String, enum: ["Central", "Tamil Nadu"], default: "Central" },
    ministry: { type: String, default: "" },
    benefits: { type: [String], default: [] },

    eligibility: {
      minAge: { type: Number, default: 0 },
      maxAge: { type: Number, default: 120 },
      genders: { type: [String], default: ["Any"] },
      socialCategories: { type: [String], default: ["Any"] },
      occupations: { type: [String], default: ["Any"] },
      educationLevels: { type: [String], default: ["Any"] },
      annualIncomeMin: { type: Number, default: 0 },
      annualIncomeMax: { type: Number, default: Number.MAX_SAFE_INTEGER },
      states: { type: [String], default: ["Any"] },
      districts: { type: [String], default: ["Any"] },
      maritalStatus: { type: [String], default: ["Any"] },

      bankAccountRequired: { type: Boolean, default: false },
      incomeTaxPayerRestriction: {
        type: String,
        enum: ["any", "not_payer", "payer"],
        default: "any"
      },
      landOwnerRequired: { type: Boolean, default: false },
      electricityConnectionRequired: { type: Boolean, default: false },

      farmerRequired: { type: Boolean, default: false },
      studentRequired: { type: Boolean, default: false },
      widowRequired: { type: Boolean, default: false },
      seniorCitizenRequired: { type: Boolean, default: false },
      disabilityRequired: { type: Boolean, default: false },
      bplRequired: { type: Boolean, default: false },
      minorityRequired: { type: Boolean, default: false }
    },

    documentsRequired: { type: [String], default: [] },
    applicationProcess: { type: String, default: "" },
    officialWebsite: { type: String, default: "" },
    officialApplyLink: { type: String, default: "" },
    source: { type: String, default: "" },
    lastVerified: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Scheme", schemeSchema);
