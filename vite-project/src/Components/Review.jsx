// Review.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Review.css";

const Review = () => {
  // Dummy uploaded docs data
  const uploadedDocs = [
    { id: 1, name: "Aadhar Card", status: "Pending", feedback: "" },
    { id: 2, name: "PAN Card", status: "Verified", feedback: "" },
    { id: 3, name: "Driving License", status: "Rejected", feedback: "Fraud detected" },
  ];

  // Status color mapping
  const statusColors = {
    Pending: "status-pending",
    Verified: "status-verified",
    Rejected: "status-rejected",
  };

  return (
    <div className="review-container">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="review-content">
        <h2>Document Review & Status</h2>
        <table>
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Status</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {uploadedDocs.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>
                  <span className={`status-badge ${statusColors[doc.status]}`}>
                    {doc.status}
                  </span>
                </td>
                <td>{doc.feedback || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Review;
