import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/First.css';
import Img from '../images/index.jpg';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/signup');

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Farm Equipment Rental System</h1>
          <p>Rent high-quality farming equipment at affordable rates</p>
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
                Our Farm Equipment Rental System connects farmers with
                high-quality agricultural machinery for short-term or
                long-term rental. Equipment owners can list their
                machinery, and farmers can easily find what they need.
              </p>
              <p>
                Whether you need a tractor for a day or a harvester for
                a season, our platform ensures transparency, reliability,
                and convenience for all users.
              </p>
            </div>
            <div className="about-image">
              <img src={Img} alt="Farm equipment in field" />
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
              <div className="feature-icon" role="img" aria-label="Tractor">🚜</div>
              <h3>Wide Range of Equipment</h3>
              <p>From tractors to harvesters — everything you need for your farm.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" role="img" aria-label="Money bag">💰</div>
              <h3>Affordable Rates</h3>
              <p>Pay only for what you use — no hidden fees or extra charges.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" role="img" aria-label="Shield">🛡️</div>
              <h3>Verified Owners</h3>
              <p>All equipment owners are verified to ensure trust and quality.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" role="img" aria-label="Mobile phone">📱</div>
              <h3>Easy Booking</h3>
              <p>Simple online booking process with real-time availability tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <h3>Farm Equipment Rental</h3>
            <p>Connecting farmers with the tools they need</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/equipment">Equipment</Link></li>
              <li><Link to="/contact">Contact</Link></li>
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
      </footer>
    </div>
  );
};

export default IndexPage;
