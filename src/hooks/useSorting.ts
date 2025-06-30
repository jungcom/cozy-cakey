import { useMemo, useState } from 'react';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface SortableItem {
  name: string;
  price: number;
}

export function useSorting<T extends SortableItem>(items: T[], initialSort: SortOption = 'name-asc') {
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [items, sortBy]);

  return {
    sortedItems,
    sortBy,
    setSortBy,
  };
}