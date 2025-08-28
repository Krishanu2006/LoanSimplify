import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UploadDocuments.css";
import Header from "./Header";
import Footer from "./Footer";

const mockAadhaarDB = {
  "123412341234": {
    name: "Shayan Ghosh",
    dob: "2006-03-04",
    gender: "Male",
    address: "Salt Lake, Kolkata",
  },
  "987654321098": {
    name: "Anjali Verma",
    dob: "1988-03-09",
    gender: "Female",
    address: "456, Park Street, Mumbai",
  },
};

const UploadDocuments = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const navigate = useNavigate();

  // OTP generator for testing
  const sendOtp = () => {
    if (!mockAadhaarDB[aadhaar]) {
      setError("Aadhaar not found in mock database");
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setError("");
    alert(`Simulated OTP sent: ${otp}`); // just for testing
  };

  // Verify OTP and auto-fill address
  const verifyOtp = () => {
    if (otpInput === generatedOtp) {
      const data = mockAadhaarDB[aadhaar];
      setUserData(data);
      setAddress(data.address); // auto-fill address
      setVerified(true);
      setError("");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (!verified) {
      setError("Please verify Aadhaar first.");
      return;
    }
    if (!phone) {
      setError("Please enter phone number.");
      return;
    }

    // Navigate to ESign with applicant data
    navigate("/esign", {
      state: {
        name: userData.name,
        aadhaar: aadhaar,
        dob: userData.dob,
        gender: userData.gender,
        address: address,
        phone: phone,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="form-title">Upload Documents (with KYC)</div>

        {/* Aadhaar KYC Section */}
        <div className="input-group">
          <label>Aadhaar Number</label>
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            className="input-field"
            required
          />
          <button type="button" onClick={sendOtp} className="btn">
            Send OTP
          </button>
        </div>

        {otpSent && !verified && (
          <div className="input-group">
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="input-field"
            />
            <button type="button" onClick={verifyOtp} className="btn">
              Verify OTP
            </button>
          </div>
        )}

        {verified && userData && (
          <div className="kyc-details">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>DOB:</strong> {userData.dob}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
          </div>
        )}

        {/* Upload Form Section */}
        <div className="input-group">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label>Phone No.</label>
          <input
            type="number"
            placeholder="Phone No"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="buttons">
          <Link to="/dashboard" className="btn secondary">Back</Link>
          <button onClick={handleSubmit} className="btn primary">
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadDocuments;