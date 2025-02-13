// src/components/FormStep.jsx
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './FormStep.css';

function FormStep({ onUpdate }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    siteSize: '',
    floors: '',
    stairs: '',
    constructionType: '',
    constructionPhase: '',
    coverageLevel: 'best',
    interfaceIntegration: false,
    interfaceDetails: '',
    reactIntegration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const renderProgressBar = () => {
    const progress = (step / totalSteps) * 100;
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="steps-indicator">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`step-dot ${i + 1 <= step ? 'active' : ''}`}
              data-tooltip-id={`step-${i + 1}`}
              data-tooltip-content={`Step ${i + 1}`}
            />
          ))}
        </div>
        <div className="step-text">Step {step} of {totalSteps}</div>
      </div>
    );
  };

  return (
    <form className="wes3-form" onSubmit={handleSubmit}>
      {renderProgressBar()}
      
      {step === 1 && (
        <>
          <h2>Step 1: Contact Information</h2>
          <div className="form-group">
            <label htmlFor="name">Name:*</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name:*</label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:*</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@company.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone: (Optional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your contact number"
            />
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Step 2: Basic Site Information</h2>
          <div className="form-group">
            <label htmlFor="siteSize">Site Size (sq. ft):</label>
            <input
              type="number"
              name="siteSize"
              id="siteSize"
              required
              value={formData.siteSize}
              onChange={handleChange}
              data-tooltip-id="tooltip-siteSize"
              data-tooltip-content="Enter the total area of the site in square feet."
            />
            <Tooltip id="tooltip-siteSize" />
          </div>

          <div className="form-group">
            <label htmlFor="floors">Number of Floors:</label>
            <input
              type="number"
              name="floors"
              id="floors"
              required
              value={formData.floors}
              onChange={handleChange}
              data-tooltip-id="tooltip-floors"
              data-tooltip-content="Enter the number of floors, including basements."
            />
            <Tooltip id="tooltip-floors" />
          </div>

          <div className="form-group">
            <label htmlFor="stairs">Number of Staircases:</label>
            <input
              type="number"
              name="stairs"
              id="stairs"
              required
              value={formData.stairs}
              onChange={handleChange}
              data-tooltip-id="tooltip-stairs"
              data-tooltip-content="Provide the total number of staircases in the building."
            />
            <Tooltip id="tooltip-stairs" />
          </div>

          <div className="form-group">
            <label htmlFor="constructionType">Type of Construction:</label>
            <select
              name="constructionType"
              id="constructionType"
              required
              value={formData.constructionType}
              onChange={handleChange}
              data-tooltip-id="tooltip-constructionType"
              data-tooltip-content="Select the type of construction: Residential, Commercial, Industrial, or Marine."
            >
              <option value="">Select Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="marine">Marine</option>
            </select>
            <Tooltip id="tooltip-constructionType" />
          </div>

          <div className="form-group">
            <label htmlFor="constructionPhase">Phase of Construction:</label>
            <select
              name="constructionPhase"
              id="constructionPhase"
              required
              value={formData.constructionPhase}
              onChange={handleChange}
              data-tooltip-id="tooltip-constructionPhase"
              data-tooltip-content="Choose the phase of construction: Early Planning, Mid-Construction, or Finishing Phase."
            >
              <option value="">Select Phase</option>
              <option value="early">Early Planning</option>
              <option value="mid">Mid-Construction</option>
              <option value="finishing">Finishing Phase</option>
            </select>
            <Tooltip id="tooltip-constructionPhase" />
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Step 3: System Requirements</h2>
          <div className="highlight-section">
            <div className="highlight-card">
              <h3>Interface Device</h3>
              <ul>
                <li>Seamless integration with fire panels</li>
                <li>Supports multiple device types</li>
                <li>Flexible configuration options</li>
              </ul>
            </div>
            <div className="highlight-card">
              <h3>REACT Digital App</h3>
              <ul>
                <li>Real-time monitoring and notifications</li>
                <li>Cloud-based access for remote control</li>
                <li>Enhances site safety with instant alerts</li>
              </ul>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="interfaceIntegration"
                checked={formData.interfaceIntegration}
                onChange={handleChange}
              />
              Interface Integration
              <span
                data-tooltip-id="tooltip-interfaceIntegration"
                data-tooltip-content="Enable this if you want to integrate with other fire panels or alarm systems."
              >
                ?
              </span>
            </label>
            <Tooltip id="tooltip-interfaceIntegration" />
          </div>

          {formData.interfaceIntegration && (
            <div className="form-group">
              <label htmlFor="interfaceDetails">
                Describe Your Implementation Idea:
                <span
                  data-tooltip-id="tooltip-interfaceDetails"
                  data-tooltip-content="Provide details about how you plan to use the interface device."
                >
                  ?
                </span>
              </label>
              <textarea
                name="interfaceDetails"
                id="interfaceDetails"
                rows="3"
                value={formData.interfaceDetails}
                onChange={handleChange}
                placeholder="Describe how you plan to integrate the interface unit"
              ></textarea>
              <Tooltip id="tooltip-interfaceDetails" />
            </div>
          )}

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="reactIntegration"
                checked={formData.reactIntegration}
                onChange={handleChange}
              />
              REACT Integration
              <span
                data-tooltip-id="tooltip-reactIntegration"
                data-tooltip-content="Enable REACT integration for remote monitoring and notifications."
              >
                ?
              </span>
            </label>
            <Tooltip id="tooltip-reactIntegration" />
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2>Step 4: Review & Submit</h2>
          <p style={{ color: "#333" }}>Review your inputs before submitting:</p>
          
          <div className="review-section">
            <h3>Contact Information</h3>
            <ul style={{ color: "#333", listStyleType: "none", padding: 0 }}>
              <li>Name: {formData.name}</li>
              <li>Company: {formData.companyName}</li>
              <li>Email: {formData.email}</li>
              {formData.phone && <li>Phone: {formData.phone}</li>}
            </ul>

            <h3>Site Details</h3>
            <ul style={{ color: "#333", listStyleType: "none", padding: 0 }}>
              <li>Site Size: {formData.siteSize} sq. ft</li>
              <li>Floors: {formData.floors}</li>
              <li>Staircases: {formData.stairs}</li>
              <li>Construction Type: {formData.constructionType}</li>
              <li>Construction Phase: {formData.constructionPhase}</li>
            </ul>

            <h3>System Requirements</h3>
            <ul style={{ color: "#333", listStyleType: "none", padding: 0 }}>
              <li>Interface Integration: {formData.interfaceIntegration ? 'Yes' : 'No'}</li>
              {formData.interfaceIntegration && (
                <li>Interface Details: {formData.interfaceDetails}</li>
              )}
              <li>REACT Integration: {formData.reactIntegration ? 'Yes' : 'No'}</li>
            </ul>
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
            >
              ← Previous
            </button>
            <button type="submit" className="nav-button submit-button">
              Calculate Estimate
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default FormStep;
