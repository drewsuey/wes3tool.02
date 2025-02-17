import { useState, useEffect } from 'react';

export const useFormValidation = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('wes3FormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem('wes3FormData', JSON.stringify(formData));
  }, [formData]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'siteSize':
        if (value <= 0) {
          error = 'Please enter a valid site size';
        }
        break;
      // Add more validation cases as needed
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return { formData, errors, handleChange, setFormData };
}; 