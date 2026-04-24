// client/src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";

export default function Login({ setAuthState, setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", form);
      if (res.data && res.data.user && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setAuthState("app");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials or login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper animate-fade">
      <div className="ui-card auth-card">
        <div className="auth-header">
          <div className="brand-logo">Drip<span>Check</span></div>
          <h2>Welcome Back</h2>
          <p>Sign in to access your digital wardrobe.</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
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
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="ui-btn ui-btn-primary" disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>New to DripCheck?</p>
          <button className="ui-btn-text" onClick={() => setAuthState('signup')}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}
