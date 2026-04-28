import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/login.css";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors = {};
    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await forgotPassword({ email });
      setStatus(
        response?.message ||
          "Email verified. Continue to set a new password."
      );
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email.trim())}`);
      }, 800);
    } catch (err) {
      setErrors({ general: err.message || "Unable to send reset email." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="page-header">
        <h1>Resource Library</h1>
      </div>
      <div className="auth-container">
        <div className="auth-illustration">
          <div className="book-symbol">📬</div>
          <h3>Reset Access</h3>
          <p>Enter your email to receive a reset link</p>
        </div>
        <div className="auth-form-container">
          <div className="auth-form">
            <div className="form-header">
              <h1>Forgot Password</h1>
              <p>We will first verify your registered email</p>
            </div>

            {errors.general && (
              <div className="error-text auth-message-error">{errors.general}</div>
            )}
            {status && <div className="auth-message-success">{status}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your registered email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email || errors.general) {
                      setErrors({ ...errors, email: "", general: "" });
                    }
                  }}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? "Checking..." : "Continue"}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Back to{" "}
                <Link to="/login" className="link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
