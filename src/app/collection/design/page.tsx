'use client';

import Header from '@/components/CollectionPage/CollectionListPage/Header';
import CakeList from '@/components/CollectionPage/CollectionListPage/CakeList';
import Footer from '@/components/CollectionPage/CollectionListPage/Footer';
import { designCakes } from '@/data/cakes';
import { useSorting } from '@/hooks/useSorting';

export default function DesignCakesPage() {
  const { sortedItems: sortedCakes, sortBy, setSortBy } = useSorting(designCakes);

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