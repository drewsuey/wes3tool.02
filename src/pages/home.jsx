import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the WES3 Budget Tool</h1>
      <p>Get tailored recommendations for your fire safety system in seconds.</p>
      <Link to="/budget-tool">
        <button className="start-button">Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
