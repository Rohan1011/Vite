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

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Rohan1011/Vite.git
cd Vite
