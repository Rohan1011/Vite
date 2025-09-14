import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ courseId: "", rating: 5, message: "" });
  const [mine, setMine] = useState([]);

  useEffect(() => {
    API.get("/courses").then((r) => setCourses(r.data)).catch(() => {});
    const token = localStorage.getItem("token");
    if (token) API.defaults.headers.common["Authorization"] = "Bearer " + token;
    API.get("/feedback/me").then((r) => setMine(r.data.items)).catch(() => {});
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/feedback", form);
      alert("Feedback submitted");
      const res = await API.get("/feedback/me");
      setMine(res.data.items);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="card">
      <h3>Submit Feedback</h3>
      <form onSubmit={submit}>
        <select
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: e.target.value })}
          required
        >
          <option value="">-- select course --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title} ({c.code})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Message (optional)"
        />
        <button>Submit</button>
      </form>

      <h4>Your feedback</h4>
      {mine.map((m) => (
        <div key={m._id}>
          <b>{m.course?.title}</b> — {m.rating} — {m.message}
        </div>
      ))}
    </div>
  );
}
