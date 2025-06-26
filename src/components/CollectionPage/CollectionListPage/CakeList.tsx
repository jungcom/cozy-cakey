import { Cake } from '@/data/cakes';
import CakeCard from '@/components/ui/CakeCard';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface CakeListProps {
  sortedCakes: Cake[];
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function CakeList({ sortedCakes, sortBy, onSortChange }: CakeListProps) {
  return (
    <>
      {/* Sort Controls and Results Count */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="sort-by" className="text-sm font-medium text-amber-900 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="block w-48 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        
        {/* Results Count */}
        <p className="text-amber-800 text-sm">
          {sortedCakes.length} {sortedCakes.length === 1 ? 'cake' : 'cakes'} found
        </p>
      </div>
      
      {/* Cakes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCakes.map((cake) => (
          <div key={cake.id} className="h-full">
            <CakeCard
              variant="order"
              id={cake.id}
              name={cake.name}
              description={cake.description}
              image={cake.image || '/images/placeholder-cake.jpg'}
              alt={cake.alt || `${cake.name} cake`}
              price={`$${cake.price.toFixed(2)}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
