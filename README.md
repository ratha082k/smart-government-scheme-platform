# Smart Government Scheme Recommendation Platform

A full-stack web application that helps users discover government welfare and development schemes based on their personal profile and eligibility information. The platform combines a rule-based recommendation engine, document OCR, AI-powered chatbot assistance, authentication, and an administrative dashboard to provide a centralized and user-friendly experience for accessing scheme information.

## Project Overview

Finding suitable government schemes can be difficult because users may not know which schemes match their age, income, occupation, category, location, or other eligibility requirements. The Smart Government Scheme Recommendation Platform addresses this problem by collecting user profile information, evaluating scheme eligibility conditions, ranking relevant schemes, and presenting the results through an easy-to-use web interface. The platform also provides document text extraction using OCR and an AI chatbot for conversational assistance.

## Key Features

- User registration and secure login
- JWT-based authentication
- User profile management
- Personalized government scheme recommendations
- Rule-based eligibility filtering
- Profile relevance ranking
- Government scheme search and browsing
- Detailed scheme information
- Save schemes for later reference
- Document upload and OCR-based text extraction
- Document type detection using extracted text
- AI-powered government scheme chatbot
- Admin dashboard for scheme management
- Responsive and modern user interface
- MongoDB-based data storage
- REST API architecture

## Recommendation System

The recommendation module uses a profile-based eligibility engine. User information such as age, income, occupation, category, state, district, student status, farmer status, bank account availability, tax status, and other applicable conditions are compared against scheme eligibility rules.

The recommendation workflow is:

1. User enters profile information.
2. The backend receives the profile through the recommendation API.
3. Hard eligibility conditions are evaluated.
4. Schemes that fail mandatory conditions are filtered out.
5. Eligible schemes receive additional relevance based on the user's profile.
6. Matching schemes are sorted according to relevance.
7. The most relevant schemes are returned to the frontend.
8. The frontend displays the recommendations as scheme cards.

This recommendation system is intended as an assistance tool and users should verify the latest eligibility requirements and application procedures through the appropriate official government sources before applying.

## AI Chatbot

The platform includes an AI-powered chatbot called SmartGov AI. The chatbot allows users to ask questions about government schemes and receive conversational responses.

The chatbot uses the Groq API and is integrated into the backend through a dedicated chatbot controller. The backend prepares relevant scheme information and sends the request to the configured AI model before returning the generated response to the frontend.

## Document Verification and OCR

The Document Verification module allows users to upload supported documents and extract text using Optical Character Recognition (OCR).

The backend preprocesses uploaded images before sending them to Tesseract OCR. Image preprocessing includes rotation correction, PNG conversion, grayscale conversion, and normalization to improve OCR reliability.

The system can identify document types based on extracted text and attempt to extract information such as:

- Name
- Date of birth
- Aadhaar number
- PAN number
- Income information

The current implementation performs text-based classification and extraction for demonstration purposes. It should not be considered an official or cryptographic verification system for government documents.

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- React Icons
- Framer Motion
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Tesseract.js
- Sharp
- Groq API

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB

## System Architecture

```text
                    ┌───────────────────────┐
                    │       React UI        │
                    │       Frontend        │
                    └───────────┬───────────┘
                                │
                                │ REST API
                                ▼
                    ┌───────────────────────┐
                    │    Express / Node.js  │
                    │       Backend         │
                    └───────────┬───────────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
      ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
      │  MongoDB    │    │Recommendation│    │  OCR / AI   │
      │  Database   │    │   Engine     │    │  Services   │
      └─────────────┘    └─────────────┘    └─────────────┘

#Project Workflow

User Registration / Login
          ↓
      User Profile
          ↓
Profile-Based Recommendation
          ↓
Eligibility Filtering
          ↓
Relevance Ranking
          ↓
Recommended Schemes
          ↓
Scheme Details / Save Scheme

Additional Services:
          ↓
Document Upload → Image Processing → OCR → Extracted Information

          ↓
AI Chatbot → User Question → Backend → AI Model → Response

Project Structure

smart-government-scheme-platform/
│
├── backend/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── validators/
│   ├── documentController.js
│   ├── importSchemes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   └── package.json
│
├── docs/
│   └── screenshots/
│
├── .gitignore
└── README.md