import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoanForm from "./Loanform"; // Import LoanForm
import './DocumentationSection.css'

const loanInfo = {
    vehicle: {
        title: "Vehicle Loan",
        description: "Finance your new or used vehicle with flexible repayment options and competitive interest rates.",
        details: [
            "Loan amount: up to 100% of on-road price",
            "Tenure: 12–84 months depending on lender",
            "Collateral: Vehicle hypothecation until loan closure",
            "Applicable for cars, two-wheelers, and commercial vehicles",
        ],
    },
    business: {
        title: "Business Loan",
        description: "Get funds to start, expand, or manage your business operations with minimal documentation.",
        details: [
            "Loan amount: varies with business turnover and collateral",
            "Tenure: 12–96 months",
            "Collateral: Optional, based on loan size",
            "Purpose: Expansion, working capital, machinery purchase",
        ],
    },
    personal: {
        title: "Personal Loan",
        description: "Meet personal financial needs like emergencies, travel, or debt consolidation.",
        details: [
            "Loan amount: depends on income & credit score",
            "Tenure: 12–60 months",
            "Collateral: Usually unsecured",
            "Minimal documentation required",
        ],
    },
    // add other loan types similarly...
    education: { 
        title: "Education Loan", 
        description: "Finance your higher studies in India or abroad with easy EMI options.", 
        details: [ 
            "Loan amount: depends on course and institute fees", 
            "Tenure: course duration + grace period", 
            "Collateral: Required for higher amounts", 
            "Covers tuition, hostel, and other related expenses",
        ], 
    }, 
    home: { 
        title: "Home Loan", 
        description: "Buy or renovate your home with long-term repayment options.", 
        details: [ 
            "Loan amount: based on property value and LTV ratio", 
            "Tenure: 5–30 years", 
            "Collateral: Property hypothecation", 
            "Interest rates vary as per lender & tenure", 
        ], 
    }, 
    gold: { 
        title: "Gold Loan", 
        description: "Get instant cash by pledging your gold jewelry, coins, or bars.", 
        details: [ 
            "Loan amount: % of gold market value", 
            "Tenure: 3–36 months", 
            "Collateral: Gold", 
            "Quick approval with minimal documents", 
        ], 
    }, 
    agri: { 
        title: "Agricultural Loan", 
        description: "Support for farmers, crop cultivation, livestock, or farm equipment.", 
        details: [ 
            "Loan amount: depends on crop/livestock/farm assets", 
            "Tenure: aligned with crop cycles", 
            "Collateral: Optional or farm property", 
            "Priority-sector lending schemes may apply", 
        ], 
    },
};

const DocumentationSection = () => {
    const [loanType, setLoanType] = useState("");

    const info = loanInfo[loanType];

    return (
        <>
            <Header />

            <section className="loan-description">
                <h2>Choose a Loan Type</h2>
                <select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                >
                    <option value="">-- Select Loan Type --</option>
                    {Object.keys(loanInfo).map((key) => (
                        <option key={key} value={key}>
                            {loanInfo[key].title}
                        </option>
                    ))}
                </select>

                {info && (
                    <>
                        <h3>{info.title}</h3>
                        <p>{info.description}</p>
                        <ul>
                            {info.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </>
                )}
            </section>

            {/* LoanForm shown below Documentation */}
            {loanType && <LoanForm selectedLoanType={loanType} />}

            <Footer />
        </>
    )
}

export default DocumentationSection;
