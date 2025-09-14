import React, { useEffect, useState } from "react";
import API from "../api";

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) API.defaults.headers.common["Authorization"] = "Bearer " + token;
    API.get("/admin/stats")
      .then((r) => setStats(r.data))
      .catch((e) => console.log(e.response?.data));
  }, []);

  return (
    <div className="card">
      <h3>Admin Dashboard</h3>
      {stats ? (
        <div>
          <div>Total feedback: {stats.totalFeedback}</div>
          <div>Total students: {stats.totalStudents}</div>
          <h4>Per course</h4>
          {stats.perCourse.map((p) => (
            <div key={p.course}>
              {p.course} — avg {Number(p.avgRating).toFixed(2)} ({p.count})
            </div>
          ))}
        </div>
      ) : (
        <div>Stats not available. Login as admin and try.</div>
      )}
    </div>
  );
}
