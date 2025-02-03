// src/components/FormStep.jsx
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

function FormStep({ onUpdate }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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

  return (
    <form className="wes3-form" onSubmit={handleSubmit}>
      {step === 1 && (
  <>
    <h2>Step 1: Basic Site Information</h2>
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

    <div className="form-group">
      <label htmlFor="coverageLevel">Coverage Level:</label>
      <select
        name="coverageLevel"
        id="coverageLevel"
        required
        value={formData.coverageLevel}
        onChange={handleChange}
        data-tooltip-id="tooltip-coverageLevel"
        data-tooltip-content="Select the desired coverage level: Good, Better, Best."
      >
        <option value="best">Best</option>
        <option value="better">Better</option>
        <option value="good">Good</option>
      </select>
      <Tooltip id="tooltip-coverageLevel" />
    </div>

    <button type="button" onClick={handleNext}>Next</button>
  </>
)}

      {step === 2 && (
        <>
          <h2>Step 2: System Requirements</h2>
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

          <button type="button" onClick={handlePrevious}>
            Previous
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </>
      )}

{step === 3 && (
  <>
    <h2 style={{ color: "#333" }}>Step 3: Review & Submit</h2>
    <p style={{ color: "#333" }}>Review your inputs before submitting:</p>
    <ul style={{ color: "#333", listStyleType: "none", padding: 0 }}>
      <li>Site Size: {formData.siteSize} sq. ft</li>
      <li>Floors: {formData.floors}</li>
      <li>Staircases: {formData.stairs}</li>
      <li>Construction Type: {formData.constructionType}</li>
      <li>Construction Phase: {formData.constructionPhase}</li>
      <li>Coverage Level: {formData.coverageLevel}</li>
      <li>Interface Integration: {formData.interfaceIntegration ? 'Yes' : 'No'}</li>
      {formData.interfaceIntegration && (
        <li>Interface Details: {formData.interfaceDetails}</li>
      )}
      <li>REACT Integration: {formData.reactIntegration ? 'Yes' : 'No'}</li>
    </ul>

    <button type="button" onClick={handlePrevious}>Previous</button>
    <button type="submit">Submit</button>
  </>
)}
    </form>
  );
}

export default FormStep;
