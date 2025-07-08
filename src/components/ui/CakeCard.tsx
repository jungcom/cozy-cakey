import Image from 'next/image';
import { useState } from 'react';
import { Button } from './button';

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

const CollectionCakeCard = ({ id, name, image, alt }: BaseCakeCardProps & { price?: string }) => {
  const [imageError, setImageError] = useState(false);

  // Route directly to order form for catering category
  const href = id === 'catering' ? '/collection/catering/order' : `/collection/${id}`;

  return (
    <a 
      href={href} 
      className="group block h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background to-background1 border-2 border-primary/30 hover:border-secondary/50 transform hover:-translate-y-2"
    >
      {/* Image container */}
      <div className="relative aspect-[6/5] w-full overflow-hidden">
        <Image
          src={imageError ? '/images/placeholder-cake.svg' : image}
          alt={alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Content */}
      <div className="p-4 bg-gradient-to-br from-background1/90 to-background2/70 backdrop-blur-sm flex items-center h-16">
        <h3 className="text-2xl font-bold text-tertiary group-hover:text-secondary transition-colors duration-300 leading-tight">
          {name}
        </h3>
      </div>
    </a>
  );
};

const OrderCakeCard = ({ id, name, image, alt, price }: BaseCakeCardProps & { price?: string }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <a 
      href={`/collection/design/order?cakeId=${id}`}
      className="group block h-full rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-amber-200"
      aria-label={`View details for ${name}`}
    >
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
        <h3 className="text-lg font-medium text-gray-900 text-center group-hover:text-amber-700 transition-colors">
          {name}
        </h3>
        {price && (
          <p className="text-amber-600 font-medium text-center mt-2 group-hover:text-amber-700 transition-colors">
            {price}
          </p>
        )}
      </div>
    </a>
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
