'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Our Signature Cakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake) => (
            <div key={cake.id} className="bg-amber-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 relative bg-amber-100 rounded-md mb-4 overflow-hidden">
                <Image
                  src={imageError[cake.id] ? '/images/placeholder-cake.svg' : cake.image}
                  alt={cake.alt}
                  fill
                  className="object-cover"
                  onError={() => setImageError(prev => ({ ...prev, [cake.id]: true }))}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">{cake.name}</h3>
              <p className="text-amber-700 mb-4">{cake.description}</p>
              <Link 
                href={`/cakes/${cake.id}`}
                className="inline-block bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
