import Image from 'next/image';

interface CakeImageDescriptionProps {
  cake: {
    name: string;
    image?: string;
    description: string;
  };
  className?: string;
}

export default function CakeImageDescription({ cake, className = '' }: CakeImageDescriptionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        {cake.image ? (
          <Image
            src={cake.image}
            alt={cake.name || 'Cake image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{cake.name}</h2>
        <p className="text-gray-600">{cake.description}</p>
      </div>
    </div>
  );
}