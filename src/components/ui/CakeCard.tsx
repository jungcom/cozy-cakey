import Image from 'next/image';
import { useState } from 'react';
import { Button } from './button';

type CakeCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

export default function CakeCard({ id, name, description, image, alt }: CakeCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-background rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 relative bg-primary/10 rounded-md mb-4 overflow-hidden">
        <Image
          src={imageError ? '/images/placeholder-cake.svg' : image}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-xl font-semibold text-tertiary mb-2">{name}</h3>
      <p className="text-tertiary mb-6">{description}</p>
      <Button 
        href={`/cakes/${id}`}
        variant="default"
        className="w-full"
      >
        View Details
      </Button>
    </div>
  );
}
