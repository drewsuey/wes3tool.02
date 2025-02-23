import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <section className="hero-section">
      {/* Background Overlay */}
      <div className="background-overlay" />

      {/* Content Container */}
      <div className="content-container">
        {/* Floating Badge */}
        <div className="floating-badge fade-in" style={{ animationDelay: '0.2s' }}>
          <span>Fire Safety Planning Made Simple</span>
        </div>

        {/* Main Title */}
        <h1 className="main-title fade-up" style={{ animationDelay: '0.4s' }}>
          Welcome to the <span className="title-accent">WES3</span> Budget Tool
        </h1>

        {/* Subtitle */}
        <p className="subtitle fade-up" style={{ animationDelay: '0.6s' }}>
          Get tailored recommendations for your fire safety system in seconds
        </p>

        {/* CTA Buttons */}
        <div className="cta-container fade-up" style={{ animationDelay: '0.8s' }}>
          <Link 
            to="/budget-tool" 
            className="cta-button primary"
          >
            Get Started
          </Link>
          <a 
            href="https://ramtechglobal.com/wes-na/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-button secondary"
          >
            Visit WES-NA
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
