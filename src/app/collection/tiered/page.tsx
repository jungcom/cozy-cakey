'use client';

import CakeCard from '@/components/ui/CakeCard';
import { PageContainer } from '@/components/ui/page/PageContainer';
import { PageHeader } from '@/components/ui/page/PageHeader';
import { tieredCakes } from '@/data/cakes';

export default function TieredCakesPage() {
  return (
    <PageContainer className="bg-amber-50">
      <PageHeader
        title="Tiered & Tall Cakes"
        subtitle="Choose between our stunning tiered cakes for special celebrations or elegant tall cakes with impressive height."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {tieredCakes.map((cake) => (
          <CakeCard
            key={cake.id}
            id={cake.id}
            name={cake.name}
            description={cake.description}
            image={cake.image || '/images/placeholder-cake.jpg'}
            alt={cake.alt || `${cake.name} cake`}
            variant="collection"
          />
        ))}
      </div>
    </PageContainer>
  );
}