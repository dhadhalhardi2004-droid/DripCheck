// client/src/pages/Signup.js
import React, { useState } from "react";
import axios from "axios";

export default function Signup({ setAuthState }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", gender: "Male" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:4000/api/auth/register", form);
      setAuthState("login");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper animate-fade">
      <div className="ui-card auth-card">
        <div className="auth-header">
          <div className="brand-logo">Drip<span>Check</span></div>
          <h2>Join the Movement</h2>
          <p>Curate your aesthetic today.</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              className="ui-input"
              placeholder="Alex Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="ui-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="ui-input"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" className="ui-input pl-3" value={form.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="ui-btn ui-btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button className="ui-btn-text" onClick={() => setAuthState('login')}>
            Sign In here
          </button>
        </div>
      </div>
    </div>
  );
}
