import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/First.css'; // Updated CSS import path
import Img from '../images/index.jpg';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="app">
      {/* Hero Section with Background Image */}
      <header className="hero">
        <div className="hero-content">
          <h1>Farm Equipment Rental System</h1>
          <p>Rent high-quality farming equipment at affordable rates</p>
          
          {/* Auth Buttons */}
          <div className="auth-buttons">
            <button className="btn login-btn" onClick={handleLoginClick}>
              Login
            </button>
            <button className="btn signup-btn" onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2>About Our Service</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Our Farm Equipment Rental System connects farmers with high-quality 
                agricultural machinery for short-term or long-term rental. 
                We provide a platform where equipment owners can list their 
                machinery and farmers can find the tools they need at affordable rates.
              </p>
              <p>
                Whether you need a tractor for a day or a combine harvester for the season, 
                we've got you covered. Our system ensures transparency, reliability, 
                and convenience for all parties involved.
              </p>
            </div>
            <div className="about-image">
              <img src={Img} alt="Farm equipment" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Our Platform</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚜</div>
              <h3>Wide Range of Equipment</h3>
              <p>From tractors to harvesters, we have all types of farm machinery available for rent.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable Rates</h3>
              <p>Pay only for the time you use the equipment with no hidden charges.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Verified Owners</h3>
              <p>All equipment owners are verified to ensure quality and reliability.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Booking</h3>
              <p>Simple online booking process with real-time availability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>Farm Equipment Rental</h3>
              <p>Connecting farmers with the tools they need</p>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/equipment">Equipment</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Email: info@farmrental.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Farm Equipment Rental System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;