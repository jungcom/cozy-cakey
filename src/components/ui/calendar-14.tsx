"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function Calendar14() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )
  // Function to check if a date is Sunday
  const isSunday = (date: Date) => date.getDay() === 0
  const isSaturday = (date: Date) => date.getDay() === 6;
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison
    return date <= today;
  };

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      disabled={(date) => isSunday(date) || isSaturday(date) || isPastDate(date)}
      modifiers={{
        booked: isSaturday,
      }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
        today: "bg-primary text-foreground font-bold rounded hover:bg-secondary",
      }}
      className={`
        /* Layout & Spacing */
        mx-auto my-8 w-fit
        
        /* Visual Styling */
        rounded-lg border border-secondary/20 shadow-sm
        bg-background1
        
        /* Button Styling */
        [&_button]:h-12 [&_button]:w-12 [&_button]:text-lg
      `}
      showOutsideDays={false}
    />
  )
}
