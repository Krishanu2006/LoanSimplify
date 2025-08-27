import React, { useState } from "react";
import { db } from "../lib/firebase";  // adjust path if different
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import "./Loanform.css"

const LoanForm = () => {
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
        createdAt: serverTimestamp()
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
        loanAmount: ""
      });

    } catch (error) {
      console.error("Error submitting loan application: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Submit Loan Application</button>
    </form>
  );
};

export default LoanForm;
