'use client';

import Hero from '@/components/MainPage/Hero';
import FeaturedCakes from '@/components/MainPage/FeaturedCakes';
import ScheduleCalendar from '@/components/MainPage/ScheduleCalendar';
import AboutSection from '@/components/MainPage/AboutSection';
import Contacts from '@/components/MainPage/Contacts';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCakes />
      <ScheduleCalendar />
      <AboutSection />
      <Contacts />
    </div>
  );
}
