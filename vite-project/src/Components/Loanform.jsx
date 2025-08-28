import React, { useState } from "react";
import { db } from "../lib/firebase";  // adjust path if needed
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import "./Loanform.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const LoanForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    employmentStatus: "",
    income: "",
    loanType: "",
    loanAmount: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reference to aadhaarUsers/{aadhaarNumber}/loanApplications
      const userRef = doc(db, "aadhaarUsers", formData.aadhaarNumber);
      const loanApplicationsRef = collection(userRef, "loanApplications");

      await addDoc(loanApplicationsRef, {
        ...formData,
        status: "pending",   // default status
        createdAt: serverTimestamp(),
      });

      alert("Loan application submitted successfully!");

      setFormData({
        aadhaarNumber: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        employmentStatus: "",
        income: "",
        loanType: "",
        loanAmount: "",
      });

      // redirect to document upload page
      navigate("/UploadDocuments");

    } catch (error) {
      console.error("Error submitting loan application: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="loan-form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="loan-form-heading">Loan Application Form</h2>
          <input
            type="text"
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="employmentStatus"
            placeholder="Employment Status"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="income"
            placeholder="Income"
            value={formData.income}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="loanType"
            placeholder="Loan Type"
            value={formData.loanType}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />

          {/* ✅ Use button instead of Link */}
          <button type="submit" className="submit">
            Submit Loan Application
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoanForm;
