'use client';

import CakeCard from '../ui/CakeCard';

const cakes = [
  {
    id: 1,
    name: 'Design cakes',
    description: 'Perfect design cakes for any occasion',
    image: '/images/cakes/bead-cake.jpg',
    alt: 'Elegant cake with delicate sugar bead decorations'
  },
  {
    id: 2,
    name: 'Two tiered special cakes',
    description: 'Perfect two tiered cakes for any occasion',
    image: '/images/cakes/big-bow-cake.jpg',
    alt: 'Cake with large fondant bow decoration'
  },
  {
    id: 3,
    name: 'Catering',
    description: 'Perfect catering cakes for any occasion',
    image: '/images/cakes/bow-cake.jpg',
    alt: 'Cake with dainty fondant bows'
  },
  {
    id: 4,
    name: 'Gift sets',
    description: 'Perfect gift sets for any occasion',
    image: '/images/cakes/bday-bunny-cake.jpg',
    alt: 'Bunny-themed birthday cake'
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
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
