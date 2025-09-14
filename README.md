# 🎓 Student Feedback App

A full-stack web application for course feedback.  
Built with **Node.js + Express + MongoDB** (backend) and **React + Vite** (frontend).

---

## ✨ Features

### 🔑 Authentication & Authorization
- Signup/Login with email + password
- Passwords hashed with bcrypt
- JWT-based authentication
- Role-based access (Student / Admin)

### 📝 Feedback
- Students can:
  - Submit feedback on courses (rating 1–5 + message)
  - View, edit, delete their feedback
- Admins can:
  - View all feedback
  - Filter and export to CSV

### 👤 Profile
- Students can view/update profile (name, phone, DOB, address)
- Email is read-only
- (Extension: upload profile picture to Cloudinary)

### 📊 Admin Dashboard
- Overview of:
  - Total feedback count
  - Number of students
  - Average ratings per course
- Manage students (block/unblock/delete)
- Manage courses (add/edit/delete)

---

## ⚙️ Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend**: React (Vite), Axios, React Router
- **Other**: CSV export, dotenv, CORS

---

## 🚀 Getting Started
git clone https://github.com/Rohan1011/Vite.git
cd Vite

#Backend Setup#
cd backend
cp .env.example .env
npm install
npm run dev

#Example .env:#
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_feedback_app
JWT_SECRET=supersecret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Seed the DB (creates admin + sample courses):
node utils/seed.js


Admin credentials:

Email: admin@example.com
Password: Admin@1234

#Frontend Setup#
cd frontend
npm install
npm install axios react-router-dom

#Add .env in frontend/:#
VITE_API_URL=http://localhost:5000/api

#Start frontend:#
npm run dev


Runs at: http://localhost:5173

🧪 Test Accounts

Admin

Email: admin@example.com
Password: Admin@1234


Student

Sign up from the frontend /signup page

📂 Project Structure
backend/
  ├── config/        # DB connection
  ├── models/        # Mongoose schemas
  ├── routes/        # Express routes (auth, feedback, courses, admin)
  ├── middleware/    # JWT auth & RBAC
  ├── utils/         # Seeder script
  └── server.js      # Express entrypoint

frontend/
  ├── src/
  │   ├── pages/     # Signup, Login, Dashboard, Profile, Admin
  │   ├── api.js     # Axios wrapper
  │   ├── App.jsx
  │   └── main.jsx
  └── vite.config.js # Vite config

🌍 Deployment
Backend

Deploy on Render / Railway / Heroku

Set environment variables from .env

Frontend

Deploy on Vercel / Netlify

Set VITE_API_URL to point to your backend’s deployed URL

✅ Roadmap / Extensions(Future Works)

Profile picture upload (Cloudinary)

Better feedback analytics (graphs)

Email notifications

Unit/integration tests
