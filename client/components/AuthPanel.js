"use client";

import { useState } from "react";
import { login, register } from "@/lib/api";
import { useAuth } from "./AuthProvider";

export default function AuthPanel() {
  const { user, loading, loginSuccess, logout } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const data =
        mode === "login"
          ? await login(email, password)
          : await register(email, password);

      if (mode === "register") {
        const loginData = await login(email, password);
        loginSuccess(loginData.token, loginData.user);
      } else {
        loginSuccess(data.token, data.user);
      }

      setEmail("");
      setPassword("");
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-secondary navbar-auth">Loading...</p>;
  }

  if (user) {
    return (
      <div className="navbar-auth navbar-auth-logged-in">
        <span className="text-secondary navbar-user-email">
          {user.email}
        </span>
        <button className="btn btn-secondary btn-sm" type="button" onClick={logout}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="navbar-auth">
      {!showForm ? (
        <div className="btn-group navbar-auth-buttons">
          <button
            className="btn btn-secondary btn-sm"
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
              setShowForm(true);
            }}
          >
            Log in
          </button>
          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={() => {
              setMode("register");
              setError(null);
              setShowForm(true);
            }}
          >
            Register
          </button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h3>{mode === "login" ? "Log in" : "Create account"}</h3>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="btn-group">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Please wait..."
                : mode === "login"
                  ? "Log in"
                  : "Register"}
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setShowForm(false);
                setError(null);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError(null);
              }}
            >
              {mode === "login" ? "Need an account?" : "Already registered?"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
