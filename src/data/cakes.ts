// Cake size options
export interface Size {
  id: string;
  name: string;
  servings: string;
  price: number;
}

export interface CakeCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  alt?: string;
}

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  alt?: string;
  category: string; // Reference to CakeCategory id
  flavors: CakeFlavor[];
  sizes: string[]; // References to Size ids
}

// Available cake flavors
export const cakeFlavors = [
  'Vanilla',
  'Chocolate',
  'Strawberry'
] as const;

export type CakeFlavor = typeof cakeFlavors[number];

// Available cake sizes
export const sizes: Size[] = [
  { id: 'small', name: 'Small (6\")', servings: '6-8', price: 0 },
  { id: 'medium', name: 'Medium (8\")', servings: '10-12', price: 15 },
  { id: 'large', name: 'Large (10\")', servings: '16-20', price: 30 },
];

// Cake categories that combine both order types and featured displays
export const cakeCategories: CakeCategory[] = [
  {
    id: 'design',
    name: 'Design Cakes',
    description: 'Custom designed cakes for any occasion',
    image: '/images/cakes/Design/Princess.jpeg',
    alt: 'Elegant cake with delicate sugar bead decorations'
  },
  {
    id: 'tiered',
    name: 'Tiered Cakes',
    description: 'Multi-tiered cakes for weddings and special events',
    image: '/images/cakes/Tall&Tiered/ribbon.jpeg',
    alt: 'Cake with large fondant bow decoration'
  },
  {
    id: 'custom',
    name: 'Custom Cakes',
    description: 'Custom designed cakes for any occasion',
    image: '/images/cakes/Design/pompompurin.jpeg',
    alt: 'Elegant cake with delicate sugar bead decorations'
  },
  {
    id: 'catering',
    name: 'Catering',
    description: 'Large cakes suitable for events and parties (serves 50+)',
    image: '/images/cakes/Catering/strawberry&packaged.jpeg',
    alt: 'Cake with dainty fondant bows'
  },
  {
    id: 'party',
    name: 'Party Favor',
    description: 'Small cakes with gift wrapping and personal messages',
    image: '/images/cakes/bday-bunny-cake.jpg',
    alt: 'Bunny-themed birthday cake'
  },
  {
    id: 'candles',
    name: 'Candles',
    description: 'Candles for birthdays and special occasions',
    image: '/images/cakes/bday-bunny-cake.jpg',
    alt: 'Bunny-themed birthday cake'
  },
];
