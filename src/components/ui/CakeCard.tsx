import Image from 'next/image';
import { useState } from 'react';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

type BaseCakeCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

type CakeCardProps = BaseCakeCardProps & {
  variant?: 'default' | 'collection' | 'order';
  price?: string;
};

const DefaultCakeCard = ({ id, name, description, image, alt }: BaseCakeCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-background rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative bg-primary/10 rounded-md mb-4 overflow-hidden flex-1 min-h-[300px] w-full">
        <Image
          src={imageError ? '/images/placeholder-cake.svg' : image}
          alt={alt}
          fill
          className="object-cover object-center"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-tertiary mb-2">{name}</h3>
        <p className="text-tertiary mb-6 line-clamp-2">{description}</p>
        <Button 
          href={`/cakes/${id}`}
          variant="default"
          className="w-full mt-auto"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

const CollectionCakeCard = ({ id, name, description, image, alt, price }: BaseCakeCardProps & { price?: string }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <a 
      href={`/collection/${id}`} 
      className="group block h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 hover:border-amber-200"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageError ? '/images/placeholder-cake.svg' : image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-medium text-gray-900 text-left">{name}</h3>
      </div>
    </a>
  );
};

const OrderCakeCard = ({ id, name, image, alt, price }: BaseCakeCardProps & { price?: string }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group block h-full rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imageError ? '/images/placeholder-cake.svg' : image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 text-center">{name}</h3>
        {price && (
          <p className="text-amber-700 text-center mt-1 font-medium">{price}</p>
        )}
      </div>
    </div>
  );
};

const CakeCard = ({ variant = 'default', ...props }: CakeCardProps) => {
  if (variant === 'collection') {
    return <CollectionCakeCard {...props} />;
  }
  if (variant === 'order') {
    return <OrderCakeCard {...props} />;
  }
  return <DefaultCakeCard {...props} />;
};

export default CakeCard;
