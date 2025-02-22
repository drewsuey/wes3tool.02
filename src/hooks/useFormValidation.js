import { useState, useEffect, useCallback } from 'react';
import { validateField, validateCrossFields } from '../utils/validationrules';

const AUTOSAVE_DELAY = 1000; // 1 second delay for autosave
const STORAGE_KEY = 'wes3FormData';
const STORAGE_TIMESTAMP_KEY = 'wes3FormTimestamp';
const FORM_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useFormValidation = (initialState, onValidationChange) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load saved form data on mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedTimestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
        if (!savedTimestamp) return;

        const timestamp = parseInt(savedTimestamp, 10);
        const now = Date.now();

        // Check if saved data has expired
        if (now - timestamp > FORM_EXPIRY_TIME) {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
          return;
        }

        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
          setLastSaved(new Date(timestamp));
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    };

    loadSavedData();
  }, []);

  // Autosave form data when it changes
  useEffect(() => {
    if (!isDirty) return;

    const autosaveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
        setLastSaved(new Date());
        setIsDirty(false);
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(autosaveTimer);
  }, [formData, isDirty]);

  // Validate a single field
  const validateSingleField = useCallback((name, value) => {
    const error = validateField(name, value, formData);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    return !error;
  }, [formData]);

  // Validate all fields
  const validateAllFields = useCallback(() => {
    const fieldErrors = {};
    Object.keys(formData).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName], formData);
      if (error) fieldErrors[fieldName] = error;
    });

    // Add cross-field validation errors
    const crossFieldErrors = validateCrossFields(formData);
    Object.assign(fieldErrors, crossFieldErrors);

    setErrors(fieldErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {}));

    const isValid = Object.keys(fieldErrors).length === 0;
    onValidationChange?.(isValid);
    return isValid;
  }, [formData, onValidationChange]);

  // Handle field changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    setIsDirty(true);

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }, []);

  // Handle field blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateSingleField(name, value);
  }, [validateSingleField]);

  // Clear saved form data
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
      setFormData(initialState);
      setErrors({});
      setTouched({});
      setIsDirty(false);
      setLastSaved(null);
    } catch (error) {
      console.error('Error clearing saved form data:', error);
    }
  }, [initialState]);

  // Get field status
  const getFieldStatus = useCallback((name) => {
    if (!touched[name]) return '';
    return errors[name] ? 'error' : 'success';
  }, [touched, errors]);

  return {
    formData,
    errors,
    touched,
    lastSaved,
    handleChange,
    handleBlur,
    validateAllFields,
    validateField: validateSingleField,
    getFieldStatus,
    clearSavedData,
    setFormData
  };
};
