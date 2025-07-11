import { type Cake } from '@/data/cakes';
import { type OrderFormData } from '@/utils/orderFormUtils';

export interface ValidationRule {
  field: keyof OrderFormData;
  message: string;
  condition?: (formData: Partial<OrderFormData>, cake?: Cake) => boolean;
}

// Common validation rules for all order types
export const COMMON_VALIDATION_RULES: ValidationRule[] = [
  { field: 'size', message: 'Please select a size/quantity' },
  { field: 'flavor', message: 'Please select a flavor' },
  { field: 'deliveryDate', message: 'Please select a delivery/pickup date' },
  { field: 'name', message: 'Please enter your full name' },
  { field: 'phone', message: 'Please enter your phone number' },
  { field: 'customerType', message: 'Please select customer type' },
  { field: 'pickupTime', message: 'Please select a pickup/delivery time' },
  { field: 'deliveryOption', message: 'Please select pickup or delivery' },
  { field: 'paymentMethod', message: 'Please select a payment method' },
];

// Design cake specific validation rules
export const DESIGN_CAKE_VALIDATION_RULES: ValidationRule[] = [
  { field: 'baseColor', message: 'Please select a base color' },
  { 
    field: 'candyCrownColor', 
    message: 'Please select a candy crown color',
    condition: (formData, cake) => !!cake?.candyCrownColorPricing
  },
  { 
    field: 'letteringColor', 
    message: 'Please select a lettering color',
    condition: (formData, cake) => !!cake?.letteringColorPricing && !!formData.lettering?.trim()
  },
  { 
    field: 'bowColor', 
    message: 'Please select a bow color',
    condition: (formData, cake) => !!cake?.bowColorPricing
  },
];

// Catering specific validation rules
export const CATERING_VALIDATION_RULES: ValidationRule[] = [
  { field: 'topperOption', message: 'Please select a topper option' },
  { 
    field: 'customQuantity', 
    message: 'Please enter a valid quantity',
    condition: (formData) => formData.size === 'other'
  },
  { 
    field: 'customTopperText', 
    message: 'Please enter custom topper text',
    condition: (formData) => formData.topperOption === 'Custom Topper'
  },
];

// Field mapping for catering orders (different field names)
export const CATERING_FIELD_MAPPING: Record<string, keyof OrderFormData> = {
  'customerName': 'name',
  'pickupDate': 'deliveryDate',
  'deliveryAddress': 'address',
  'specialInstructions': 'questionsComments',
  'letteringText': 'lettering',
};

/**
 * Validates form data based on cake type and validation rules
 */
export async function validateFormData(
  formData: Partial<OrderFormData>,
  totalPrice: number,
  cake?: Cake,
  orderType: 'design' | 'catering' = 'design'
): Promise<string | null> {
  let rules = [...COMMON_VALIDATION_RULES];
  
  // Add specific rules based on order type
  if (orderType === 'design') {
    rules = [...rules, ...DESIGN_CAKE_VALIDATION_RULES];
  } else if (orderType === 'catering') {
    rules = [...rules, ...CATERING_VALIDATION_RULES];
  }
  
  // Apply field mapping for catering orders
  const mappedFormData = orderType === 'catering' 
    ? applyFieldMapping(formData, CATERING_FIELD_MAPPING) 
    : formData;
  
  // Check required fields
  for (const rule of rules) {
    // Skip conditional rules that don't apply
    if (rule.condition && !rule.condition(mappedFormData, cake)) {
      continue;
    }
    
    const value = mappedFormData[rule.field];
    if (!value || (typeof value === 'string' && !value.trim())) {
      return rule.message;
    }
  }
  
  // Validate delivery address for delivery option
  const deliveryOption = mappedFormData.deliveryOption || formData.deliveryOption;
  const address = mappedFormData.address || formData.address || formData.deliveryAddress;
  if (deliveryOption === 'delivery' && (!address || !address.trim())) {
    return 'Please enter a delivery address';
  }
  
  // Validate allergy agreement
  if (!formData.allergyAgreement) {
    return 'Please acknowledge the allergy agreement';
  }
  
  // Validate email format
  const email = mappedFormData.email || formData.email;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address';
  }
  
  // Validate minimum total price
  if (totalPrice <= 0) {
    return 'Total price must be greater than $0';
  }
  
  // Validate custom quantity for catering
  if (orderType === 'catering' && formData.size === 'other') {
    const customQuantity = parseInt(formData.customQuantity || '0');
    if (customQuantity < 1) {
      return 'Please enter a valid quantity (minimum 1)';
    }
  }
  
  return null; // No validation errors
}

/**
 * Helper function to apply field mapping
 */
function applyFieldMapping(
  formData: Partial<OrderFormData>, 
  mapping: Record<string, keyof OrderFormData>
): Partial<OrderFormData> {
  const mapped = { ...formData };
  
  for (const [sourceField, targetField] of Object.entries(mapping)) {
    if (formData[sourceField as keyof OrderFormData] !== undefined) {
      mapped[targetField] = formData[sourceField as keyof OrderFormData];
    }
  }
  
  return mapped;
}

/**
 * Validates and sanitizes input data for order submission
 */
export function sanitizeFormData(formData: Partial<OrderFormData>): Partial<OrderFormData> {
  const sanitized = { ...formData };
  
  // Trim string fields
  const stringFields: (keyof OrderFormData)[] = [
    'name', 'email', 'phone', 'kakaotalkName', 'instagramName', 
    'address', 'questionsComments', 'discountCode', 'lettering',
    'customBaseColor', 'customLetteringColor', 'customCandyCrownColor', 'customBowColor'
  ];
  
  stringFields.forEach(field => {
    if (typeof sanitized[field] === 'string') {
      sanitized[field] = (sanitized[field] as string).trim();
    }
  });
  
  return sanitized;
}