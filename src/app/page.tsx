import Hero from '@/components/Hero';
import FeaturedCakes from '@/components/FeaturedCakes';
import ScheduleCalendar from '@/components/ScheduleCalendar';
import AboutSection from '@/components/AboutSection';
import Contacts from '@/components/Contacts';

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
