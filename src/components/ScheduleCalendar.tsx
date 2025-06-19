'use client';

import { FaClock } from 'react-icons/fa';
import Calendar from './ui/Calendar';

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
          <Calendar onDateSelect={handleDateSelect} />
          
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

          {/* Legend */}
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-medium text-tertiary mb-3">Legend</h4>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-secondary rounded-full mr-2"></span>
                <span className="text-foreground">Today</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-white rounded-full mr-2 border-2 border-primary"></span>
                <span className="text-foreground">Available</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-white rounded-full mr-2 border-2 border-foreground/30"></span>
                <span className="text-foreground/70">Booked</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-background1 rounded-full mr-2 border-2 border-foreground/20 relative">
                  <span className="absolute top-1/2 left-1/2 w-3/4 h-px bg-foreground/40 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                </span>
                <span className="text-foreground/50">Closed</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-foreground/80 mb-6">
              We're closed on Sundays. Please select an available date to book your order.
            </p>
            <button 
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
              onClick={() => {}}
            >
              Book Your Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
