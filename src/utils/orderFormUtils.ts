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
  message: string;
  deliveryDate: string;
  name: string;
  email: string;
  phone: string;
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

export function getDefaultFormData(): Omit<OrderFormData, 'cakeId'> {
  return {
    size: '8',
    flavor: DEFAULT_FLAVORS[0],
    message: '',
    deliveryDate: getDefaultDeliveryDate(),
    name: '',
    email: '',
    phone: '',
  };
}

export function calculateTotalPrice(size: CakeSize, sizes: SizeOption[] = DEFAULT_SIZES): number {
  const selectedSize = sizes.find(s => s.id === size) || sizes[1];
  return selectedSize.price;
}

export function getTodaysDate(): string {
  return new Date().toISOString().split('T')[0];
}