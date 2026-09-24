export function checkEligibility(user, scheme) {
  const reasons = [];

  const rules = scheme.eligibility;

  // -----------------------------
  // Age
  // -----------------------------
  if (
    user.age < rules.minAge ||
    user.age > rules.maxAge
  ) {
    return {
      eligible: false,
      reason: "Age not eligible",
    };
  }

  reasons.push("Age matched");

  // -----------------------------
  // Gender
  // -----------------------------
  if (
    !rules.genders.includes("Any") &&
    !rules.genders.includes(user.gender)
  ) {
    return {
      eligible: false,
      reason: "Gender not eligible",
    };
  }

  reasons.push("Gender matched");

  // -----------------------------
  // Income
  // -----------------------------
  if (
    user.annualIncome < rules.annualIncomeMin ||
    user.annualIncome > rules.annualIncomeMax
  ) {
    return {
      eligible: false,
      reason: "Income not eligible",
    };
  }

  reasons.push("Income matched");

  // -----------------------------
  // Category
  // -----------------------------
  if (
    !rules.socialCategories.includes("Any") &&
    !rules.socialCategories.includes(user.category)
  ) {
    return {
      eligible: false,
      reason: "Category not eligible",
    };
  }

  reasons.push("Category matched");

  // -----------------------------
  // Occupation
  // -----------------------------
  if (
    !rules.occupations.includes("Any") &&
    !rules.occupations.includes(user.occupation)
  ) {
    return {
      eligible: false,
      reason: "Occupation not eligible",
    };
  }

  reasons.push("Occupation matched");

  // -----------------------------
  // State
  // -----------------------------
  if (
    !rules.states.includes("All") &&
    !rules.states.includes(user.state)
  ) {
    return {
      eligible: false,
      reason: "State not eligible",
    };
  }

  reasons.push("State matched");

  // -----------------------------
  // Student
  // -----------------------------
  if (
    rules.studentRequired &&
    !user.student
  ) {
    return {
      eligible: false,
      reason: "Student required",
    };
  }

  if (rules.studentRequired)
    reasons.push("Student matched");

  // -----------------------------
  // Farmer
  // -----------------------------
  if (
    rules.farmerRequired &&
    !user.farmer
  ) {
    return {
      eligible: false,
      reason: "Farmer required",
    };
  }

  if (rules.farmerRequired)
    reasons.push("Farmer matched");

  // -----------------------------
  // BPL
  // -----------------------------
  if (
    rules.bplRequired &&
    !user.bpl
  ) {
    return {
      eligible: false,
      reason: "BPL required",
    };
  }

  if (rules.bplRequired)
    reasons.push("BPL matched");

  return {
    eligible: true,
    reasons,
  };
}