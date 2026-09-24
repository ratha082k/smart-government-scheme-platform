import Tesseract from "tesseract.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const {
      data: { text },
    } = await Tesseract.recognize(
      req.file.buffer,
      "eng"
    );

    const upperText = text.toUpperCase();

    let documentType = "Unknown Document";
    let status = "Not Verified";
    let confidence = 50;

    let extractedData = {
      name: "",
      dob: "",
      aadhaar: "",
      pan: "",
      income: "",
    };

    // ---------------- Aadhaar ----------------

    if (
      upperText.includes("AADHAAR") ||
      upperText.includes("UIDAI")
    ) {
      documentType = "Aadhaar Card";
      status = "Verified";
      confidence = 95;

      const aadhaar = text.match(/\d{4}\s\d{4}\s\d{4}/);

      if (aadhaar) {
        extractedData.aadhaar = aadhaar[0];
      }

      const dob = text.match(/\d{2}\/\d{2}\/\d{4}/);

      if (dob) {
        extractedData.dob = dob[0];
      }
    }

    // ---------------- PAN ----------------

    if (upperText.includes("INCOME TAX")) {
      documentType = "PAN Card";
      status = "Verified";
      confidence = 93;

      const pan = text.match(/[A-Z]{5}[0-9]{4}[A-Z]/);

      if (pan) {
        extractedData.pan = pan[0];
      }
    }

    // ---------------- Income Certificate ----------------

    if (upperText.includes("INCOME CERTIFICATE")) {
      documentType = "Income Certificate";
      status = "Verified";
      confidence = 94;

      const income = text.match(/₹?\s?[\d,]+/);

      if (income) {
        extractedData.income = income[0];
      }
    }

    // ---------------- Name ----------------

    const lines = text.split("\n");

    for (const line of lines) {
      if (
        line.trim().length > 5 &&
        line.trim().length < 35 &&
        /^[A-Za-z ]+$/.test(line.trim())
      ) {
        extractedData.name = line.trim();
        break;
      }
    }

    res.json({
      extractedText: text,
      extractedData,
      documentType,
      status,
      confidence,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "OCR Failed",
    });
  }
};