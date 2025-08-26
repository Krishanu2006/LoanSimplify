import React, { useState } from 'react';
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Replace this with actual API call to send reset email
    if (email) {
      setMessage(`If an account exists for ${email}, a reset link has been sent.`);
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive password reset instructions.</p>
      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;