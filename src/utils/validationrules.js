// Validation rules and messages for the WES3 Budget Tool

// Regex patterns
export const PATTERNS = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  name: /^[a-zA-Z\s'-]{2,}$/,
  companyName: /^[a-zA-Z0-9\s'&,.-]{2,}$/
};

// Validation messages
export const MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number (e.g., 123-456-7890)',
  name: 'Please enter a valid name (minimum 2 characters)',
  companyName: 'Please enter a valid company name (minimum 2 characters)',
  siteSize: {
    required: 'Site size is required',
    min: 'Site size must be at least 100 sq ft',
    max: 'Site size cannot exceed 1,000,000 sq ft',
    invalid: 'Please enter a valid site size'
  },
  floors: {
    required: 'Number of floors is required',
    min: 'Building must have at least 1 floor',
    max: 'Number of floors cannot exceed 200',
    invalid: 'Please enter a valid number of floors'
  },
  stairs: {
    required: 'Number of staircases is required',
    min: 'Building must have at least 1 staircase',
    max: 'Number of staircases cannot exceed 20 per floor',
    invalid: 'Please enter a valid number of staircases'
  }
};

// Validation constraints
export const CONSTRAINTS = {
  siteSize: {
    min: 100,
    max: 1000000
  },
  floors: {
    min: 1,
    max: 200
  },
  stairs: {
    min: 1,
    max: 20
  }
};

// Cross-field validation rules
export const validateCrossFields = (formData) => {
  const errors = {};

  // Validate stairs per floor ratio
  const stairsPerFloor = formData.stairs / formData.floors;
  if (stairsPerFloor > CONSTRAINTS.stairs.max) {
    errors.stairs = `Maximum ${CONSTRAINTS.stairs.max} staircases allowed per floor`;
  }

  // Validate minimum site size per floor
  const minSizePerFloor = 100; // sq ft
  if (formData.siteSize / formData.floors < minSizePerFloor) {
    errors.siteSize = `Minimum ${minSizePerFloor} sq ft required per floor`;
  }

  return errors;
};

// Construction type specific validations
export const CONSTRUCTION_REQUIREMENTS = {
  residential: {
    minDetectorsPerFloor: 2,
    maxSpacing: 30, // feet
    requiredInterface: false
  },
  commercial: {
    minDetectorsPerFloor: 4,
    maxSpacing: 25, // feet
    requiredInterface: true
  },
  industrial: {
    minDetectorsPerFloor: 6,
    maxSpacing: 20, // feet
    requiredInterface: true
  },
  marine: {
    minDetectorsPerFloor: 8,
    maxSpacing: 15, // feet
    requiredInterface: true
  }
};

// Validate a single field
export const validateField = (name, value, formData = {}) => {
  if (value === undefined || value === '') {
    return MESSAGES.required;
  }

  switch (name) {
    case 'email':
      return PATTERNS.email.test(value) ? '' : MESSAGES.email;
    
    case 'phone':
      return value === '' || PATTERNS.phone.test(value) ? '' : MESSAGES.phone;
    
    case 'name':
      return PATTERNS.name.test(value) ? '' : MESSAGES.name;
    
    case 'companyName':
      return PATTERNS.companyName.test(value) ? '' : MESSAGES.companyName;
    
    case 'siteSize': {
      const size = Number(value);
      if (isNaN(size)) return MESSAGES.siteSize.invalid;
      if (size < CONSTRAINTS.siteSize.min) return MESSAGES.siteSize.min;
      if (size > CONSTRAINTS.siteSize.max) return MESSAGES.siteSize.max;
      return '';
    }
    
    case 'floors': {
      const floors = Number(value);
      if (isNaN(floors)) return MESSAGES.floors.invalid;
      if (floors < CONSTRAINTS.floors.min) return MESSAGES.floors.min;
      if (floors > CONSTRAINTS.floors.max) return MESSAGES.floors.max;
      return '';
    }
    
    case 'stairs': {
      const stairs = Number(value);
      if (isNaN(stairs)) return MESSAGES.stairs.invalid;
      if (stairs < CONSTRAINTS.stairs.min) return MESSAGES.stairs.min;
      if (stairs > formData.floors * CONSTRAINTS.stairs.max) {
        return `Maximum ${CONSTRAINTS.stairs.max * formData.floors} staircases allowed for ${formData.floors} floors`;
      }
      return '';
    }
    
    default:
      return '';
  }
};
