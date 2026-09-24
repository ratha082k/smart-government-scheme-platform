const schemes = [

  // ============================================================
  // 1. PM KISAN
  // ============================================================

  {
    name: "PM Kisan Samman Nidhi",
    description:
      "Income support scheme for eligible landholding farmer families.",
    schemeType: "Central",
    ministry:
      "Ministry of Agriculture and Farmers Welfare",

    benefits: [
      "₹6,000 per year",
      "Three equal instalments",
      "Direct benefit transfer to eligible beneficiaries"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 100,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Farmer"],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 10000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "not_payer",

      landOwnerRequired: true,

      electricityConnectionRequired: false,

      farmerRequired: true,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Land Ownership Records",
      "Bank Account Details"
    ],

    applicationProcess:
      "Register through the official PM-KISAN portal and complete the required verification process.",

    officialWebsite:
      "https://pmkisan.gov.in/",

    officialApplyLink:
      "https://pmkisan.gov.in/",

    source:
      "Government of India - PM-KISAN",

    lastVerified: new Date()
  },


  // ============================================================
  // 2. ATAL PENSION YOJANA
  // ============================================================

  {
    name: "Atal Pension Yojana (APY)",
    description:
      "Government-backed pension scheme providing old-age income security.",

    schemeType: "Central",

    ministry:
      "Ministry of Finance",

    benefits: [
      "Guaranteed pension after age 60",
      "Choice of pension amount",
      "Government-backed pension framework"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 40,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Any"],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 100000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "not_payer",

      landOwnerRequired: false,

      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Bank Account",
      "Mobile Number"
    ],

    applicationProcess:
      "Approach a bank branch or post office where the savings account is held.",

    officialWebsite:
      "https://pfrda.org.in/web/pfrda/schemes/atal-pension-yojana-apy",

    officialApplyLink:
      "https://pfrda.org.in/web/pfrda/schemes/atal-pension-yojana-apy",

    source:
      "PFRDA - Government of India",

    lastVerified: new Date()
  },


  // ============================================================
  // 3. PM SURYA GHAR
  // ============================================================

  {
    name: "PM Surya Ghar: Muft Bijli Yojana",
    description:
      "Programme supporting rooftop solar installation for eligible residential households.",

    schemeType: "Central",

    ministry:
      "Ministry of New and Renewable Energy",

    benefits: [
      "Rooftop solar support",
      "Central financial assistance",
      "Potential reduction in household electricity expenses"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 100,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Any"],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 100000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,

      electricityConnectionRequired: true,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Electricity Consumer Number",
      "Bank Account Details"
    ],

    applicationProcess:
      "Apply through the official PM Surya Ghar portal and follow the rooftop solar installation process.",

    officialWebsite:
      "https://www.pmsuryaghar.gov.in/",

    officialApplyLink:
      "https://www.pmsuryaghar.gov.in/",

    source:
      "Ministry of New and Renewable Energy",

    lastVerified: new Date()
  },


  // ============================================================
  // 4. PM JAN DHAN YOJANA
  // ============================================================

  {
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    description:
      "Financial inclusion programme providing access to basic banking services.",

    schemeType: "Central",

    ministry:
      "Ministry of Finance",

    benefits: [
      "Basic bank account",
      "Access to financial services",
      "Debit card facilities subject to applicable rules"
    ],

    eligibility: {
      minAge: 10,
      maxAge: 100,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Any"],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 100000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: false,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,

      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Identity Proof",
      "Address Proof"
    ],

    applicationProcess:
      "Visit a participating bank branch and request account opening under PMJDY.",

    officialWebsite:
      "https://pmjdy.gov.in/",

    officialApplyLink:
      "https://pmjdy.gov.in/",

    source:
      "Government of India - PMJDY",

    lastVerified: new Date()
  },


  // ============================================================
  // 5. PMJJBY
  // ============================================================

  {
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    description:
      "Life insurance scheme available to eligible bank account holders.",

    schemeType: "Central",

    ministry:
      "Ministry of Finance",

    benefits: [
      "Life insurance coverage",
      "Affordable annual premium",
      "Financial protection for nominee"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 50,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Any"],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 100000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,
      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Bank Account"
    ],

    applicationProcess:
      "Contact your participating bank or insurance provider for enrolment.",

    officialWebsite:
      "https://financialservices.gov.in/",

    officialApplyLink:
      "https://financialservices.gov.in/",

    source:
      "Department of Financial Services",

    lastVerified: new Date()
  },


  // ============================================================
  // 6. PMSBY
  // ============================================================

  {
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    description:
      "Accident insurance scheme for eligible bank account holders.",

    schemeType: "Central",

    ministry:
      "Ministry of Finance",

    benefits: [
      "Accident insurance coverage",
      "Affordable premium",
      "Financial protection for eligible accidental events"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 70,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Any"],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 100000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,
      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Bank Account"
    ],

    applicationProcess:
      "Contact a participating bank or insurance provider for enrolment.",

    officialWebsite:
      "https://financialservices.gov.in/",

    officialApplyLink:
      "https://financialservices.gov.in/",

    source:
      "Department of Financial Services",

    lastVerified: new Date()
  },


  // ============================================================
  // 7. PMKVY
  // ============================================================

  {
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    description:
      "Skill development programme providing training opportunities to eligible candidates.",

    schemeType: "Central",

    ministry:
      "Ministry of Skill Development and Entrepreneurship",

    benefits: [
      "Skill training",
      "Industry-oriented courses",
      "Certification opportunities"
    ],

    eligibility: {
      minAge: 15,
      maxAge: 45,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: [
        "Student",
        "Unemployed",
        "Self Employed",
        "Employee"
      ],

      educationLevels: [
        "10th",
        "12th",
        "Diploma",
        "Undergraduate"
      ],

      annualIncomeMin: 0,
      annualIncomeMax: 100000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: false,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,
      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Educational Certificate",
      "Identity Proof"
    ],

    applicationProcess:
      "Register through an authorised skill training centre or official skill development platform.",

    officialWebsite:
      "https://www.pmkvyofficial.org/",

    officialApplyLink:
      "https://www.pmkvyofficial.org/",

    source:
      "Ministry of Skill Development and Entrepreneurship",

    lastVerified: new Date()
  },


  // ============================================================
  // 8. NATIONAL CAREER SERVICE
  // ============================================================

  {
    name: "National Career Service (NCS)",
    description:
      "Digital platform connecting job seekers with employment and career services.",

    schemeType: "Central",

    ministry:
      "Ministry of Labour and Employment",

    benefits: [
      "Job search services",
      "Career information",
      "Employment-related services"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 60,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: [
        "Student",
        "Unemployed",
        "Employee",
        "Self Employed"
      ],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 100000000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: false,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,
      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Educational Details",
      "Resume"
    ],

    applicationProcess:
      "Register on the National Career Service portal.",

    officialWebsite:
      "https://www.ncs.gov.in/",

    officialApplyLink:
      "https://www.ncs.gov.in/",

    source:
      "Ministry of Labour and Employment",

    lastVerified: new Date()
  },


  // ============================================================
  // 9. CENTRAL SECTOR SCHOLARSHIP
  // ============================================================

  {
    name:
      "Central Sector Scheme of Scholarship for College and University Students",

    description:
      "Scholarship support for meritorious students pursuing higher education.",

    schemeType: "Central",

    ministry:
      "Ministry of Education",

    benefits: [
      "Financial scholarship support",
      "Support for higher education",
      "Assistance for eligible meritorious students"
    ],

    eligibility: {
      minAge: 17,
      maxAge: 30,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Student"],

      educationLevels: [
        "Undergraduate",
        "Postgraduate"
      ],

      annualIncomeMin: 0,
      annualIncomeMax: 800000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,
      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: true,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Income Certificate",
      "Academic Mark Sheets",
      "Bank Account Details"
    ],

    applicationProcess:
      "Apply through the National Scholarship Portal when the scheme application window is open.",

    officialWebsite:
      "https://scholarships.gov.in/",

    officialApplyLink:
      "https://scholarships.gov.in/",

    source:
      "Ministry of Education",

    lastVerified: new Date()
  },


  // ============================================================
  // 10. NATIONAL MEANS CUM MERIT SCHOLARSHIP
  // ============================================================

  {
    name:
      "National Means-cum-Merit Scholarship Scheme",

    description:
      "Scholarship programme supporting eligible students to continue secondary education.",

    schemeType: "Central",

    ministry:
      "Ministry of Education",

    benefits: [
      "Scholarship support",
      "Encourages continuation of education",
      "Financial assistance for eligible students"
    ],

    eligibility: {
      minAge: 13,
      maxAge: 18,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Student"],

      educationLevels: [
        "8th",
        "10th"
      ],

      annualIncomeMin: 0,
      annualIncomeMax: 350000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,
      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: true,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Income Certificate",
      "Academic Records",
      "Bank Account Details"
    ],

    applicationProcess:
      "Apply through the National Scholarship Portal or the relevant state education authority.",

    officialWebsite:
      "https://scholarships.gov.in/",

    officialApplyLink:
      "https://scholarships.gov.in/",

    source:
      "Ministry of Education",

    lastVerified: new Date()
  },


  // ============================================================
  // 11. PMAY URBAN
  // ============================================================

  {
    name:
      "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",

    description:
      "Housing assistance for eligible urban families requiring affordable housing support.",

    schemeType: "Central",

    ministry:
      "Ministry of Housing and Urban Affairs",

    benefits: [
      "Housing assistance",
      "Support for affordable housing",
      "Financial assistance according to applicable component"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 100,

      genders: ["Any"],

      socialCategories: ["Any"],

      occupations: ["Any"],

      educationLevels: ["Any"],

      annualIncomeMin: 0,
      annualIncomeMax: 1800000,

      states: ["Any"],
      districts: ["Any"],

      maritalStatus: ["Any"],

      bankAccountRequired: true,

      incomeTaxPayerRestriction: "any",

      landOwnerRequired: false,
      electricityConnectionRequired: false,

      farmerRequired: false,
      studentRequired: false,
      widowRequired: false,
      seniorCitizenRequired: false,
      disabilityRequired: false,
      bplRequired: false,
      minorityRequired: false
    },

    documentsRequired: [
      "Aadhaar Card",
      "Income Certificate",
      "Bank Account Details",
      "Address Proof"
    ],

    applicationProcess:
      "Apply through the applicable PMAY-U process through the official government channels.",

    officialWebsite:
      "https://pmay-urban.gov.in/",

    officialApplyLink:
      "https://pmay-urban.gov.in/",

    source:
      "Ministry of Housing and Urban Affairs",

    lastVerified: new Date()
  }

];

export default schemes;