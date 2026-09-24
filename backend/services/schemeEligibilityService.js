import Scheme from "../models/Scheme.js";

const normalize = (value) =>
  value === undefined || value === null ? "" : String(value).trim().toLowerCase();

const normalizeArray = (value) =>
  Array.isArray(value) ? value.filter(Boolean).map(normalize) : [];

const universal = (value) => ["any", "all", "india", "pan india", "*"].includes(normalize(value));

const triBoolean = (value) => {
  if (value === true || normalize(value) === "true" || normalize(value) === "yes") return true;
  if (value === false || normalize(value) === "false" || normalize(value) === "no") return false;
  return null;
};

const matchesArray = (userValue, allowedValues, { optional = false } = {}) => {
  const allowed = normalizeArray(allowedValues);
  if (!allowed.length || allowed.some(universal)) return true;
  const user = normalize(userValue);
  if (!user) return optional;
  return allowed.includes(user);
};

const matchesAge = (age, e) => {
  const n = Number(age);
  return Number.isFinite(n) && n >= Number(e.minAge ?? 0) && n <= Number(e.maxAge ?? 120);
};

const matchesIncome = (income, e) => {
  const n = Number(income);
  return Number.isFinite(n) && n >= Number(e.annualIncomeMin ?? 0) && n <= Number(e.annualIncomeMax ?? Number.MAX_SAFE_INTEGER);
};

const matchesHardBoolean = (userValue, required) => {
  if (!required) return true;
  return triBoolean(userValue) === true;
};

const matchesTax = (userValue, restriction) => {
  const rule = normalize(restriction || "any");
  if (!rule || rule === "any") return true;
  const answer = triBoolean(userValue);
  if (answer === null) return false;
  return rule === "not_payer" ? answer === false : answer === true;
};

const specific = (values) => {
  const a = normalizeArray(values);
  return a.length > 0 && !a.some(universal);
};

const occupationKeywords = {
  farmer: ["farmer", "kisan", "agriculture", "agricultur"],
  business: ["mudra", "business", "entrepreneur", "startup", "enterprise", "msme", "micro", "small business"],
  student: ["scholarship", "student", "education", "skill", "kaushal", "career", "scholar"],
  unemployed: ["employment", "career", "job", "skill", "kaushal", "self employment"],
  employee: ["career", "employment", "worker", "insurance", "pension"],
  "self employed": ["business", "entrepreneur", "mudra", "enterprise", "self employment", "msme"]
};

const relevanceBoost = (scheme, user) => {
  const text = normalize([
    scheme.name,
    scheme.description,
    ...(scheme.benefits || []),
    scheme.ministry
  ].join(" "));
  const occupation = normalize(user.occupation);
  let boost = 0;
  const reasons = [];

  const words = occupationKeywords[occupation] || [];
  const matchedKeyword = words.some((word) => text.includes(word));
  if (matchedKeyword) {
    boost += 35;
    reasons.push(`Strong relevance for ${user.occupation} profile`);
  }

  if (occupation === "business" && /mudra|startup|msme|enterprise|entrepreneur|business/.test(text)) {
    boost += 30;
    reasons.push("Business and entrepreneurship focus");
  }

  if (occupation === "student" && /scholarship|education|student|skill|career/.test(text)) {
    boost += 30;
    reasons.push("Student and education focus");
  }

  if (occupation === "farmer" && /kisan|farmer|agriculture/.test(text)) {
    boost += 35;
    reasons.push("Farmer and agriculture focus");
  }

  if (user.state && text.includes(normalize(user.state))) {
    boost += 5;
  }

  return { boost, reasons };
};

const calculateEligibility = (scheme, user) => {
  const e = scheme.eligibility || {};
  let score = 0;
  const reasons = [];

  if (!matchesAge(user.age, e) || !matchesIncome(user.income, e)) {
    return { matched: false, score: 0, reasons: [] };
  }

  score += 20;
  reasons.push("Age and income requirements matched");

  if (!matchesArray(user.gender, e.genders)) return { matched: false, score: 0, reasons: [] };
  if (specific(e.genders)) { score += 8; reasons.push("Gender requirement matched"); }

  if (!matchesArray(user.occupation, e.occupations)) return { matched: false, score: 0, reasons: [] };
  if (specific(e.occupations)) { score += 25; reasons.push("Occupation requirement matched"); }

  if (!matchesArray(user.category, e.socialCategories)) return { matched: false, score: 0, reasons: [] };
  if (specific(e.socialCategories)) { score += 15; reasons.push("Social category requirement matched"); }

  if (!matchesArray(user.state, e.states)) return { matched: false, score: 0, reasons: [] };
  if (specific(e.states)) { score += 12; reasons.push("State requirement matched"); }

  if (!matchesArray(user.district, e.districts)) return { matched: false, score: 0, reasons: [] };
  if (specific(e.districts)) { score += 12; reasons.push("District requirement matched"); }

  if (!matchesArray(user.education, e.educationLevels, { optional: true })) return { matched: false, score: 0, reasons: [] };
  if (specific(e.educationLevels) && normalize(user.education)) { score += 12; reasons.push("Education requirement matched"); }

  if (!matchesArray(user.maritalStatus, e.maritalStatus, { optional: true })) return { matched: false, score: 0, reasons: [] };
  if (specific(e.maritalStatus) && normalize(user.maritalStatus)) { score += 10; reasons.push("Marital status requirement matched"); }

  if (!matchesHardBoolean(user.bankAccount, e.bankAccountRequired)) return { matched: false, score: 0, reasons: [] };
  if (e.bankAccountRequired) { score += 12; reasons.push("Bank account requirement matched"); }

  if (!matchesTax(user.incomeTaxPayer, e.incomeTaxPayerRestriction)) return { matched: false, score: 0, reasons: [] };
  if (normalize(e.incomeTaxPayerRestriction) !== "any") { score += 15; reasons.push("Income-tax condition matched"); }

  if (!matchesHardBoolean(user.landOwner, e.landOwnerRequired)) return { matched: false, score: 0, reasons: [] };
  if (e.landOwnerRequired) { score += 18; reasons.push("Land ownership requirement matched"); }

  if (!matchesHardBoolean(user.electricityConnection, e.electricityConnectionRequired)) return { matched: false, score: 0, reasons: [] };
  if (e.electricityConnectionRequired) { score += 12; reasons.push("Electricity connection requirement matched"); }

  if (e.studentRequired && normalize(user.occupation) !== "student") return { matched: false, score: 0, reasons: [] };
  if (e.studentRequired) { score += 25; reasons.push("Student-specific requirement matched"); }

  if (e.farmerRequired && normalize(user.occupation) !== "farmer") return { matched: false, score: 0, reasons: [] };
  if (e.farmerRequired) { score += 25; reasons.push("Farmer-specific requirement matched"); }

  if (e.widowRequired && normalize(user.maritalStatus) !== "widow") return { matched: false, score: 0, reasons: [] };
  if (e.widowRequired) { score += 25; reasons.push("Widow-specific requirement matched"); }

  if (e.seniorCitizenRequired && Number(user.age) < 60) return { matched: false, score: 0, reasons: [] };
  if (e.seniorCitizenRequired) { score += 25; reasons.push("Senior-citizen requirement matched"); }

  for (const [field, label] of [
    ["disabilityRequired", "Disability"],
    ["bplRequired", "BPL"],
    ["minorityRequired", "Minority"]
  ]) {
    if (e[field] && triBoolean(user[field.replace("Required", "")]) !== true) {
      return { matched: false, score: 0, reasons: [] };
    }
    if (e[field]) { score += 25; reasons.push(`${label}-specific requirement matched`); }
  }

  const relevance = relevanceBoost(scheme, user);
  score += relevance.boost;
  reasons.push(...relevance.reasons);

  return { matched: true, score, reasons };
};

export const findEligibleSchemes = async (user = {}) => {
  const schemes = await Scheme.find({}).lean();

  const normalizedUser = {
    age: user.age,
    income: user.income,
    gender: normalize(user.gender),
    occupation: normalize(user.occupation),
    category: normalize(user.category),
    state: normalize(user.state),
    district: normalize(user.district),
    education: normalize(user.education),
    maritalStatus: normalize(user.maritalStatus),
    bankAccount: user.bankAccount,
    incomeTaxPayer: user.incomeTaxPayer,
    bpl: user.bpl,
    disability: user.disability,
    minority: user.minority,
    landOwner: user.landOwner,
    electricityConnection: user.electricityConnection
  };

  const results = schemes
    .map((scheme) => {
      const result = calculateEligibility(scheme, normalizedUser);
      return result.matched ? { scheme, ...result } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.scheme.name.localeCompare(b.scheme.name));

  return results.slice(0, 6).map(({ scheme, score, reasons }) => ({
    ...scheme,
    eligibilityScore: Math.min(100, score),
    matchReasons: [...new Set(reasons)].slice(0, 6)
  }));
};
