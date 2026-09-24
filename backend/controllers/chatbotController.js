import Groq from "groq-sdk";
import Scheme from "../models/Scheme.js";
import { findEligibleSchemes } from "../services/schemeEligibilityService.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message, userDetails } = req.body;

    let schemes = [];

    // -------------------------
    // 1. Eligibility Search
    // -------------------------

    if (userDetails) {
      schemes = await findEligibleSchemes(userDetails);
    }

    // -------------------------
    // 2. Keyword Search (Fallback)
    // -------------------------

    if (schemes.length === 0) {
      schemes = await Scheme.find({
        $or: [
          {
            name: {
              $regex: message,
              $options: "i",
            },
          },
          {
            description: {
              $regex: message,
              $options: "i",
            },
          },
          {
            ministry: {
              $regex: message,
              $options: "i",
            },
          },
          {
            "eligibility.occupations": {
              $regex: message,
              $options: "i",
            },
          },
          {
            "eligibility.genders": {
              $regex: message,
              $options: "i",
            },
          },
          {
            "eligibility.socialCategories": {
              $regex: message,
              $options: "i",
            },
          },
          {
            "eligibility.states": {
              $regex: message,
              $options: "i",
            },
          },
          {
            "eligibility.educationLevels": {
              $regex: message,
              $options: "i",
            },
          },
        ],
      }).limit(5);
    }

    // -------------------------
    // 3. Prepare AI Prompt
    // -------------------------

    const prompt = `
You are SmartGov AI.

You are an expert in Indian Government Schemes.

You MUST answer ONLY using the government schemes provided below.

If the database contains matching schemes,
explain ONLY those schemes.

If no schemes are found,
reply exactly:

"No matching government schemes were found in our database."

Always answer in Markdown.

Use this format:

# Scheme Name

## Overview

Short description.

## Benefits

- Point 1
- Point 2

## Eligibility

- Point 1
- Point 2

## Required Documents

- Aadhaar Card
- Income Certificate

## Official Website

Website URL if available.

----------------------------

User Question:

${message}

----------------------------

User Details:

${JSON.stringify(userDetails, null, 2)}

----------------------------

Matching Schemes:

${JSON.stringify(schemes, null, 2)}

`;

    // -------------------------
    // 4. Call Groq
    // -------------------------

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.2,

      max_tokens: 1000,

      messages: [
        {
          role: "system",
          content:
            "You are SmartGov AI. Always answer in Markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // -------------------------
    // 5. Send Response
    // -------------------------

    res.json({
      success: true,
      schemesFound: schemes.length,
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);

    res.status(500).json({
      success: false,
      reply: "Unable to process your request.",
    });
  }
};