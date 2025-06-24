'use client';

import Calendar14 from '../ui/calendar-14';
import { FaClock } from 'react-icons/fa';
import { Button } from "../ui/button";

export default function ScheduleCalendar() {
  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
    // Handle date selection (e.g., open booking modal)
  };

  return (
    <section className="py-16 bg-background2">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-tertiary mb-12">Our Availability</h2>
        
        <div className="max-w-2xl mx-auto">
          <Calendar14/>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-tertiary mb-4">Booking Information</h3>
            <p className="text-foreground mb-4">
              Select an available date to book your cake. We're available Tuesday through Saturday, 
              with pickup times between 9 AM and 5 PM.
            </p>
            
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-primary/10">
              <div className="flex items-center text-secondary">
                <FaClock className="mr-2" />
                <span>48h notice required</span>
              </div>
              <button 
                className="flex items-center text-primary hover:text-tertiary transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span className="mr-2">Back to top</span>
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-foreground/80 mb-6">
              We're closed on Sundays. Please select an available date to book your order.
            </p>
            <Button 
              className="px-6 rounded-full"
              onClick={() => {}}
            >
              Book Your Order
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
