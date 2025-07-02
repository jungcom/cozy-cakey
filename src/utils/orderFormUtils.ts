import { type Cake } from '@/data/cakes';

export type CakeSize = '6' | '8' | '10' | '12';

export interface SizeOption {
  id: CakeSize;
  label: string;
  price: number;
}

export interface OrderFormData {
  cakeId: string;
  size: string; // Now uses inches as string (e.g., "6", "7", "8")
  flavor: string;
  deliveryDate: string;
  name: string;
  email: string;
  phone: string;
  // Customer info fields
  customerType: 'new' | 'existing';
  pickupTime: string;
  kakaotalkName: string;
  instagramName: string;
  deliveryOption: 'pickup' | 'delivery';
  address: string;
  paymentMethod: 'venmo' | 'zelle';
  allergyAgreement: boolean;
  questionsComments: string;
  discountCode: string;
  // Cake customization fields (all optional since they depend on cake type)
  baseColor?: string;
  customBaseColor?: string;
  lettering?: string;
  letteringColor?: string;
  customLetteringColor?: string;
  candyCrownColor?: string;
  customCandyCrownColor?: string;
  bowColor?: string;
  customBowColor?: string;
}

export const DEFAULT_SIZES: SizeOption[] = [
  { id: '6', label: '6" (Serves 8-10)', price: 35 },
  { id: '8', label: '8" (Serves 12-16)', price: 45 },
  { id: '10', label: '10" (Serves 20-25)', price: 55 },
  { id: '12', label: '12" (Serves 30-35)', price: 65 },
] as const;

export const DEFAULT_FLAVORS = [
  'Vanilla',
  'Chocolate'
] as const;

export function getDefaultDeliveryDate(): string {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
}

export const BASE_COLORS = [
  { value: 'white', label: 'White (Free)', price: 0 },
  { value: 'baby_pink', label: 'Baby Pink (+$3)', price: 3 },
  { value: 'baby_blue', label: 'Baby Blue (+$3)', price: 3 },
  { value: 'lavender', label: 'Lavender (+$3)', price: 3 },
  { value: 'custom', label: 'Custom Color (+$3)', price: 3 },
] as const;

export const CANDY_CROWN_COLORS = [
  { value: 'white', label: 'White/Transparent (Free)', price: 0 },
  { value: 'baby_pink', label: 'Baby Pink (+$3)', price: 3 },
  { value: 'navy_blue', label: 'Navy Blue (+$3)', price: 3 },
  { value: 'lavender', label: 'Lavender (+$3)', price: 3 },
  { value: 'black', label: 'Black (+$3)', price: 3 },
  { value: 'custom', label: 'Other Color (+$3)', price: 3 },
] as const;

export const PICKUP_TIMES = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM'
] as const;

export function getDefaultFormData(): Omit<OrderFormData, 'cakeId'> {
  return {
    size: '6',
    flavor: 'Vanilla',
    deliveryDate: getDefaultDeliveryDate(),
    name: '',
    email: '',
    phone: '',
    // Customer info fields with defaults
    customerType: 'new',
    pickupTime: '',
    kakaotalkName: '',
    instagramName: '',
    deliveryOption: 'pickup',
    address: '',
    paymentMethod: 'venmo',
    allergyAgreement: false,
    questionsComments: '',
    discountCode: '',
    // Cake customization fields with defaults (will be set based on cake)
    baseColor: undefined,
    customBaseColor: '',
    lettering: '',
    letteringColor: undefined,
    customLetteringColor: '',
    candyCrownColor: undefined,
    customCandyCrownColor: '',
    bowColor: undefined,
    customBowColor: '',
  };
}

export function calculateCakeTotalPrice(
  cake: Cake,
  formData: Partial<OrderFormData>
): number {
  let total = 0;
  
  // Add base size price
  const sizePrice = cake.sizePricing[formData.size || '6'];
  if (sizePrice) {
    total += sizePrice;
  }
  
  // Add flavor cost
  if (formData.flavor && cake.flavorPricing[formData.flavor] !== undefined) {
    total += cake.flavorPricing[formData.flavor];
  }
  
  // Add base color cost
  if (formData.baseColor && cake.baseColorPricing[formData.baseColor] !== undefined) {
    total += cake.baseColorPricing[formData.baseColor];
  }
  
  // Add candy crown color cost (Bead Cake only)
  if (formData.candyCrownColor && cake.candyCrownColorPricing && cake.candyCrownColorPricing[formData.candyCrownColor] !== undefined) {
    total += cake.candyCrownColorPricing[formData.candyCrownColor];
  }
  
  // Add lettering color cost (various cakes)
  if (formData.letteringColor && cake.letteringColorPricing && cake.letteringColorPricing[formData.letteringColor] !== undefined) {
    total += cake.letteringColorPricing[formData.letteringColor];
  }
  
  // Add bow color cost (Big Bow and Bow cakes)
  if (formData.bowColor && cake.bowColorPricing && cake.bowColorPricing[formData.bowColor] !== undefined) {
    total += cake.bowColorPricing[formData.bowColor];
  }
  
  return total;
}

// Keep old function for backward compatibility, but mark as deprecated
export function calculateTotalPrice(
  size: CakeSize, 
  baseColor: string = 'white',
  candyCrownColor: string = 'white',
  lettering: string = '',
  sizes: SizeOption[] = DEFAULT_SIZES
): number {
  const selectedSize = sizes.find(s => s.id === size) || sizes[1];
  let total = selectedSize.price;
  
  // Add base color cost
  const baseColorOption = BASE_COLORS.find(c => c.value === baseColor);
  if (baseColorOption) {
    total += baseColorOption.price;
  }
  
  // Add candy crown color cost
  const crownColorOption = CANDY_CROWN_COLORS.find(c => c.value === candyCrownColor);
  if (crownColorOption) {
    total += crownColorOption.price;
  }
  
  // Add lettering cost
  if (lettering.trim().length > 0) {
    total += 5;
  }
  
  return total;
}

export function getTodaysDate(): string {
  return new Date().toISOString().split('T')[0];
}

// Helper functions to generate options from cake data
export function getSizeOptionsFromCake(cake: Cake): Array<{id: string, label: string, price: number}> {
  return Object.entries(cake.sizePricing).map(([size, price]) => ({
    id: size,
    label: `${size}" cake`,
    price: price
  }));
}

export function getFlavorOptionsFromCake(cake: Cake): Array<{id: string, label: string, price: number}> {
  return Object.entries(cake.flavorPricing).map(([flavor, price]) => ({
    id: flavor,
    label: price > 0 ? `${flavor} (+$${price})` : flavor,
    price: price
  }));
}

export function getBaseColorOptionsFromCake(cake: Cake): Array<{id: string, label: string, price: number}> {
  return Object.entries(cake.baseColorPricing).map(([color, price]) => ({
    id: color,
    label: price > 0 ? `${color} (+$${price})` : color,
    price: price
  }));
}

export function getCandyCrownColorOptionsFromCake(cake: Cake): Array<{id: string, label: string, price: number}> | null {
  if (!cake.candyCrownColorPricing) return null;
  return Object.entries(cake.candyCrownColorPricing).map(([color, price]) => ({
    id: color,
    label: price > 0 ? `${color} (+$${price})` : color,
    price: price
  }));
}

export function getLetteringColorOptionsFromCake(cake: Cake): Array<{id: string, label: string, price: number}> | null {
  if (!cake.letteringColorPricing) return null;
  return Object.entries(cake.letteringColorPricing).map(([color, price]) => ({
    id: color,
    label: price > 0 ? `${color} (+$${price})` : color,
    price: price
  }));
}

export function getBowColorOptionsFromCake(cake: Cake): Array<{id: string, label: string, price: number}> | null {
  if (!cake.bowColorPricing) return null;
  return Object.entries(cake.bowColorPricing).map(([color, price]) => ({
    id: color,
    label: price > 0 ? `${color} (+$${price})` : color,
    price: price
  }));
}