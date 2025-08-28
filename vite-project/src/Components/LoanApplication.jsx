import React, { useState } from 'react';
import { 
  Percent, 
  Home, 
  GraduationCap, 
  Car, 
  Gem, 
  Tractor, 
  Briefcase 
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import LoanTypeCard from './LoanTypeCard';
import './LoanApplication.css';

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('50000');

  const loanTypes = [
    { type: 'personal', label: 'Personal Loan', icon: Percent },
    { type: 'home', label: 'Home Loan', icon: Home },
    { type: 'education', label: 'Education Loan', icon: GraduationCap },
    { type: 'auto', label: 'Auto Loan', icon: Car },
    { type: 'gold', label: 'Gold Loan', icon: Gem },
    { type: 'agriculture', label: 'Agriculture Loan', icon: Tractor },
    { type: 'business', label: 'Business Loan', icon: Briefcase },
  ];

  return (
    <div className="loan-application">
      <div className="loan-container">
        {/* Header */}
        <div className="loan-header">
          <h1>Loan Application</h1>
          <p>Complete the form below to apply for a loan. It only takes a few minutes.</p>
        </div>

        {/* Progress */}
        <ProgressBar currentStep={currentStep} totalSteps={4} />

        {/* Form Content */}
        <div className="loan-form">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="step step-1">
              <div className="loan-type-selection">
                <h3>Select Loan Type</h3>
                <div className="loan-types-grid">
                  {loanTypes.map((loan) => (
                    <LoanTypeCard
                      key={loan.type}
                      type={loan.type}
                      label={loan.label}
                      icon={loan.icon}
                      selected={selectedLoanType === loan.type}
                      onClick={() => setSelectedLoanType(loan.type)}
                    />
                  ))}
                </div>
              </div>

              <div className="loan-amount">
                <label htmlFor="loanAmount">Loan Amount</label>
                <div className="input-wrapper">
                  <span className="currency">₹</span>
                  <input
                    id="loanAmount"
                    type="text"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="step-navigation">
                <div></div>
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedLoanType || !loanAmount}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for other steps */}
          {currentStep > 1 && (
            <div className="step step-next">
              <h3>Step {currentStep} - Coming Soon</h3>
              <p>This step will contain additional form fields for completing your loan application.</p>
              <div className="step-navigation">
                <button onClick={() => setCurrentStep(currentStep - 1)}>Previous Step</button>
                {currentStep < 4 && (
                  <button onClick={() => setCurrentStep(currentStep + 1)}>Next Step</button>
                )}
                {currentStep === 4 && <button>Submit Application</button>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
