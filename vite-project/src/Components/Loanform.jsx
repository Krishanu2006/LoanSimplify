import React, { useState } from "react";
import "./Loanform.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LoanForm = ({ onSubmit }) => {
  const [loanType, setLoanType] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    aadhaar: "",
    loanAmount: "",
    interestRate: "",
    tenure: "",
    purpose: "",
    agree: false,
    photo: null,
    signature: null,
    // type-specific
    course: "",
    institute: "",
    duration: "",
    job: "",
    salary: "",
    propertyDetails: "",
    vehicleType: "",
    vehicleModel: "",
    businessName: "",
    businessPurpose: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // show preview for photo/signature
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (name === "photo") setPhotoPreview(ev.target.result);
        if (name === "signature") setSignaturePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the terms before signing.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
    <Header/>
    <div className="loan-form-wrapper">
      <form className="loan-form" onSubmit={handleSubmit}>
        <div className="loan-form__header">
          <h2 className="loan-form__title">Loan Application Form</h2>
          <p className="loan-form__subtitle">
            Choose your loan type and fill in the details below
          </p>
        </div>

        <div className="form-grid">
          {/* Loan Type */}
          <div className="form-row full">
            <label>Loan Type</label>
            <select
              name="loanType"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              required
            >
              <option value="">Select Loan Type</option>
              <option value="personal">Personal Loan</option>
              <option value="home">Home Loan</option>
              <option value="education">Education Loan</option>
              <option value="vehicle">Vehicle Loan</option>
              <option value="business">Business Loan</option>
              <option value="gold">Gold Loan</option>
              <option value="agriculture">Agriculture Loan</option>
              <option value="securities">Loan Against Securities</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="form-row">
            <label>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Contact</label>
            <input name="contact" value={formData.contact} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Aadhaar / PAN</label>
            <input name="aadhaar" value={formData.aadhaar} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Loan Amount</label>
            <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Interest Rate (%)</label>
            <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label>Loan Tenure (months)</label>
            <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />
          </div>

          <div className="form-row full">
            <label>Address</label>
            <input name="address" value={formData.address} onChange={handleChange} required />
          </div>

          {/* Uploads */}
          <div className="form-row full">
            <label>Upload Photo & Signature</label>
            <div className="upload-row">
              <div className="photo-preview">
                {photoPreview ? (
                  <img src={photoPreview} alt="Photo Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  "Photo"
                )}
              </div>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} required />

              <div className="photo-preview">
                {signaturePreview ? (
                  <img src={signaturePreview} alt="Signature Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  "Signature"
                )}
              </div>
              <input type="file" name="signature" accept="image/*" onChange={handleChange} required />
            </div>
          </div>

          {/* Loan-Type Specific Fields */}
          {loanType === "education" && (
            <>
              <div className="form-row">
                <label>Course Name</label>
                <input name="course" value={formData.course} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label>Institute Name</label>
                <input name="institute" value={formData.institute} onChange={handleChange} required />
              </div>
              <div className="form-row full">
                <label>Course Duration</label>
                <input name="duration" value={formData.duration} onChange={handleChange} required />
              </div>
            </>
          )}

          {loanType === "home" && (
            <>
              <div className="form-row">
                <label>Job Title</label>
                <input name="job" value={formData.job} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label>Monthly Salary</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
              </div>
              <div className="form-row full">
                <label>Property / Plot Details</label>
                <input name="propertyDetails" value={formData.propertyDetails} onChange={handleChange} required />
              </div>
            </>
          )}

          {loanType === "vehicle" && (
            <>
              <div className="form-row">
                <label>Vehicle Type</label>
                <input name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label>Vehicle Model</label>
                <input name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required />
              </div>
            </>
          )}

          {loanType === "business" && (
            <>
              <div className="form-row">
                <label>Business Name</label>
                <input name="businessName" value={formData.businessName} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label>Business Purpose</label>
                <input name="businessPurpose" value={formData.businessPurpose} onChange={handleChange} required />
              </div>
            </>
          )}

          {/* Purpose */}
          <div className="form-row full">
            <label>Purpose of Loan</label>
            <textarea name="purpose" value={formData.purpose} onChange={handleChange} required />
          </div>
        </div>

        {/* Terms */}
        <div className="terms-row">
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
          <label>I agree to the terms & conditions.</label>
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/uploaddocuments" className="btn btn-secondary">Proceed to E-Sign</Link>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default LoanForm;
