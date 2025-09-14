import React, { useState } from "react";
import API, { setToken } from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Logged in. Token saved to localStorage.");
    } catch (err) {
      setMsg(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="card">
      <h3>Login</h3>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      <form onSubmit={submit}>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
}
