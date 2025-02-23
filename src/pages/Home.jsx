import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const parallaxRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    // Fade-in animation on mount
    if (contentRef.current) {
      contentRef.current.style.opacity = '1';
      contentRef.current.style.transform = 'translateY(0)';
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Parallax background */}
      <div className="parallax-background" ref={parallaxRef}>
        <div className="gradient-overlay"></div>
      </div>

      {/* Main content with glass morphism effect */}
      <div className="hero-section">
        <div className="content-wrapper" ref={contentRef}>
          {/* Logo section */}
          <div className="logo-container">
            <img src="/ramtech.png" alt="Ramtech Logo" className="company-logo" />
          </div>

          {/* Hero content */}
          <div className="hero-content glass-morphism">
            <h1 className="hero-title">
              WES3 Budget Tool
              <span className="title-accent">Fire Safety Estimation</span>
            </h1>
            
            <p className="hero-description">
              Get precise fire safety system recommendations tailored to your construction project's needs. 
              Professional estimates in minutes.
            </p>

            {/* Features grid */}
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <span>Accurate Calculations</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏗️</div>
                <span>Construction-Specific</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <span>Easy to Use</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📄</div>
                <span>PDF Reports</span>
              </div>
            </div>

            {/* CTA section */}
            <div className="cta-section">
              <Link to="/budget-tool" className="cta-button primary">
                Start Your Estimate
                <span className="button-arrow">→</span>
              </Link>
              <a href="#learn-more" className="cta-button secondary">
                Learn More
              </a>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="trust-indicators">
            <div className="certification-badge">
              <span>✓ Industry Certified</span>
            </div>
            <div className="certification-badge">
              <span>✓ Regulatory Compliant</span>
            </div>
            <div className="certification-badge">
              <span>✓ Expert Validated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
}

export default Home;
