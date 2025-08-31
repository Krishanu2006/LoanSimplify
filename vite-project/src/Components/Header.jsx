import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import './Header.css';
import logoImg from "../assets/Logo.png"

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '#features' },
    { label: 'Pricing', path: '#pricing' },
    { label: 'Contact', path: '#contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Left: Logo */}
        <div className="header-left">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="LoanSimplify Logo" className="logo-icon" />
            <span className="logo-text">LoanSimplify</span>
          </div>

        </div>

        {/* Center: Navigation */}
        <div className="header-center">
          <nav className="desktop-nav">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="nav-link"
                onClick={(e) => {
                  if (item.path === '/') {
                    e.preventDefault();
                    navigate('/');
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Auth buttons */}
        <div className="header-right">
          <div className="desktop-auth">
            <button className="btn-ghost" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    </header>
  );
};

export default Header;