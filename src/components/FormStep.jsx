// src/components/FormStep.jsx
import React from 'react';

function FormStep({ onUpdate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newData = {
      siteType: formData.get('siteType'),
      siteSize: formData.get('siteSize'),
      projectPhase: formData.get('projectPhase'),
      floors: formData.get('floors'),
      stairs: formData.get('stairs'),
      interfaceIntegration: formData.get('interfaceIntegration') === 'on',
      reactIntegration: formData.get('reactIntegration') === 'on',
    };

    onUpdate && onUpdate(newData);
  };

  return (
    <form onSubmit={handleSubmit} className="wes3-form">
      <label>
        Site Type:
        <select name="siteType" defaultValue="Commercial">
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </select>
      </label>

      <label>
        Site Size (sq. ft):
        <input type="number" name="siteSize" defaultValue={50000} />
      </label>

      <label>
        Project Phase:
        <select name="projectPhase" defaultValue="Early Planning">
          <option value="Early Planning">Early Planning</option>
          <option value="Mid-Construction">Mid-Construction</option>
          <option value="Finishing Phase">Finishing Phase</option>
        </select>
      </label>

      <label>
        Number of Floors:
        <input type="number" name="floors" defaultValue={1} />
      </label>

      <label>
        Number of Staircases:
        <input type="number" name="stairs" defaultValue={1} />
      </label>

      <label>
        <input type="checkbox" name="interfaceIntegration" />
        Interface Unit (Allows integration with external systems)
      </label>

      <label>
        <input type="checkbox" name="reactIntegration" />
        REACT (Enables remote notifications and alerts)
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormStep;
