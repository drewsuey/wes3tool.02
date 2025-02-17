// src/components/FormStep.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import './FormStep.css';
import { coverageLevels } from '../data/coverageLevels';

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

const COVERAGE_LEVELS = [
  { 
    value: 'max',
    label: 'Maximum Coverage',
    features: [
      'Complete protection for high-risk areas',
      '24/7 monitoring'
    ]
  },
  {
    value: 'medium',
    label: 'Medium Coverage',
    features: [
      'Balanced protection',
      'Standard coverage'
    ]
  },
  {
    value: 'low',
    label: 'Low Coverage',
    features: [
      'Basic protection for low-risk areas',
      'Essential coverage'
    ]
  }
];

// Add step descriptions constant
const STEP_DESCRIPTIONS = [
  { title: 'Contact', description: 'Contact Information' },
  { title: 'Site', description: 'Site Information' },
  { title: 'System', description: 'System Requirements' },
  { title: 'Review', description: 'Review & Submit' }
];

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

  // Update the progress bar calculation
  const progressBar = useMemo(() => {
    const progress = (step / 4) * 100;
    return (
      <div className="progress-container" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <nav aria-label="Form Steps" className="steps-indicator">
          {STEP_DESCRIPTIONS.map((stepInfo, index) => (
            <div
              key={index}
              className={`step-item ${index + 1 <= step ? 'active' : ''} ${index + 1 < step ? 'completed' : ''}`}
              role="tab"
              aria-selected={index + 1 === step}
              aria-label={`Step ${index + 1}: ${stepInfo.title}`}
              tabIndex={index + 1 === step ? 0 : -1}
            >
              <div className="step-number" aria-hidden="true">{index + 1}</div>
              <div className="step-info">
                <div className="step-title">{stepInfo.title}</div>
                <div className="step-description">{stepInfo.description}</div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    );
  }, [step]);

  // Memoized coverage cards
  const coverageCards = useMemo(() => (
    <div className="coverage-cards" role="radiogroup" aria-label="Coverage Level Selection">
      {COVERAGE_LEVELS.map(level => (
        <div
          key={level.value}
          className={`coverage-card ${formData.coverageLevel === level.value ? 'selected' : ''}`}
          onClick={() => handleChange({
            target: { name: 'coverageLevel', value: level.value }
          })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleChange({
                target: { name: 'coverageLevel', value: level.value }
              });
            }
          }}
          role="radio"
          aria-checked={formData.coverageLevel === level.value}
          tabIndex={0}
        >
          <h4>{level.label}</h4>
          <ul>
            {level.features.map((feature, index) => (
              <li key={index} role="presentation">{feature}</li>
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
    <form className="wes3-form" onSubmit={handleSubmit} role="form" aria-label="Budget Estimation Form">
      {progressBar}
      
      {step === 1 && (
        <div role="tabpanel" aria-labelledby="step-1">
          <h2 id="step-1">Step 1: Contact Information</h2>
          <div className={`form-group ${getFieldStatus('name')}`}>
            <label htmlFor="name" id="name-label">Name:*</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your full name"
              aria-labelledby="name-label"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && touched.name && (
              <div className="error-message" id="name-error" role="alert">{errors.name}</div>
            )}
          </div>

          <div className={`form-group ${getFieldStatus('companyName')}`}>
            <label htmlFor="companyName" id="company-label">Company Name:*</label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your company name"
              aria-labelledby="company-label"
              aria-required="true"
              aria-invalid={!!errors.companyName}
              aria-describedby={errors.companyName ? "company-error" : undefined}
            />
            {errors.companyName && touched.companyName && (
              <div className="error-message" id="company-error" role="alert">{errors.companyName}</div>
            )}
          </div>

          <div className={`form-group ${getFieldStatus('email')}`}>
            <label htmlFor="email" id="email-label">Email:*</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your.email@company.com"
              aria-labelledby="email-label"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && touched.email && (
              <div className="error-message" id="email-error" role="alert">{errors.email}</div>
            )}
          </div>

          <div className={`form-group ${getFieldStatus('phone')}`}>
            <label htmlFor="phone" id="phone-label">Phone: (Optional)</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your contact number"
              aria-labelledby="phone-label"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && touched.phone && (
              <div className="error-message" id="phone-error" role="alert">{errors.phone}</div>
            )}
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
              disabled={isSubmitting}
              aria-label="Next Step"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div role="tabpanel" aria-labelledby="step-2">
          <h2 id="step-2">Step 2: Basic Site Information</h2>
          <div className={`form-group ${getFieldStatus('siteSize')}`}>
            <label htmlFor="siteSize" id="siteSize-label">Site Size (sq. ft):*</label>
            <input
              type="number"
              name="siteSize"
              id="siteSize"
              className="form-control"
              required
              value={formData.siteSize}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
              aria-labelledby="siteSize-label"
              aria-required="true"
              aria-invalid={!!errors.siteSize}
              aria-describedby={`tooltip-siteSize${errors.siteSize ? " siteSize-error" : ""}`}
            />
            {errors.siteSize && touched.siteSize && (
              <div className="error-message" id="siteSize-error" role="alert">{errors.siteSize}</div>
            )}
            <Tooltip id="tooltip-siteSize" />
          </div>

          <div className={`form-group ${getFieldStatus('floors')}`}>
            <label htmlFor="floors" id="floors-label">Number of Floors:*</label>
            <input
              type="number"
              name="floors"
              id="floors"
              required
              value={formData.floors}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
              aria-labelledby="floors-label"
              aria-required="true"
              aria-invalid={!!errors.floors}
              aria-describedby={`tooltip-floors${errors.floors ? " floors-error" : ""}`}
            />
            {errors.floors && touched.floors && (
              <div className="error-message" id="floors-error" role="alert">{errors.floors}</div>
            )}
            <Tooltip id="tooltip-floors" />
          </div>

          <div className={`form-group ${getFieldStatus('stairs')}`}>
            <label htmlFor="stairs" id="stairs-label">Number of Staircases:*</label>
            <input
              type="number"
              name="stairs"
              id="stairs"
              required
              value={formData.stairs}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
              aria-labelledby="stairs-label"
              aria-required="true"
              aria-invalid={!!errors.stairs}
              aria-describedby={`tooltip-stairs${errors.stairs ? " stairs-error" : ""}`}
            />
            {errors.stairs && touched.stairs && (
              <div className="error-message" id="stairs-error" role="alert">{errors.stairs}</div>
            )}
            <Tooltip id="tooltip-stairs" />
          </div>

          <div className={`form-group ${getFieldStatus('constructionType')}`}>
            <label htmlFor="constructionType" id="constructionType-label">Type of Construction:*</label>
            <select
              name="constructionType"
              id="constructionType"
              required
              value={formData.constructionType}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-labelledby="constructionType-label"
              aria-required="true"
              aria-invalid={!!errors.constructionType}
              aria-describedby={`tooltip-constructionType${errors.constructionType ? " constructionType-error" : ""}`}
            >
              <option value="">Select Type</option>
              {CONSTRUCTION_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            {errors.constructionType && touched.constructionType && (
              <div className="error-message" id="constructionType-error" role="alert">{errors.constructionType}</div>
            )}
            <Tooltip id="tooltip-constructionType" />
          </div>

          <div className={`form-group ${getFieldStatus('constructionPhase')}`}>
            <label htmlFor="constructionPhase" id="constructionPhase-label">Phase of Construction:*</label>
            <select
              name="constructionPhase"
              id="constructionPhase"
              required
              value={formData.constructionPhase}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-labelledby="constructionPhase-label"
              aria-required="true"
              aria-invalid={!!errors.constructionPhase}
              aria-describedby={`tooltip-constructionPhase${errors.constructionPhase ? " constructionPhase-error" : ""}`}
            >
              <option value="">Select Phase</option>
              {CONSTRUCTION_PHASES.map(phase => (
                <option key={phase.value} value={phase.value}>{phase.label}</option>
              ))}
            </select>
            {errors.constructionPhase && touched.constructionPhase && (
              <div className="error-message" id="constructionPhase-error" role="alert">{errors.constructionPhase}</div>
            )}
            <Tooltip id="tooltip-constructionPhase" />
          </div>

          <div className="form-group">
            <label id="coverageLevel-label">Coverage Level:*</label>
            <div className="coverage-comparison" role="group" aria-labelledby="coverageLevel-label">
              {coverageCards}
            </div>
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
              disabled={isSubmitting}
              aria-label="Previous Step"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
              disabled={isSubmitting}
              aria-label="Next Step"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div role="tabpanel" aria-labelledby="step-3">
          <h2 id="step-3">Step 3: System Requirements</h2>
          <div className="highlight-section" role="group" aria-label="System Features">
            <div className="highlight-card" role="region" aria-label="Interface Device Features">
              <h3>Interface Device</h3>
              <ul>
                <li>Seamless integration with fire panels</li>
                <li>Supports multiple device types</li>
                <li>Flexible configuration options</li>
              </ul>
            </div>
            <div className="highlight-card" role="region" aria-label="REACT Digital App Features">
              <h3>REACT Digital App</h3>
              <ul>
                <li>Real-time monitoring and notifications</li>
                <li>Cloud-based access for remote control</li>
                <li>Enhances site safety with instant alerts</li>
              </ul>
            </div>
          </div>

          <div className={`form-group checkbox-group ${getFieldStatus('interfaceIntegration')}`}>
            <label htmlFor="interfaceIntegration" id="interfaceIntegration-label" className="checkbox-label">
              <input
                type="checkbox"
                name="interfaceIntegration"
                id="interfaceIntegration"
                checked={formData.interfaceIntegration}
                onChange={handleChange}
                aria-labelledby="interfaceIntegration-label"
                aria-describedby="tooltip-interfaceIntegration"
              />
              Interface Integration
            </label>
            <span
              className="tooltip-trigger"
              data-tooltip-id="tooltip-interfaceIntegration"
              data-tooltip-content="Enable this if you want to integrate with other fire panels or alarm systems."
              role="tooltip"
              tabIndex="0"
            >
              ?
            </span>
            <Tooltip id="tooltip-interfaceIntegration" />
          </div>

          {formData.interfaceIntegration && (
            <div className={`form-group ${getFieldStatus('interfaceDetails')}`}>
              <label htmlFor="interfaceDetails" id="interfaceDetails-label">
                Describe Your Implementation Idea:
              </label>
              <textarea
                name="interfaceDetails"
                id="interfaceDetails"
                rows="3"
                value={formData.interfaceDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Describe how you plan to integrate the interface unit"
                aria-labelledby="interfaceDetails-label"
                aria-describedby={errors.interfaceDetails ? "interfaceDetails-error" : undefined}
              ></textarea>
              {errors.interfaceDetails && touched.interfaceDetails && (
                <div className="error-message" id="interfaceDetails-error" role="alert">{errors.interfaceDetails}</div>
              )}
            </div>
          )}

          <div className={`form-group checkbox-group ${getFieldStatus('reactIntegration')}`}>
            <label htmlFor="reactIntegration" id="reactIntegration-label" className="checkbox-label">
              <input
                type="checkbox"
                name="reactIntegration"
                id="reactIntegration"
                checked={formData.reactIntegration}
                onChange={handleChange}
                aria-labelledby="reactIntegration-label"
                aria-describedby="tooltip-reactIntegration"
              />
              REACT Integration
            </label>
            <span
              className="tooltip-trigger"
              data-tooltip-id="tooltip-reactIntegration"
              data-tooltip-content="Enable REACT integration for remote monitoring and notifications."
              role="tooltip"
              tabIndex="0"
            >
              ?
            </span>
            <Tooltip id="tooltip-reactIntegration" />
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
              disabled={isSubmitting}
              aria-label="Previous Step"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next-button"
              disabled={isSubmitting}
              aria-label="Next Step"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div role="tabpanel" aria-labelledby="step-4">
          <h2 id="step-4">Step 4: Review & Submit</h2>
          <p>Review your inputs before submitting:</p>
          
          <div className="review-section" role="region" aria-label="Form Summary">
            <h3>Contact Information</h3>
            <dl className="review-list">
              <div className="review-item">
                <dt>Name:</dt>
                <dd>{formData.name}</dd>
              </div>
              <div className="review-item">
                <dt>Company:</dt>
                <dd>{formData.companyName}</dd>
              </div>
              <div className="review-item">
                <dt>Email:</dt>
                <dd>{formData.email}</dd>
              </div>
              {formData.phone && (
                <div className="review-item">
                  <dt>Phone:</dt>
                  <dd>{formData.phone}</dd>
                </div>
              )}
            </dl>

            <h3>Site Details</h3>
            <dl className="review-list">
              <div className="review-item">
                <dt>Site Size:</dt>
                <dd>{formData.siteSize} sq. ft</dd>
              </div>
              <div className="review-item">
                <dt>Floors:</dt>
                <dd>{formData.floors}</dd>
              </div>
              <div className="review-item">
                <dt>Staircases:</dt>
                <dd>{formData.stairs}</dd>
              </div>
              <div className="review-item">
                <dt>Construction Type:</dt>
                <dd>{CONSTRUCTION_TYPES.find(type => type.value === formData.constructionType)?.label || formData.constructionType}</dd>
              </div>
              <div className="review-item">
                <dt>Construction Phase:</dt>
                <dd>{CONSTRUCTION_PHASES.find(phase => phase.value === formData.constructionPhase)?.label || formData.constructionPhase}</dd>
              </div>
            </dl>

            <h3>System Requirements</h3>
            <dl className="review-list">
              <div className="review-item">
                <dt>Interface Integration:</dt>
                <dd>{formData.interfaceIntegration ? 'Yes' : 'No'}</dd>
              </div>
              {formData.interfaceIntegration && (
                <div className="review-item">
                  <dt>Interface Details:</dt>
                  <dd>{formData.interfaceDetails}</dd>
                </div>
              )}
              <div className="review-item">
                <dt>REACT Integration:</dt>
                <dd>{formData.reactIntegration ? 'Yes' : 'No'}</dd>
              </div>
            </dl>
          </div>

          <div className="form-navigation">
            <button
              type="button"
              onClick={handlePrevious}
              className="nav-button prev-button"
              disabled={isSubmitting}
              aria-label="Previous Step"
            >
              ← Previous
            </button>
            <button 
              type="submit" 
              className={`nav-button submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
              aria-label={isSubmitting ? 'Calculating estimate...' : 'Calculate Estimate'}
            >
              {isSubmitting ? 'Calculating...' : 'Calculate Estimate'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

// Memoize the entire component
export default React.memo(FormStep);
