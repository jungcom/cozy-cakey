'use client';

import CakeCard from './ui/CakeCard';

const cakes = [
  {
    id: 1,
    name: 'Bead Cake',
    description: 'Elegant cake decorated with delicate sugar beads',
    image: '/images/cakes/bead-cake.jpg',
    alt: 'Elegant cake with delicate sugar bead decorations'
  },
  {
    id: 2,
    name: 'Big Bow Cake',
    description: 'Stunning cake featuring a large fondant bow decoration',
    image: '/images/cakes/big-bow-cake.jpg',
    alt: 'Cake with large fondant bow decoration'
  },
  {
    id: 3,
    name: 'Bow Cake',
    description: 'Beautiful cake adorned with dainty fondant bows',
    image: '/images/cakes/bow-cake.jpg',
    alt: 'Cake with dainty fondant bows'
  },
  {
    id: 4,
    name: 'Bday Bunny Cake',
    description: 'Adorable bunny-themed cake perfect for birthdays',
    image: '/images/cakes/bday-bunny-cake.jpg',
    alt: 'Bunny-themed birthday cake'
  },
  {
    id: 5,
    name: 'Simply Cake',
    description: 'Classic and elegant, simply delicious',
    image: '/images/cakes/simply-cake.jpg',
    alt: 'Simple and elegant cake'
  },
  {
    id: 6,
    name: 'Tiara Cake',
    description: 'Regal cake featuring a beautiful tiara decoration',
    image: '/images/cakes/tiara-cake.jpg',
    alt: 'Elegant cake with tiara decoration'
  },
];

export default function FeaturedCakes() {
  return (
    <section className="relative overflow-hidden py-16 bg-background1">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-7xl md:text-9xl font-bold whitespace-nowrap font-dancing-script text-tertiary/30">
          Our Cakes
        </span>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-tertiary mb-12">Our Signature Cakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          {cakes.map((cake) => (
            <CakeCard
              key={cake.id}
              id={cake.id}
              name={cake.name}
              description={cake.description}
              image={cake.image}
              alt={cake.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
