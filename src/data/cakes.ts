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
  price: number;
  image?: string;
  alt?: string;
  slug?: string;
}

// Available cake flavors
export const cakeFlavors = [
  'Vanilla',
  'Chocolate',
  'Strawberry',
  'Red Velvet',
  'Lemon',
  'Carrot',
  'Funfetti',
  'Marble',
  'Coconut',
  'Coffee'
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
    price: 45,
    image: '/images/cakes/bead-cake.jpg',
    alt: 'Elegant cake with delicate sugar bead decorations',
    slug: 'design-cakes'
  },
  {
    id: 'two-tiered',
    name: 'Tall/Tiered Cakes',
    description: 'Elegant tiered cakes perfect for celebrations',
    price: 85,
    image: '/images/cakes/big-bow-cake.jpg',
    alt: 'Cake with large fondant bow decoration',
    slug: 'tiered-cakes'
  },
  {
    id: 'catering',
    name: 'Catering',
    description: 'Large cakes suitable for events and parties (serves 50+)',
    price: 120,
    image: '/images/cakes/bow-cake.jpg',
    alt: 'Cake with dainty fondant bows',
    slug: 'catering'
  },
  {
    id: 'gift',
    name: 'Gift Sets',
    description: 'Small cakes with gift wrapping and personal messages',
    price: 35,
    image: '/images/cakes/bday-bunny-cake.jpg',
    alt: 'Bunny-themed birthday cake',
    slug: 'gift-sets'
  }
];
