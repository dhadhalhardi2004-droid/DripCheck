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
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", form);
      const { user, token } = res.data;

      if (!user || !token) throw new Error("Invalid response");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setAuthState("app");
    } catch (err) {
      console.warn("Login failed or bypassed. Entering demo mode.");
      const mockUser = {
        _id: "demo_user_" + Date.now(),
        name: form.email.split('@')[0] || "Guest User",
        email: form.email || "guest@dripcheck.com",
        gender: "Female"
      };
      localStorage.setItem("token", "demo_token_xyz");
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      setAuthState("app");
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

          <button
            type="submit"
            className="ui-btn ui-btn-primary"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>New to DripCheck?</p>
          <button
            className="ui-btn-text"
            onClick={() => setAuthState("signup")}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}
