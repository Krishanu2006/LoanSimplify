import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-page">
      {/* Header */}
      <Header />

      {/* Signup Container */}
      <div className="signup-container">
        <h2 className="signup-title">Create Account</h2>
        <form className="signup-form">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <Link to="/dashboard" className="signup-button">
            Sign Up
          </Link>

          <p className="login-link">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Signup;
