import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://rajat-job-tracker-api.onrender.com/api/companies";

function App() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [darkMode, setDarkMode] = useState(true);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(API);
      setCompanies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async () => {
    if (!companyName || !role) return;

    await axios.post(API, {
      companyName,
      role,
      status,
    });

    setCompanyName("");
    setRole("");
    setStatus("Applied");
    fetchCompanies();
  };

  const total = companies.length;
  const applied = companies.filter(c => c.status === "Applied").length;
  const interview = companies.filter(c => c.status === "Interview").length;
  const rejected = companies.filter(c => c.status === "Rejected").length;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode 🌙
      </button>

      <h1>🚀 Rajat's Job Tracker</h1>

      <div className="cards">
        <div className="card">
          <h3>Total</h3>
          <p>{total}</p>
        </div>
        <div className="card">
          <h3>Applied</h3>
          <p>{applied}</p>
        </div>
        <div className="card">
          <h3>Interview</h3>
          <p>{interview}</p>
        </div>
        <div className="card">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>
      </div>

      <div className="form-box">
        <h2>Add Company</h2>
        <input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>
        <button onClick={handleSubmit}>Add</button>
      </div>

      <div className="ai-box">
        <h3>🤖 AI Career Insight</h3>
        {total === 0 ? (
          <p>🚀 Start applying to unlock AI insights!</p>
        ) : total >= 5 ? (
          <p>🔥 Great consistency! You're building serious momentum.</p>
        ) : (
          <p>💡 Keep applying daily to increase interview chances.</p>
        )}
      </div>
    </div>
  );
}

export default App;
