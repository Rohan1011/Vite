import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link> | <Link to="/signup">Signup</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/admin">Admin</Link>
      </nav>
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome</h2>
                <p>Student Feedback App</p>
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}
