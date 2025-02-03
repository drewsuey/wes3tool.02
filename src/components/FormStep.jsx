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
            />
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
            />
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="constructionType">Type of Construction:</label>
            <select
              name="constructionType"
              id="constructionType"
              required
              value={formData.constructionType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="marine">Marine</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="constructionPhase">Phase of Construction:</label>
            <select
              name="constructionPhase"
              id="constructionPhase"
              required
              value={formData.constructionPhase}
              onChange={handleChange}
            >
              <option value="">Select Phase</option>
              <option value="early">Early Planning</option>
              <option value="mid">Mid-Construction</option>
              <option value="finishing">Finishing Phase</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="coverageLevel">Coverage Level:</label>
            <select
               name="coverageLevel"
               id="coverageLevel"
               required
               data-tooltip-id="tooltip-coverage"
               data-tooltip-content="Select the desired coverage level: Good, Better, Best."
           >
            <option value="best">Best</option>
            <option value="better">Better</option>
            <option value="good">Good</option>
            </select>
             <Tooltip id="tooltip-coverage" />
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
            </label>
          </div>

          {formData.interfaceIntegration && (
            <div className="form-group">
              <label htmlFor="interfaceDetails">Describe Your Implementation Idea:</label>
              <textarea
                name="interfaceDetails"
                id="interfaceDetails"
                rows="3"
                value={formData.interfaceDetails}
                onChange={handleChange}
                placeholder="Describe how you plan to integrate the interface unit"
              ></textarea>
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
            </label>
          </div>

          <button type="button" onClick={handlePrevious}>Previous</button>
          <button type="button" onClick={handleNext}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Step 3: Review & Submit</h2>
          <p>Review your inputs before submitting:</p>
          <ul>
            <li>Site Size: {formData.siteSize} sq. ft</li>
            <li>Floors: {formData.floors}</li>
            <li>Staircases: {formData.stairs}</li>
            <li>Construction Type: {formData.constructionType}</li>
            <li>Construction Phase: {formData.constructionPhase}</li>
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
