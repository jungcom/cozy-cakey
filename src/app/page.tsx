'use client';

import Hero from '@/components/MainPage/Hero';
import FeaturedCakes from '@/components/MainPage/FeaturedCakes';
import ScheduleCalendar from '@/components/MainPage/ScheduleCalendar';
import AboutSection from '@/components/MainPage/AboutSection';
import Contacts from '@/components/MainPage/Contacts';

const HOME_SECTIONS = [
  Hero,
  FeaturedCakes,
  ScheduleCalendar,
  AboutSection,
  Contacts,
] as const;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {HOME_SECTIONS.map((Section, index) => (
        <Section key={index} />
      ))}
    </div>
  );
}
