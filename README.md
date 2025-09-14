echo "# Vite"
# Student Feedback App (Scaffold)


This repository contains a minimal scaffold for a full-stack Student Feedback application.
It includes a Node/Express backend and a minimal React frontend scaffold.

## What's included
- backend/: Express + Mongoose API with auth, feedback, course, admin routes.
- frontend/: Minimal React pages (Signup, Login, Dashboard, Profile, Admin).
- utils/seed.js to create an admin and sample courses.

## Quick start (backend)
1. cd backend
2. cp .env.example .env   and edit values (MONGODB_URI, JWT_SECRET)
3. npm install
4. npm run dev
5. node utils/seed.js  (creates admin@example.com / Admin@1234 and sample courses)

cd frontend
npm install
npm install axios react-router-dom

## Notes
- This is a scaffold to get you started. Several features are intentionally left as exercises:
  - profile update persistence, profile picture upload handling on frontend
  - full frontend build scripts (use Vite/CRA for production)
- The README in backend/ contains more detailed backend instructions.
"# Vite" 
