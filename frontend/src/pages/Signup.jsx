import React, { useState } from "react";
import API from "../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      setMsg("Signed up! Token received. Open console.");
      console.log(res.data);
    } catch (err) {
      setMsg(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="card">
      <h3>Signup</h3>
      {msg && <div style={{ color: "red" }}>{msg}</div>}
      <form onSubmit={submit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full name"
          required
        />
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
        <button>Signup</button>
      </form>
    </div>
  );
}
