'use client';

import CakeCard from '@/components/ui/CakeCard';
import { cakeCategories } from '@/data/cakes';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-amber-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Our Cake Collection
          </h1>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted cakes, each made with the finest ingredients and a touch of love.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakeCategories.map((cake) => (
            <CakeCard
              key={cake.id}
              id={cake.id}
              name={cake.name}
              description={cake.description}
              image={cake.image || '/images/cakes/default-cake.jpg'}
              alt={cake.alt || `${cake.name} cake`}
              variant="menu"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
