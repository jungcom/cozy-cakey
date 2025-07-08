/**
 * Validation configuration containing form constraints and validation rules
 * Centralized location for all validation logic and error messages
 */

export const VALIDATION_CONFIG = {
  // Character Limits
  characterLimits: {
    letteringText: 20,
    customTopperText: 12,
    customerName: 100,
    phone: 20,
    email: 254, // RFC 5321 standard
    address: 500,
    specialInstructions: 1000,
    questionsComments: 1000,
    discountCode: 50
  },
  
  // Minimum Values
  minimums: {
    deliveryAmount: 50,
    advanceOrderDays: 7,
    customQuantity: 1
  },
  
  // Maximum Values
  maximums: {
    customQuantity: 1000,
    totalPrice: 10000
  },
  
  // Regex Patterns
  patterns: {
    phone: /^[\+]?[(]?[\+]?\d{3}[\)]?[\s\-]?\d{3}[\s\-]?\d{4,6}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    discountCode: /^[A-Z0-9]{3,10}$/
  },
  
  // Required Fields by Form Type
  requiredFields: {
    design: [
      'size', 'flavor', 'deliveryDate', 'name', 'phone', 
      'customerType', 'pickupTime', 'baseColor', 
      'deliveryOption', 'paymentMethod', 'allergyAgreement'
    ] as readonly string[],
    catering: [
      'size', 'flavor', 'pickupDate', 'customerName', 'email', 'phone',
      'pickupTime', 'deliveryOption', 'paymentMethod', 'allergyAgreement'
    ] as readonly string[]
  },
  
  // Conditional Required Fields
  conditionalFields: {
    delivery: ['address'] as readonly string[],
    customColor: ['customBaseColor'] as readonly string[],
    customCandyCrown: ['customCandyCrownColor'] as readonly string[],
    customLettering: ['customLetteringColor'] as readonly string[],
    customBow: ['customBowColor'] as readonly string[],
    customTopper: ['customTopperText'] as readonly string[],
    otherQuantity: ['customQuantity'] as readonly string[]
  }
} as const;

export const VALIDATION_MESSAGES = {
  // Required Field Messages
  required: {
    size: 'Please select a cake size',
    flavor: 'Please select a flavor',
    deliveryDate: 'Please select a delivery/pickup date',
    pickupDate: 'Please select a pickup date',
    name: 'Please enter your full name',
    customerName: 'Please enter your full name',
    email: 'Please enter your email address',
    phone: 'Please enter your phone number',
    customerType: 'Please select customer type',
    pickupTime: 'Please select a pickup/delivery time',
    baseColor: 'Please select a base color',
    deliveryOption: 'Please select pickup or delivery',
    paymentMethod: 'Please select a payment method',
    allergyAgreement: 'Please acknowledge the allergy disclaimer before placing your order',
    address: 'Please enter your delivery address',
    customBaseColor: 'Please describe your custom color',
    customTopperText: 'Please enter your custom topper text',
    customQuantity: 'Please enter the quantity'
  },
  
  // Format Validation Messages
  format: {
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    discountCode: 'Discount code must be 3-10 uppercase letters and numbers'
  },
  
  // Length Validation Messages
  length: {
    letteringTooLong: (max: number) => `Lettering text cannot exceed ${max} characters`,
    customTopperTooLong: (max: number) => `Custom topper text cannot exceed ${max} characters`,
    nameTooLong: (max: number) => `Name cannot exceed ${max} characters`,
    phoneTooLong: (max: number) => `Phone number cannot exceed ${max} characters`,
    emailTooLong: (max: number) => `Email cannot exceed ${max} characters`,
    addressTooLong: (max: number) => `Address cannot exceed ${max} characters`,
    instructionsTooLong: (max: number) => `Special instructions cannot exceed ${max} characters`,
    commentsTooLong: (max: number) => `Comments cannot exceed ${max} characters`
  },
  
  // Business Logic Validation Messages
  business: {
    minimumDelivery: (min: number) => `Delivery orders must be at least $${min}`,
    advanceOrder: (days: number) => `Orders must be placed at least ${days} days in advance`,
    invalidQuantity: 'Please enter a valid quantity',
    quantityTooLow: (min: number) => `Minimum quantity is ${min}`,
    quantityTooHigh: (max: number) => `Maximum quantity is ${max}`,
    invalidDate: 'Please select a valid date',
    pastDate: 'Please select a future date'
  },
  
  // General Messages
  general: {
    submissionError: 'Failed to submit order. Please try again.',
    networkError: 'Network error. Please check your connection and try again.',
    unexpectedError: 'An unexpected error occurred. Please try again.'
  }
} as const;

// Helper function to validate form data
export function validateFormField(
  fieldName: string, 
  value: any, 
  formType: 'design' | 'catering' = 'design'
): string | null {
  const config = VALIDATION_CONFIG;
  const messages = VALIDATION_MESSAGES;
  
  // Check if field is required
  if (config.requiredFields[formType].includes(fieldName)) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return messages.required[fieldName as keyof typeof messages.required] || 'This field is required';
    }
  }
  
  // Check character limits
  if (typeof value === 'string' && fieldName in config.characterLimits) {
    const limit = config.characterLimits[fieldName as keyof typeof config.characterLimits];
    if (value.length > limit) {
      const messageKey = `${fieldName}TooLong` as keyof typeof messages.length;
      const messageFunc = messages.length[messageKey] as (max: number) => string;
      return messageFunc ? messageFunc(limit) : `Cannot exceed ${limit} characters`;
    }
  }
  
  // Check format patterns
  if (typeof value === 'string' && fieldName in config.patterns) {
    const pattern = config.patterns[fieldName as keyof typeof config.patterns];
    if (!pattern.test(value)) {
      return messages.format[fieldName as keyof typeof messages.format] || 'Invalid format';
    }
  }
  
  return null;
}

// Helper function to validate entire form
export function validateForm(
  formData: Record<string, any>, 
  formType: 'design' | 'catering' = 'design'
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // Validate all required fields
  for (const field of VALIDATION_CONFIG.requiredFields[formType]) {
    const error = validateFormField(field, formData[field], formType);
    if (error) {
      errors[field] = error;
    }
  }
  
  // Validate conditional fields
  for (const [condition, fields] of Object.entries(VALIDATION_CONFIG.conditionalFields)) {
    let shouldValidate = false;
    
    switch (condition) {
      case 'delivery':
        shouldValidate = formData.deliveryOption === 'delivery';
        break;
      case 'customColor':
        shouldValidate = formData.baseColor === 'Other' || formData.baseColor === 'custom';
        break;
      case 'customTopper':
        shouldValidate = formData.topperOption === 'Custom Topper';
        break;
      case 'otherQuantity':
        shouldValidate = formData.size === 'other';
        break;
      // Add more conditions as needed
    }
    
    if (shouldValidate) {
      for (const field of fields) {
        const error = validateFormField(field, formData[field], formType);
        if (error) {
          errors[field] = error;
        }
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}