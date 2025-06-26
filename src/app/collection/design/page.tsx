'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/CollectionPage/CollectionListPage/Header';
import CakeList from '@/components/CollectionPage/CollectionListPage/CakeList';
import Footer from '@/components/CollectionPage/CollectionListPage/Footer';
import { designCakes } from '@/data/cakes';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function DesignCakesPage() {
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const sortedCakes = useMemo(() => {
    return [...designCakes].sort((a, b) => {
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
  }, [sortBy]);

  return (
    <Header
      title="Design Cake"
      subtitle="Browse our selection of delicious cakes. Click on any cake to customize your order."
      image="/images/cakes/design/Princess.jpeg"
      description="Each cake is handcrafted with the finest ingredients and customized to your preferences. Choose from our signature designs or create your own unique creation."
    >
      <CakeList 
        sortedCakes={sortedCakes} 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
      />
      <Footer />
    </Header>
  );
}