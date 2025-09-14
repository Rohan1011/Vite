import React, { useState, useEffect } from "react";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [form, setForm] = useState({ name: "", phone: "", dob: "", address: "" });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user)
      setForm({
        name: user.name,
        phone: user.phone || "",
        dob: user.dob || "",
        address: user.address || "",
      });
    const token = localStorage.getItem("token");
    if (token) API.defaults.headers.common["Authorization"] = "Bearer " + token;
  }, [user]);

  async function save(e) {
    e.preventDefault();
    try {
      // placeholder: backend route not yet implemented
      setMsg("Profile update endpoint not implemented in scaffold. Update later.");
    } catch (err) {
      setMsg("Error");
    }
  }

  return (
    <div className="card">
      <h3>Profile</h3>
      {user ? (
        <div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <form onSubmit={save}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              type="date"
            />
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <button>Save (stub)</button>
          </form>
        </div>
      ) : (
        <div>Please login</div>
      )}
      {msg && <div>{msg}</div>}
    </div>
  );
}
