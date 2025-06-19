'use client';

import { useState, useEffect } from 'react';

type DayInfo = {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isAvailable: boolean;
};

type CalendarProps = {
  onDateSelect?: (date: Date) => void;
  className?: string;
};

export default function Calendar({ onDateSelect, className = '' }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<DayInfo[]>([]);
  const [monthName, setMonthName] = useState('');
  const [year, setYear] = useState(0);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

    setMonthName(firstDayOfMonth.toLocaleString('default', { month: 'long' }));
    setYear(firstDayOfMonth.getFullYear());

    const startDay = firstDayOfMonth.getDay();
    const prevMonthDays = startDay === 0 ? 6 : startDay - 1;
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

    // Add days from next month to complete the grid
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

  const handleDateClick = (day: DayInfo) => {
    if (day.isAvailable && onDateSelect) {
      onDateSelect(day.date);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden border border-primary/20 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-tertiary">
        <button 
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-full hover:bg-primary/80 transition-colors text-white"
          aria-label="Previous month"
        >
          &larr;
        </button>
        <h3 className="text-xl font-semibold text-white">
          {monthName} {year}
        </h3>
        <button 
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-full hover:bg-primary/80 transition-colors text-white"
          aria-label="Next month"
        >
          &rarr;
        </button>
      </div>
      
      {/* Day Names */}
      <div className="grid grid-cols-7 bg-primary/10">
        {dayNames.map((day) => (
          <div key={day} className="py-2 text-center text-tertiary font-medium text-sm">
            {day.toUpperCase()}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          let dayClass = 'p-3 text-center h-16 flex flex-col items-center justify-center border border-primary/10 transition-all duration-200';
          
          if (!day.isCurrentMonth) {
            dayClass += ' text-foreground/30 bg-white';
          } else if (day.isToday) {
            dayClass += ' bg-secondary text-white font-semibold';
          } else if (day.isAvailable) {
            dayClass += ' bg-white hover:bg-primary/5 cursor-pointer text-foreground';
          } else {
            dayClass += ' bg-white text-foreground/30';
          }
          
          if (day.date.getDay() === 0) { // Sunday
            dayClass += ' bg-background1 text-foreground/30';
          }
          
          if (day.isCurrentMonth) {
            dayClass += ' shadow-sm';
          }
          
          return (
            <div 
              key={index}
              className={dayClass}
              onClick={() => handleDateClick(day)}
              title={!day.isAvailable ? (day.date.getDay() === 0 ? 'Closed on Sundays' : 'Not available') : 'Available for booking'}
            >
              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                day.isToday 
                  ? 'bg-secondary text-white font-semibold' 
                  : day.isAvailable 
                    ? 'hover:bg-primary/10' 
                    : ''
              }`}>
                {day.dayOfMonth}
              </span>
              {day.isAvailable ? (
                <span className="text-xs mt-1 font-medium text-secondary">
                  Available
                </span>
              ) : day.date.getDay() === 0 ? (
                <span className="text-xs text-foreground/40">
                  Closed
                </span>
              ) : day.isCurrentMonth ? (
                <span className="text-xs text-foreground/40">
                  Booked
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
