import { ReactNode } from 'react';
import Image from 'next/image';

interface HeaderProps {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  children: ReactNode;
}

export default function Header({
  title,
  subtitle,
  image,
  description,
  children,
}: HeaderProps) {
  return (
    <div className="min-h-screen bg-background1 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {title}
            </h1>
            <p className="text-xl font-medium text-amber-800 mb-6">
              {subtitle}
            </p>
            <p className="text-amber-700 mb-8">
              {description}
            </p>
          </div>
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
