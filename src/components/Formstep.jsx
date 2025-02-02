import React from 'react';

function FormStep({ onUpdate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      siteType: 'Commercial',
      siteSize: 10000,
      projectPhase: 'Mid-Construction',
    };
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Site Type:
        <select name="siteType">
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </select>
      </label>
      <label>
        Site Size (sq. ft):
        <input type="number" name="siteSize" />
      </label>
      <label>
        Project Phase:
        <select name="projectPhase">
          <option value="Early Planning">Early Planning</option>
          <option value="Mid-Construction">Mid-Construction</option>
          <option value="Finishing Phase">Finishing Phase</option>
        </select>
      </label>
      <button type="submit">Next</button>
    </form>
  );
}

export default FormStep;
