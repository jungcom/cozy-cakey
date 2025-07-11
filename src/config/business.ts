/**
 * Business configuration containing all hardcoded values
 * Centralized location for easy updates to business details
 */

export const BUSINESS_CONFIG = {
  // Business Information
  name: 'Cozy Cakey',
  
  // Contact Information
  contact: {
    phone: '617-775-4505',
    email: 'aprilneuguri@gmail.com', // TODO: Update with actual email
    instagram: '@cozy.cakey',
    address: {
      street: '123 Sweet Street',
      city: 'Wakefield',
      state: 'MA',
      zip: '01880'
    }
  },
  
  // Payment Information
  payment: {
    venmo: {
      handle: 'Ellen-Kim-28',
      displayName: 'Venmo'
    },
    zelle: {
      phone: '617-775-4505',
      name: 'Ellen A Kim',
      displayName: 'Zelle'
    }
  },
  
  // Business Hours and Operations
  operations: {
    hours: 'Tuesday - Saturday: 10am - 8pm\n\nClosed Sundays & Mondays',
    minimumDeliveryAmount: 50,
    advanceOrderDays: 7, // Minimum days in advance for orders
    timezone: 'America/New_York'
  },
  
  // Pickup Times Available
  pickupTimes: [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM'
  ],
  
  // Allergy and Legal Information
  legal: {
    allergyDisclaimer: {
      title: 'Allergy Disclaimer',
      message: 'Cozy Cakey is not responsible for any allergic reactions. Our kitchen processes common allergens including wheat, eggs, dairy, nuts, and soy. Please inform us of any allergies, but consume at your own risk.',
      agreementText: 'I understand and agree to this disclaimer'
    }
  },
  
  // Default Values
  defaults: {
    customerType: 'new' as const,
    deliveryOption: 'pickup' as const,
    paymentMethod: 'venmo' as const
  }
} as const;

// Type exports for better TypeScript support
export type PaymentMethod = 'venmo' | 'zelle';
export type DeliveryOption = 'pickup' | 'delivery';
export type CustomerType = 'new' | 'existing';