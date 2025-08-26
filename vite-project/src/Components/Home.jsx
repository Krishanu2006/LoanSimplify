import React from "react";
import { useNavigate } from "react-router-dom";
import signImg from "../assets/LoanSimplify.png";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">
              Instant<br />
              Aadhaar-Based<br />
              Document<br />
              Verification
            </h2>
            <div className="cta-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={signImg} alt="Document Verification" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
