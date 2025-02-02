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
          data-tooltip-id="tooltip-floors"
          data-tooltip-content="Include all levels, including basements, that require coverage."
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
          data-tooltip-id="tooltip-stairs"
          data-tooltip-content="Enter the total number of staircases across all floors."
        />
        <Tooltip id="tooltip-stairs" />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input type="checkbox" name="interfaceIntegration" />
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
          <input type="checkbox" name="reactIntegration" />
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

      <button type="submit">Next</button>
    </form>
  );
}

export default FormStep;


