'use client';

import CakeCard from '@/components/ui/CakeCard';
import { PageContainer } from '@/components/ui/page/PageContainer';
import { PageHeader } from '@/components/ui/page/PageHeader';
import { cakeCategories } from '@/data/cakes';

export default function CollectionPage() {
  return (
    <PageContainer className="bg-background1">
      <PageHeader
        title="Our Cake Collection"
        subtitle="Explore our delicious selection of handcrafted cakes, each made with the finest ingredients and a touch of love."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cakeCategories.map((cake) => (
          <CakeCard
            key={cake.id}
            id={cake.id}
            name={cake.name}
            description={cake.description}
            image={cake.image || '/images/cakes/default-cake.jpg'}
            alt={cake.alt || `${cake.name} cake`}
            variant="collection"
          />
        ))}
      </div>
    </PageContainer>
  );
}
