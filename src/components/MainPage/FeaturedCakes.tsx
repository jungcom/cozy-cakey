'use client';

import CakeCard from '../ui/CakeCard';
import { cakeCategories } from '@/data/cakes';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-6xl mx-auto">
          {cakeCategories.map((category) => (
            <CakeCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              image={category.image || '/images/cakes/default-cake.jpg'}
              alt={category.alt || `${category.name} cake`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
