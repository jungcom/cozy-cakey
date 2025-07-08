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
  image?: string;
  alt?: string;
  category: string; // Reference to CakeCategory id
  price: number; // Base price for sorting and display
  // Hashmap-based pricing structure for design cakes
  sizePricing: { [sizeInches: string]: number };
  flavorPricing: { [flavor: string]: number };
  baseColorPricing: { [color: string]: number };
  // Cake-specific options
  candyCrownColorPricing?: { [color: string]: number }; // Bead Cake only
  letteringColorPricing?: { [color: string]: number }; // Big Bow, Bow, Bunny, Simply Cakes
  bowColorPricing?: { [color: string]: number }; // Big Bow, Bow Cakes only
  topperPricing?: { [option: string]: number }; // Mini Cake Cups only
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
    name: 'Tall/Tiered Cakes',
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
    image: '/images/cakes/design/bead.jpeg',
    alt: 'Elegant cake with beadwork design',
    category: 'design',
    price: 73,
    sizePricing: {
      '6': 73,
      '7': 88
    },
    flavorPricing: {
      'Vanilla': 0,
      'Chocolate': 0,
      'Valrhona Chocolate Crunch (addon)': 4
    },
    baseColorPricing: {
      'White': 0,
      'Baby Pink': 3,
      'Baby Blue': 3,
      'Lavender': 3,
      'Other': 3
    },
    candyCrownColorPricing: {
      'Clear/Transparent': 0,
      'Baby Pink': 3,
      'Navy Blue': 3,
      'Lavender': 3,
      'Black': 3,
      'Other': 3
    }
  },
  {
    id: 'big-bow-cake',
    name: 'Big Bow Cake',
    description: 'Stunning cake with a large fondant bow decoration',
    image: '/images/cakes/design/big-bow.jpeg',
    alt: 'Cake with large fondant bow',
    category: 'design',
    price: 68,
    sizePricing: {
      '6': 68,
      '7': 83,
      '8': 98
    },
    flavorPricing: {
      'Vanilla': 0,
      'Chocolate': 0,
      'Valrhona Chocolate Crunch (addon)': 4
    },
    baseColorPricing: {
      'White': 0,
      'Baby Pink': 3,
      'Baby Blue': 3,
      'Lavender': 3,
      'Other': 3
    },
    letteringColorPricing: {
      'White': 0,
      'Black': 0,
      'Navy Blue': 0,
      'Red': 0,
      'Dark Green': 0,
      'Other': 0
    },
    bowColorPricing: {
      'White': 0,
      'Black': 0
    }
  },
  {
    id: 'bow-cake',
    name: 'Bow Cake',
    description: 'Charming cake adorned with dainty fondant bows',
    image: '/images/cakes/design/bow.jpeg',
    alt: 'Cake with dainty fondant bows',
    category: 'design',
    price: 65,
    sizePricing: {
      '6': 65,
      '7': 80,
      '8': 95
    },
    flavorPricing: {
      'Vanilla': 0,
      'Chocolate': 0,
      'Valrhona Chocolate Crunch (addon)': 4
    },
    baseColorPricing: {
      'White': 0,
      'Baby Pink': 3,
      'Baby Blue': 3,
      'Lavender': 3,
      'Other': 3
    },
    letteringColorPricing: {
      'White': 0,
      'Black': 0,
      'Navy Blue': 0,
      'Red': 0,
      'Dark Green': 0,
      'Other': 0
    },
    bowColorPricing: {
      'Black': 0,
      'Red': 0,
      'Baby Blue': 0
    }
  },
  {
    id: 'bunny-cake',
    name: 'Bunny Cake',
    description: 'Adorable bunny-themed cake perfect for birthdays',
    image: '/images/cakes/design/bunny.jpeg',
    alt: 'Bunny-themed birthday cake',
    category: 'design',
    price: 63,
    sizePricing: {
      '6': 63,
      '7': 78,
      '8': 93
    },
    flavorPricing: {
      'Vanilla': 0,
      'Chocolate': 0,
      'Valrhona Chocolate Crunch (addon)': 4
    },
    baseColorPricing: {
      'White': 0,
      'Baby Pink': 3,
      'Baby Blue': 3,
      'Lavender': 3,
      'Other': 3
    },
    letteringColorPricing: {
      'White': 0,
      'Black': 0,
      'Navy Blue': 0,
      'Red': 0,
      'Dark Green': 0,
      'Other': 0
    }
  },
  {
    id: 'simply-cake',
    name: 'Simply Cake',
    description: 'Minimalist design with clean lines and elegant simplicity',
    image: '/images/cakes/design/simply.jpeg',
    alt: 'Minimalist cake design',
    category: 'design',
    price: 60,
    sizePricing: {
      '6': 60,
      '7': 75,
      '8': 90
    },
    flavorPricing: {
      'Vanilla': 0,
      'Chocolate': 0,
      'Valrhona Chocolate Crunch (addon)': 4
    },
    baseColorPricing: {
      'White': 0,
      'Baby Pink': 3,
      'Baby Blue': 3,
      'Lavender': 3,
      'Other': 3
    },
    letteringColorPricing: {
      'White': 0,
      'Black': 0,
      'Navy Blue': 0,
      'Red': 0,
      'Dark Green': 0,
      'Other': 0
    }
  },
  {
    id: 'tiara-cake',
    name: 'Tiara Cake',
    description: 'Regal cake featuring an elegant tiara design',
    image: '/images/cakes/design/tiara.jpeg',
    alt: 'Cake with tiara decoration',
    category: 'design',
    price: 70,
    sizePricing: {
      '6': 70,
      '7': 85
    },
    flavorPricing: {
      'Vanilla': 0,
      'Chocolate': 0,
      'Valrhona Chocolate Crunch (addon)': 4
    },
    baseColorPricing: {
      'All White': 0,
      'Baby Pink': 3,
      'Baby Blue': 3,
      'Lavender': 3,
      'Other': 3
    }
  },
  {
    id: 'mini-cake-cups',
    name: 'Mini Cake Cups',
    description: 'Perfect for catering events - delicious mini cake cups with customizable flavors and toppings',
    image: '/images/cakes/Catering/strawberry&packaged.jpeg',
    alt: 'Mini cake cups for catering',
    category: 'catering',
    price: 100,
    sizePricing: {
      '20': 100,
      '25': 125,
      '30': 150,
      '35': 175,
      '40': 200,
      'other': 5
    },
    flavorPricing: {
      'Vanilla': 0,
      'Chocolate': 0,
      'Valrhona Chocolate Crunch (addon)': 1
    },
    baseColorPricing: {
      'Standard': 0
    },
    topperPricing: {
      'None': 0,
      'Custom Topper': 2
    }
  }
];
