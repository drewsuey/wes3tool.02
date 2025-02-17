import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="step-indicator">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar; 