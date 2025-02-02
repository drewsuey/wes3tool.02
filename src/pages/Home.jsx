/* Home.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import '../App'; // or wherever your CSS lives

function Home() {
  return (
    <div className="hero-section">
      <div className="overlay"></div> 
      {/* This overlay is a semi-transparent layer over the background image */}
      <div className="hero-content">
        <h1>Welcome to the WES3 Budget Tool</h1>
        <p>Get tailored recommendations for your fire safety system in seconds</p>
        <Link to="/budget-tool" className="hero-button">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;

