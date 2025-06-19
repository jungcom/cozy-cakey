'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaArrowRight } from 'react-icons/fa';

type DayInfo = {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isAvailable: boolean;
};

export default function ScheduleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<DayInfo[]>([]);
  const [monthName, setMonthName] = useState('');
  const [year, setYear] = useState(0);

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // Set month and year for display
    setMonthName(firstDayOfMonth.toLocaleString('default', { month: 'long' }));
    setYear(firstDayOfMonth.getFullYear());

    // Get the day of the week the first day falls on (0 = Sunday, 1 = Monday, etc.)
    const startDay = firstDayOfMonth.getDay();
    
    // Calculate days from previous month to show
    const prevMonthDays = startDay === 0 ? 6 : startDay - 1;
    
    // Create array of days for the calendar
    const daysArray: DayInfo[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add days from previous month
    for (let i = prevMonthDays; i > 0; i--) {
      const date = new Date(firstDayOfMonth);
      date.setDate(-i + 1);
      daysArray.push({
        date,
        dayOfMonth: date.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isAvailable: false
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isSunday = date.getDay() === 0;
      const isPastDate = date < today;
      
      daysArray.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isAvailable: !isSunday && !isPastDate
      });
    }

    // Calculate days from next month to show (to complete the last row)
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(lastDayOfMonth);
        date.setDate(lastDayOfMonth.getDate() + i);
        daysArray.push({
          date,
          dayOfMonth: date.getDate(),
          isCurrentMonth: false,
          isToday: false,
          isAvailable: false
        });
      }
    }

    setDays(daysArray);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(direction === 'prev' ? newDate.getMonth() - 1 : newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">Our Availability</h2>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-amber-100">
          {/* Calendar Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-amber-700 text-white">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full hover:bg-amber-600 transition-colors"
              aria-label="Previous month"
            >
              &larr;
            </button>
            <h3 className="text-xl font-semibold">
              {monthName} {year}
            </h3>
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full hover:bg-amber-600 transition-colors"
              aria-label="Next month"
            >
              &rarr;
            </button>
          </div>
          
          {/* Day Names */}
          <div className="grid grid-cols-7 bg-amber-100">
            {dayNames.map((day) => (
              <div key={day} className="py-2 text-center text-amber-900 font-medium">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              let dayClass = 'p-3 text-center h-16 flex flex-col items-center justify-center border border-amber-50 transition-all duration-200';
              
              if (!day.isCurrentMonth) {
                dayClass += ' text-amber-200 bg-white';
              } else if (day.isToday) {
                dayClass += ' bg-amber-200 font-bold text-amber-900';
              } else if (day.isAvailable) {
                dayClass += ' bg-amber-50 hover:bg-amber-100 cursor-pointer text-amber-900';
              } else {
                dayClass += ' bg-white text-amber-300';
              }
              
              if (day.date.getDay() === 0) { // Sunday
                dayClass += ' bg-amber-50 text-amber-300 line-through';
              }
              
              // Add subtle shadow to current month dates
              if (day.isCurrentMonth) {
                dayClass += ' shadow-sm';
              }
              
              return (
                <div 
                  key={index}
                  className={dayClass}
                  title={!day.isAvailable ? (day.date.getDay() === 0 ? 'Closed on Sundays' : 'Not available') : 'Available for booking'}
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    day.isToday 
                      ? 'bg-amber-700 text-white' 
                      : day.isAvailable 
                        ? 'bg-amber-100 text-amber-900 group-hover:bg-amber-200' 
                        : 'bg-white text-amber-400'
                  }`}>
                    {day.dayOfMonth}
                  </span>
                  {day.isAvailable ? (
                    <span className="text-xs mt-1 font-medium text-amber-700">
                      Available
                    </span>
                  ) : day.date.getDay() === 0 ? (
                    <span className="text-xs text-amber-400">
                      Closed
                    </span>
                  ) : day.isCurrentMonth ? (
                    <span className="text-xs text-amber-400">
                      Booked
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="p-4 bg-amber-50 border-t border-amber-100">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-amber-200 rounded-full mr-2 border border-amber-300"></span>
                <span className="text-amber-900 font-medium">Today</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-amber-100 rounded-full mr-2 border border-amber-200 shadow-sm"></span>
                <span className="text-amber-800">Available</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-white rounded-full mr-2 border-2 border-amber-200"></span>
                <span className="text-amber-500">Booked</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-amber-50 rounded-full mr-2 border border-amber-200 relative">
                  <span className="absolute top-1/2 left-1/2 w-3/4 h-px bg-amber-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                </span>
                <span className="text-amber-400">Closed</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-amber-800 mb-6">
            We're closed on Sundays. Please select an available date to book your order.
          </p>
          <Link href="/order" className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors">
            Book Your Order
          </Link>
        </div>
      </div>
    </section>
  );
}
