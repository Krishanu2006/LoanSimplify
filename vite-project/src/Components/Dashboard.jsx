import React, { useState, useRef, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const dropdownRef = useRef();
  const chatRef = useRef();

  const handleProfileClick = () => setShowDropdown((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const toggleAI = () => setShowAI((prev) => !prev);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newChat = [...chat, { sender: 'user', text: userInput }];
    setChat(newChat);
    setUserInput('');

    try {
      // ✅ Call backend (instead of Groq directly)
      const res = await axios.post('http://localhost:5000/api/chat', {
        messages: newChat.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
      });

      // ✅ Extract AI reply safely
      const aiReply =
        res.data.choices?.[0]?.message?.content ||
        '⚠️ No response from AI.';

      // ✅ Format reply cleanly
      const formattedReply = aiReply
        .replace(/\n?\s*\u2022\s*/g, '\n\u2022 ')
        .replace(/::/g, '')
        .replace(/\u2022\s*\u2022/g, '\u2022')
        .replace(/\n{2,}/g, '\n\n')
        .trim();

      setChat([...newChat, { sender: 'ai', text: formattedReply }]);
    } catch (error) {
      console.error('Backend error:', error);
      setChat([
        ...newChat,
        { sender: 'ai', text: '❌ Something went wrong. Try again.' },
      ]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        !event.target.closest('.ai-toggle-button')
      ) {
        setShowAI(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container">
      <Header />

      <main className="dashboard-main">
        <h2>Welcome to the Student Dashboard!</h2>
        <p>
          Manage your financial documents, apply for loans, and receive
          assistance from our AI advisor.
        </p>

        <Link to="/documentationsection" className="dashboard-card">
          <h3>Document Upload</h3>
          <p>
            Securely upload financial documents for verification or loan
            applications.
          </p>
        </Link>

        <Link to="/review" className="dashboard-card">
          <h3>Loan Application Status</h3>
          <p>Track the progress of your loan requests and approvals here.</p>
        </Link>
      </main>

      {/* Floating AI Toggle Button */}
      <div
        className="ai-toggle-button"
        onClick={toggleAI}
        title="AI Financial Assistant"
      >
        🤖
      </div>

      {/* Chat Window */}
      {showAI && (
        <div className="ai-assistant-window" ref={chatRef}>
          <h4>Finance Assistant</h4>
          <div className="chat-messages">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === 'user' ? 'user-msg' : 'ai-msg'}
              >
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about loans, EMI, or finance tips..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
