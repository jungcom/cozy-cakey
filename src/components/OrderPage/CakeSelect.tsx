'use client';

import { Cake } from 'lucide-react';
import { CakeType, Size } from './types';

interface CakeSelectProps {
  cakeTypes: CakeType[];
  selectedCake: string;
  onCakeSelect: (id: string) => void;
  sizes: Size[];
  selectedSize: string;
  onSizeSelect: (id: string) => void;
  selectedFlavor: string;
  onFlavorSelect: (flavor: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
}

const flavors = [
  'Vanilla',
  'Chocolate',
  'Strawberry',
  'Red Velvet',
  'Lemon',
  'Carrot',
  'Funfetti',
  'Marble',
  'Coconut',
  'Coffee'
];

export function CakeSelect({
  cakeTypes,
  selectedCake,
  onCakeSelect,
  sizes,
  selectedSize,
  onSizeSelect,
  selectedFlavor,
  onFlavorSelect,
  message,
  onMessageChange
}: CakeSelectProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-tertiary flex items-center mb-6">
          <Cake className="mr-2" />
          Select Your Cake
        </h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-3 font-medium">Cake Type</label>
          <div className="grid grid-cols-2 gap-4">
            {cakeTypes.map((cake) => (
              <button
                key={cake.id}
                type="button"
                onClick={() => onCakeSelect(cake.id)}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedCake === cake.id
                    ? 'border-tertiary bg-tertiary/10'
                    : 'border-gray-200 hover:border-tertiary/50'
                }`}
              >
                <h3 className="font-medium text-lg">{cake.name}</h3>
                <p className="text-gray-600 text-sm">Starting at ${cake.price}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-3 font-medium">Flavor</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flavors.map((flavor) => (
              <button
                key={flavor}
                type="button"
                onClick={() => onFlavorSelect(flavor)}
                className={`p-3 border rounded-md text-center transition-colors ${
                  selectedFlavor === flavor
                    ? 'bg-tertiary text-white border-tertiary'
                    : 'border-gray-200 hover:border-tertiary/50'
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-3 font-medium">Size</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => onSizeSelect(size.id)}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedSize === size.id
                    ? 'border-tertiary bg-tertiary/10'
                    : 'border-gray-200 hover:border-tertiary/50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{size.name}</h3>
                    <p className="text-sm text-gray-600">{size.servings} servings</p>
                  </div>
                  <span className="font-medium">+${size.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 mb-3 font-medium">
            Special Instructions
          </label>
          <textarea
            id="message"
            rows={3}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-tertiary focus:border-transparent"
            placeholder="Add any special requests or decorations..."
          />
        </div>
      </div>
    </div>
  );
}
