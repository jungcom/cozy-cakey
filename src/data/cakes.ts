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

// Design cakes for the collection/design page
export const designCakes: Cake[] = [
  {
    id: 'bead-cake',
    name: 'Bead Cake',
    description: 'Elegant cake featuring delicate beadwork design',
    price: 65.00,
    image: '/images/cakes/design/bead.jpeg',
    alt: 'Elegant cake with beadwork design',
    category: 'design',
    flavors: ['Vanilla', 'Chocolate'],
    sizes: ['small', 'medium', 'large']
  },
  {
    id: 'big-bow-cake',
    name: 'Big Bow Cake',
    description: 'Stunning cake with a large fondant bow decoration',
    price: 75.00,
    image: '/images/cakes/design/big-bow.jpeg',
    alt: 'Cake with large fondant bow',
    category: 'design',
    flavors: ['Vanilla', 'Strawberry'],
    sizes: ['medium', 'large']
  },
  {
    id: 'bow-cake',
    name: 'Bow Cake',
    description: 'Charming cake adorned with dainty fondant bows',
    price: 70.00,
    image: '/images/cakes/design/bow.jpeg',
    alt: 'Cake with dainty fondant bows',
    category: 'design',
    flavors: ['Chocolate', 'Vanilla'],
    sizes: ['small', 'medium', 'large']
  },
  {
    id: 'bunny-cake',
    name: 'Bunny Cake',
    description: 'Adorable bunny-themed cake perfect for birthdays',
    price: 68.00,
    image: '/images/cakes/design/bunny.jpeg',
    alt: 'Bunny-themed birthday cake',
    category: 'design',
    flavors: ['Vanilla', 'Strawberry'],
    sizes: ['small', 'medium']
  },
  {
    id: 'simply-cake',
    name: 'Simply Cake',
    description: 'Minimalist design with clean lines and elegant simplicity',
    price: 60.00,
    image: '/images/cakes/design/simply.jpeg',
    alt: 'Minimalist cake design',
    category: 'design',
    flavors: ['Vanilla', 'Chocolate'],
    sizes: ['small', 'medium', 'large']
  },
  {
    id: 'tiara-cake',
    name: 'Tiara Cake',
    description: 'Regal cake featuring an elegant tiara design',
    price: 80.00,
    image: '/images/cakes/design/tiara.jpeg',
    alt: 'Cake with tiara decoration',
    category: 'design',
    flavors: ['Chocolate', 'Vanilla', 'Strawberry'],
    sizes: ['medium', 'large']
  }
];
