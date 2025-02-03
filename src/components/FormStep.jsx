// src/components/FormStep.jsx
import React from 'react';
import { Tooltip } from 'react-tooltip';

function FormStep({ onUpdate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      siteSize: formData.get('siteSize'),
      floors: formData.get('floors'),
      stairs: formData.get('stairs'),
      constructionType: formData.get('constructionType'),
      constructionPhase: formData.get('constructionPhase'),
      interfaceIntegration: formData.get('interfaceIntegration') === 'on',
      reactIntegration: formData.get('reactIntegration') === 'on',
    };
    onUpdate(newData);
  };

  return (
    <form className="wes3-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="siteSize">Site Size (sq. ft):</label>
        <input
          type="number"
          name="siteSize"
          id="siteSize"
          required
          aria-label="Site Size"
          aria-describedby="siteSizeDesc"
          data-tooltip-id="tooltip-siteSize"
          data-tooltip-content="Enter the total area of the site in square feet."
        />
        <small id="siteSizeDesc" className="visually-hidden">
          Enter the total area of the site in square feet.
        </small>
        <Tooltip id="tooltip-siteSize" />
      </div>

      <div className="form-group">
        <label htmlFor="floors">Number of Floors:</label>
        <input
          type="number"
          name="floors"
          id="floors"
          required
          aria-label="Number of Floors"
          aria-describedby="floorsDesc"
          data-tooltip-id="tooltip-floors"
          data-tooltip-content="Include all levels, including basements, that require coverage."
        />
        <small id="floorsDesc" className="visually-hidden">
          Include all levels, including basements, that require coverage.
        </small>
        <Tooltip id="tooltip-floors" />
      </div>

      <div className="form-group">
        <label htmlFor="stairs">Number of Staircases:</label>
        <input
          type="number"
          name="stairs"
          id="stairs"
          required
          aria-label="Number of Staircases"
          aria-describedby="stairsDesc"
          data-tooltip-id="tooltip-stairs"
          data-tooltip-content="Enter the total number of staircases across all floors."
        />
        <small id="stairsDesc" className="visually-hidden">
          Enter the total number of staircases across all floors.
        </small>
        <Tooltip id="tooltip-stairs" />
      </div>

      <div className="form-group">
        <label htmlFor="constructionType">Type of Construction:</label>
        <select
          name="constructionType"
          id="constructionType"
          required
          aria-label="Type of Construction"
          aria-describedby="constructionTypeDesc"
        >
          <option value="">Select Type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
          <option value="marine">Marine</option>
        </select>
        <small id="constructionTypeDesc" className="visually-hidden">
          Select the type of construction site.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="constructionPhase">Phase of Construction:</label>
        <select
          name="constructionPhase"
          id="constructionPhase"
          required
          aria-label="Phase of Construction"
          aria-describedby="constructionPhaseDesc"
        >
          <option value="">Select Phase</option>
          <option value="early">Early Planning</option>
          <option value="mid">Mid-Construction</option>
          <option value="finishing">Finishing Phase</option>
        </select>
        <small id="constructionPhaseDesc" className="visually-hidden">
          Select the phase of construction the site is in.
        </small>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="interfaceIntegration"
            aria-label="Interface Integration"
          />
          Interface Integration
        </label>
        <span
          data-tooltip-id="tooltip-interface"
          data-tooltip-content="Check this box if you need the system to integrate with other fire panels or alarms."
        >
          ?
        </span>
        <Tooltip id="tooltip-interface" />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="reactIntegration"
            aria-label="REACT Integration"
          />
          REACT Integration
        </label>
        <span
          data-tooltip-id="tooltip-react"
          data-tooltip-content="Enable REACT integration for remote monitoring and notifications."
        >
          ?
        </span>
        <Tooltip id="tooltip-react" />
      </div>

      <button type="submit" aria-label="Next Button">
        Next
      </button>
    </form>
  );
}

export default FormStep;
