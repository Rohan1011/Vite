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

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rohan1011/Vite.git
   cd Vite
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   ```

3. **Configure Environment Variables**
   
   Edit the `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/student_feedback_app
   JWT_SECRET=supersecret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Seed the Database**
   ```bash
   node utils/seed.js
   ```
   This creates admin user and sample courses.

5. **Start Backend Server**
   ```bash
   npm run dev
   ```

6. **Frontend Setup**
   
   Open a new terminal and navigate to frontend:
   ```bash
   cd frontend
   npm install
   npm install axios react-router-dom
   ```

7. **Configure Frontend Environment**
   
   Create `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

8. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

9. **Access the Application**
   
   Frontend runs at: http://localhost:5173
   
   Backend API runs at: http://localhost:5000

---

## 🧪 Test Accounts

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `Admin@1234`

### Student Account
- Sign up from the frontend `/signup` page

---

## 📂 Project Structure

```
├── backend/
│   ├── config/           # Database connection
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes (auth, feedback, courses, admin)
│   ├── middleware/       # JWT authentication & RBAC
│   ├── utils/            # Seeder script
│   └── server.js         # Express entry point
├── frontend/
│   ├── src/
│   │   ├── pages/        # Signup, Login, Dashboard, Profile, Admin
│   │   ├── api.js        # Axios wrapper
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # React entry point
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
└── README.md
```

---

## 🌍 Deployment

### Backend Deployment
1. Deploy on **Render** / **Railway** / **Heroku**
2. Set environment variables from your `.env` file
3. Ensure MongoDB URI points to your production database

### Frontend Deployment
1. Deploy on **Vercel** / **Netlify**
2. Set `VITE_API_URL` environment variable to point to your deployed backend URL
3. Build command: `npm run build`
4. Output directory: `dist`

---

## 🛠️ Development Scripts

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
```

### Frontend
```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## ✅ Roadmap / Future Extensions

- [ ] Profile picture upload (Cloudinary integration)
- [ ] Better feedback analytics with graphs and charts
- [ ] Email notifications for feedback submissions
- [ ] Unit and integration tests
- [ ] Mobile responsive design improvements
- [ ] Real-time notifications
- [ ] Advanced filtering and search functionality

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainers.