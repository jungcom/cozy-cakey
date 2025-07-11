'use client';

import { PageContainer } from '@/components/ui/page/PageContainer';
import { PageHeader } from '@/components/ui/page/PageHeader';
import BakerStory from '@/components/about/BakerStory';
import BakerTouch from '@/components/about/BakerTouch';
import SpecialFeatures from '@/components/about/SpecialFeatures';
import CallToAction from '@/components/about/CallToAction';

export default function AboutPage() {
  return (
    <PageContainer className="bg-background1">
      <PageHeader
        title="Our Story"
        subtitle="Baked with Love"
        description="Discover the passion and dedication behind every cake we create"
      />
      
      <div className="max-w-4xl mx-auto space-y-16">
        <BakerStory />
        <BakerTouch />
        <SpecialFeatures />
        <CallToAction />
      </div>
    </PageContainer>
  );
}