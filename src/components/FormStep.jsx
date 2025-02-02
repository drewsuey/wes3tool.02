// src/components/FormStep.jsx
import React from 'react';

function FormStep({ onUpdate }) {
  // 1) Define handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      siteType: formData.get('siteType'),
      siteSize: formData.get('siteSize'),
      projectPhase: formData.get('projectPhase'),
      floors: formData.get('floors'), // new field
      stairs: formData.get('stairs'), // new field
    };
    // 2) Send data up to parent
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

      {/* New fields for floors/stairs */}
      <label>
        Number of Floors:
        <input type="number" name="floors" defaultValue={1} />
      </label>

      <label>
        Number of Staircases:
        <input type="number" name="stairs" defaultValue={1} />
      </label>

      <button type="submit">Next</button>
    </form>
  );
}

export default FormStep;
