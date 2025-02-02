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
    <form onSubmit={handleSubmit}>
      <label>
        Site Size (sq. ft):
        <input
          type="number"
          name="siteSize"
          required
          data-tooltip-id="tooltip-siteSize"
          data-tooltip-content="Enter the total area of the site in square feet."
        />
        <Tooltip id="tooltip-siteSize" />
      </label>

      <label>
        Number of Floors:
        <input
          type="number"
          name="floors"
          required
          data-tooltip-id="tooltip-floors"
          data-tooltip-content="Include all levels, including basements, that require coverage."
        />
        <Tooltip id="tooltip-floors" />
      </label>

      <label>
        Number of Staircases:
        <input
          type="number"
          name="stairs"
          required
          data-tooltip-id="tooltip-stairs"
          data-tooltip-content="Enter the total number of staircases across all floors."
        />
        <Tooltip id="tooltip-stairs" />
      </label>

      <label>
        Interface Integration:
        <input type="checkbox" name="interfaceIntegration" />
        <span
          data-tooltip-id="tooltip-interface"
          data-tooltip-content="Check this box if you need the system to integrate with other fire panels or alarms."
        >
          ?
        </span>
        <Tooltip id="tooltip-interface" />
      </label>

      <label>
        REACT Integration:
        <input type="checkbox" name="reactIntegration" />
        <span
          data-tooltip-id="tooltip-react"
          data-tooltip-content="Enable REACT integration for remote monitoring and notifications."
        >
          ?
        </span>
        <Tooltip id="tooltip-react" />
      </label>

      <button type="submit">Next</button>
    </form>
  );
}

export default FormStep;

