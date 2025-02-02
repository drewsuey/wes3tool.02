// src/components/FormStep.jsx
import React from 'react';
import ReactTooltip from 'react-tooltip';

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
          data-tip="Enter the total area of the site in square feet."
        />
      </label>
      <ReactTooltip />

      <label>
        Number of Floors:
        <input
          type="number"
          name="floors"
          required
          data-tip="Include all levels, including basements, that require coverage."
        />
      </label>
      <ReactTooltip />

      <label>
        Number of Staircases:
        <input
          type="number"
          name="stairs"
          required
          data-tip="Enter the total number of staircases across all floors."
        />
      </label>
      <ReactTooltip />

      <label>
        Interface Integration:
        <input type="checkbox" name="interfaceIntegration" />
        <span data-tip="Check this box if you need the system to integrate with other fire panels or alarms.">?</span>
      </label>
      <ReactTooltip />

      <label>
        REACT Integration:
        <input type="checkbox" name="reactIntegration" />
        <span data-tip="Enable REACT integration for remote monitoring and notifications.">?</span>
      </label>
      <ReactTooltip />

      <button type="submit">Next</button>
    </form>
  );
}

export default FormStep;
