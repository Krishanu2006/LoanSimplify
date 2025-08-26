import React from "react";
import GoogleImg from "../assets/Google.webp";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      {/* Header */}
      <Header />

      {/* Login Container */}
      <div className="login-container">
        <div className="form-title">Log in with</div>

        {/* Google Login */}
        <button className="social-login">
          <img src={GoogleImg} alt="Google" className="social-icon" />
          Google
        </button>

        <p className="separator"><span>or</span></p>

        {/* Login Form */}
        <form action="#" className="login-form">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              required
            />
            <i className="material-symbols-rounded">mail</i>
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              required
            />
            <i className="material-symbols-rounded">lock</i>
          </div>

          <Link to="/forgotpassword" className="forgot-pass-link">
            Forgot Password?
          </Link>

          <Link to="/dashboard" className="login-button">
            Login
          </Link>
        </form>

        {/* Signup Suggestion */}
        <p className="signup-text">
          Don&apos;t have an account? <Link to="/signup">Signup Now</Link>
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
