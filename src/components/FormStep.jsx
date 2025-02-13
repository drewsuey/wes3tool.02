// src/components/FormStep.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import './FormStep.css';

// Separate constant data
const CONSTRUCTION_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'marine', label: 'Marine' }
];

const CONSTRUCTION_PHASES = [
  { value: 'early', label: 'Early Planning' },
  { value: 'mid', label: 'Mid-Construction' },
  { value: 'finishing', label: 'Finishing Phase' }
];

const COVERAGE_LEVELS = [
  { 
    value: 'max',
    label: 'Maximum Coverage',
    features: [
      '100% standard spacing',
      'Optimal detector placement',
      'Best for high-risk areas',
      'Fastest response time'
    ]
  },
  {
    value: 'medium',
    label: 'Medium Coverage',
    features: [
      '125% increased spacing',
      'Balanced coverage',
      'Suitable for most areas',
      'Cost-effective solution'
    ]
  },
  {
    value: 'low',
    label: 'Low Coverage',
    features: [
      '150% increased spacing',
      'Basic coverage',
      'For low-risk areas',
      'Most economical option'
    ]
  }
];

const INITIAL_FORM_DATA = {
  name: '',
  companyName: '',
  email: '',
  phone: '',
  siteSize: '',
  floors: '',
  stairs: '',
  constructionType: '',
  constructionPhase: '',
  coverageLevel: 'max',
  interfaceIntegration: false,
  interfaceDetails: '',
  reactIntegration: false,
};

// Add validation messages
const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  number: 'Please enter a valid number',
  min: 'Value must be greater than 0'
};

function FormStep({ onUpdate }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : VALIDATION_MESSAGES.email;
      case 'phone':
        return value ? /^[\d\s-+()]*$/.test(value) ? '' : VALIDATION_MESSAGES.phone : '';
      case 'siteSize':
      case 'floors':
      case 'stairs':
        const num = Number(value);
        return !value ? VALIDATION_MESSAGES.required :
               isNaN(num) ? VALIDATION_MESSAGES.number :
               num <= 0 ? VALIDATION_MESSAGES.min : '';
      default:
        return value ? '' : VALIDATION_MESSAGES.required;
    }
  }, []);

  // Handle blur event for validation
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  }, [validateField]);

  // Enhanced change handler
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }, []);

  // Validate current step
  const validateStep = useCallback(() => {
    const fieldsToValidate = {
      1: ['name', 'companyName', 'email'],
      2: ['siteSize', 'floors', 'stairs', 'constructionType', 'constructionPhase'],
      3: [], // Optional fields
      4: []  // Review step
    }[step];

    const stepErrors = {};
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) stepErrors[field] = error;
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [step, formData, validateField]);

  // Enhanced navigation handlers
  const handleNext = useCallback(() => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validateStep]);

  const handlePrevious = useCallback(() => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Enhanced submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      try {
        await onUpdate(formData);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [formData, onUpdate, validateStep]);

  // Field error status
  const getFieldStatus = useCallback((name) => {
    if (!touched[name]) return '';
    return errors[name] ? 'error' : 'success';
  }, [touched, errors]);

  // Memoized progress bar calculation
  const progressBar = useMemo(() => {
    const progress = (step / 4) * 100;
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="steps-indicator">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className={`step-dot ${i + 1 <= step ? 'active' : ''}`}
              data-tooltip-id={`step-${i + 1}`}
              data-tooltip-content={`Step ${i + 1}`}
            />
          ))}
        </div>
        <div className="step-text">Step {step} of 4</div>
      </div>
    );
  }, [step]);

  // Memoized coverage cards
  const coverageCards = useMemo(() => (
    <div className="coverage-cards">
      {COVERAGE_LEVELS.map(level => (
        <div
          key={level.value}
          className={`coverage-card ${formData.coverageLevel === level.value ? 'selected' : ''}`}
          onClick={() => handleChange({
            target: { name: 'coverageLevel', value: level.value }
          })}
        >
          <h4>{level.label}</h4>
          <ul>
            {level.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ), [formData.coverageLevel, handleChange]);

  // Memoized form validation
  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return formData.name && formData.companyName && formData.email;
      case 2:
        return formData.siteSize && formData.floors && formData.stairs && 
               formData.constructionType && formData.constructionPhase;
      case 3:
        return true; // Optional selections
      case 4:
        return true; // Review step
      default:
        return false;
    }
  }, [step, formData]);

  return (
    <form className="wes3-form" onSubmit={handleSubmit}>
      {progressBar}
      
      {step === 1 && (
        <>
          <h2>Step 1: Contact Information</h2>
          <div className={`form-group ${getFieldStatus('name')}`}>
            <label htmlFor="name">Name:*</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your full name"
            />
            {errors.name && touched.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>

          <div className={`form-group ${getFieldStatus('companyName')}`}>
            <label htmlFor="companyName">Company Name:*</label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your company name"
            />
            {errors.companyName && touched.companyName && (
              <div className="error-message">{errors.companyName}</div>
            )}
          </div>

          <div className={`form-group ${getFieldStatus('email')}`}>
            <label htmlFor="email">Email:*</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your.email@company.com"
            />
            {errors.email && touched.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className={`form-group ${getFieldStatus('phone')}`}>
            <label htmlFor="phone">Phone: (Optional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your contact number"
            />
            {errors.phone && touched.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
              disabled={isSubmitting}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Step 2: Basic Site Information</h2>
          <div className={`form-group ${getFieldStatus('siteSize')}`}>
            <label htmlFor="siteSize">Site Size (sq. ft):</label>
            <input
              type="number"
              name="siteSize"
              id="siteSize"
              required
              value={formData.siteSize}
              onChange={handleChange}
              onBlur={handleBlur}
              data-tooltip-id="tooltip-siteSize"
              data-tooltip-content="Enter the total area of the site in square feet."
            />
            {errors.siteSize && touched.siteSize && (
              <div className="error-message">{errors.siteSize}</div>
            )}
            <Tooltip id="tooltip-siteSize" />
          </div>

          <div className={`form-group ${getFieldStatus('floors')}`}>
            <label htmlFor="floors">Number of Floors:</label>
            <input
              type="number"
              name="floors"
              id="floors"
              required
              value={formData.floors}
              onChange={handleChange}
              onBlur={handleBlur}
              data-tooltip-id="tooltip-floors"
              data-tooltip-content="Enter the number of floors, including basements."
            />
            {errors.floors && touched.floors && (
              <div className="error-message">{errors.floors}</div>
            )}
            <Tooltip id="tooltip-floors" />
          </div>

          <div className={`form-group ${getFieldStatus('stairs')}`}>
            <label htmlFor="stairs">Number of Staircases:</label>
            <input
              type="number"
              name="stairs"
              id="stairs"
              required
              value={formData.stairs}
              onChange={handleChange}
              onBlur={handleBlur}
              data-tooltip-id="tooltip-stairs"
              data-tooltip-content="Provide the total number of staircases in the building."
            />
            {errors.stairs && touched.stairs && (
              <div className="error-message">{errors.stairs}</div>
            )}
            <Tooltip id="tooltip-stairs" />
          </div>

          <div className={`form-group ${getFieldStatus('constructionType')}`}>
            <label htmlFor="constructionType">Type of Construction:</label>
            <select
              name="constructionType"
              id="constructionType"
              required
              value={formData.constructionType}
              onChange={handleChange}
              onBlur={handleBlur}
              data-tooltip-id="tooltip-constructionType"
              data-tooltip-content="Select the type of construction: Residential, Commercial, Industrial, or Marine."
            >
              <option value="">Select Type</option>
              {CONSTRUCTION_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            {errors.constructionType && touched.constructionType && (
              <div className="error-message">{errors.constructionType}</div>
            )}
            <Tooltip id="tooltip-constructionType" />
          </div>

          <div className={`form-group ${getFieldStatus('constructionPhase')}`}>
            <label htmlFor="constructionPhase">Phase of Construction:</label>
            <select
              name="constructionPhase"
              id="constructionPhase"
              required
              value={formData.constructionPhase}
              onChange={handleChange}
              onBlur={handleBlur}
              data-tooltip-id="tooltip-constructionPhase"
              data-tooltip-content="Choose the phase of construction: Early Planning, Mid-Construction, or Finishing Phase."
            >
              <option value="">Select Phase</option>
              {CONSTRUCTION_PHASES.map(phase => (
                <option key={phase.value} value={phase.value}>{phase.label}</option>
              ))}
            </select>
            {errors.constructionPhase && touched.constructionPhase && (
              <div className="error-message">{errors.constructionPhase}</div>
            )}
            <Tooltip id="tooltip-constructionPhase" />
          </div>

          <div className="coverage-comparison">
            <h3>Coverage Level Comparison</h3>
            {coverageCards}

            <div className={`form-group ${getFieldStatus('coverageLevel')}`}>
              <label htmlFor="coverageLevel">Select Coverage Level:</label>
              <select
                name="coverageLevel"
                id="coverageLevel"
                required
                value={formData.coverageLevel}
                onChange={handleChange}
                onBlur={handleBlur}
                data-tooltip-id="tooltip-coverageLevel"
                data-tooltip-content="Select the desired coverage level based on your site requirements."
              >
                {COVERAGE_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
              {errors.coverageLevel && touched.coverageLevel && (
                <div className="error-message">{errors.coverageLevel}</div>
              )}
              <Tooltip id="tooltip-coverageLevel" />
            </div>
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
              disabled={isSubmitting}
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
              disabled={isSubmitting}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Step 3: System Requirements</h2>
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

          <div className={`form-group ${getFieldStatus('interfaceIntegration')}`}>
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
            {errors.interfaceIntegration && touched.interfaceIntegration && (
              <div className="error-message">{errors.interfaceIntegration}</div>
            )}
            <Tooltip id="tooltip-interfaceIntegration" />
          </div>

          {formData.interfaceIntegration && (
            <div className={`form-group ${getFieldStatus('interfaceDetails')}`}>
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
                onBlur={handleBlur}
                placeholder="Describe how you plan to integrate the interface unit"
              ></textarea>
              {errors.interfaceDetails && touched.interfaceDetails && (
                <div className="error-message">{errors.interfaceDetails}</div>
              )}
              <Tooltip id="tooltip-interfaceDetails" />
            </div>
          )}

          <div className={`form-group ${getFieldStatus('reactIntegration')}`}>
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
            {errors.reactIntegration && touched.reactIntegration && (
              <div className="error-message">{errors.reactIntegration}</div>
            )}
            <Tooltip id="tooltip-reactIntegration" />
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
              disabled={isSubmitting}
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
              disabled={isSubmitting}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2>Step 4: Review & Submit</h2>
          <p style={{ color: "#333" }}>Review your inputs before submitting:</p>
          
          <div className="review-section">
            <h3>Contact Information</h3>
            <ul style={{ color: "#333", listStyleType: "none", padding: 0 }}>
              <li>Name: {formData.name}</li>
              <li>Company: {formData.companyName}</li>
              <li>Email: {formData.email}</li>
              {formData.phone && <li>Phone: {formData.phone}</li>}
            </ul>

            <h3>Site Details</h3>
            <ul style={{ color: "#333", listStyleType: "none", padding: 0 }}>
              <li>Site Size: {formData.siteSize} sq. ft</li>
              <li>Floors: {formData.floors}</li>
              <li>Staircases: {formData.stairs}</li>
              <li>Construction Type: {formData.constructionType}</li>
              <li>Construction Phase: {formData.constructionPhase}</li>
            </ul>

            <h3>System Requirements</h3>
            <ul style={{ color: "#333", listStyleType: "none", padding: 0 }}>
              <li>Interface Integration: {formData.interfaceIntegration ? 'Yes' : 'No'}</li>
              {formData.interfaceIntegration && (
                <li>Interface Details: {formData.interfaceDetails}</li>
              )}
              <li>REACT Integration: {formData.reactIntegration ? 'Yes' : 'No'}</li>
            </ul>
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
              disabled={isSubmitting}
            >
              ← Previous
            </button>
            <button 
              type="submit" 
              className={`nav-button submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Calculating...' : 'Calculate Estimate'}
            </button>
          </div>
        </>
      )}
    </form>
  );
}

// Memoize the entire component
export default React.memo(FormStep);
