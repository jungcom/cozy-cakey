export type CakeSize = '6' | '8' | '10' | '12';

export interface SizeOption {
  id: CakeSize;
  label: string;
  price: number;
}

export interface OrderFormData {
  cakeId: string;
  size: CakeSize;
  flavor: string;
  deliveryDate: string;
  name: string;
  email: string;
  phone: string;
  // New fields
  customerType: 'new' | 'existing';
  pickupTime: string;
  baseColor: string;
  customBaseColor: string;
  lettering: string;
  candyCrownColor: string;
  customCandyCrownColor: string;
  kakaotalkName: string;
  instagramName: string;
  deliveryOption: 'pickup' | 'delivery';
  address: string;
  paymentMethod: 'venmo' | 'zelle';
  allergyAgreement: boolean;
  questionsComments: string;
  discountCode: string;
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
    size: '8',
    flavor: DEFAULT_FLAVORS[0],
    deliveryDate: getDefaultDeliveryDate(),
    name: '',
    email: '',
    phone: '',
    // New fields with defaults
    customerType: 'new',
    pickupTime: '',
    baseColor: 'white',
    customBaseColor: '',
    lettering: '',
    candyCrownColor: 'white',
    customCandyCrownColor: '',
    kakaotalkName: '',
    instagramName: '',
    deliveryOption: 'pickup',
    address: '',
    paymentMethod: 'venmo',
    allergyAgreement: false,
    questionsComments: '',
    discountCode: '',
  };
}

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