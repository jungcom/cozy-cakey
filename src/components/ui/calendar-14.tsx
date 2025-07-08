"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

interface UnavailableDate {
  date: string;
  reason: string;
  currentOrders: number;
}

export default function Calendar14() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date()
  )
  const [unavailableDates, setUnavailableDates] = React.useState<UnavailableDate[]>([])
  const [loading, setLoading] = React.useState(true)

  // Fetch unavailable dates from database
  React.useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const today = new Date()
        // Start from 3 months ago to cover past dates shown in calendar
        const startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1)
        const endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
        
        const response = await fetch(`/api/availability?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`)
        const data = await response.json()
        
        console.log('Availability API response:', data) // Debug logging
        
        if (data.unavailableDates) {
          setUnavailableDates(data.unavailableDates)
          console.log('Set unavailable dates:', data.unavailableDates.length) // Debug logging
        }
      } catch (error) {
        console.error('Error fetching availability:', error)
        // Fallback to hardcoded rules if API fails
        setUnavailableDates([])
      } finally {
        setLoading(false)
      }
    }

    fetchUnavailableDates()
  }, [])

  // Create a set of unavailable date strings for quick lookup
  const unavailableDateStrings = React.useMemo(() => {
    return new Set(unavailableDates.map(item => item.date))
  }, [unavailableDates])

  // Function to check if a date is unavailable based on database data
  const isUnavailable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return unavailableDateStrings.has(dateString)
  }

  // Function to check if a date is fully booked (3+ orders)
  const isFullyBooked = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    const dateInfo = unavailableDates.find(item => item.date === dateString)
    return dateInfo?.reason === 'Fully booked (3+ orders)'
  }

  // Function to check if a date is closed (Sundays/Mondays)
  const isClosed = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    const dateInfo = unavailableDates.find(item => item.date === dateString)
    return dateInfo?.reason === 'Closed on Sundays and Mondays'
  }

  // Function to check if a date is past/advance booking restricted
  const isAdvanceBookingRestricted = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    const dateInfo = unavailableDates.find(item => item.date === dateString)
    return dateInfo?.reason === 'Past date' || 
           dateInfo?.reason === 'Cannot book same day' || 
           dateInfo?.reason === 'Cannot book for tomorrow (2-day advance required)'
  }

  // Fallback functions if API is not available
  const isSunday = (date: Date) => date.getDay() === 0
  const isSaturday = (date: Date) => date.getDay() === 6;
  const isMonday = (date: Date) => date.getDay() === 1;
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="mx-auto my-8 w-fit">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-12 w-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      disabled={(date) => {
        // Always disable past dates and today/tomorrow regardless of API status
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        
        if (date <= tomorrow) {
          return true // Disable past, today, and tomorrow
        }
        
        // Use database data if available, otherwise fall back to hardcoded rules
        if (unavailableDates.length > 0) {
          return isUnavailable(date)
        }
        
        // Fallback to original logic (only for future dates)
        return isSunday(date) || isMonday(date)
      }}
      modifiers={{
        booked: (date) => isFullyBooked(date),
        closed: (date) => isClosed(date),
        pastOrAdvanceRestricted: (date) => isAdvanceBookingRestricted(date),
      }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100 [&>button]:text-red-500",
        closed: "[&>button]:opacity-50 [&>button]:text-gray-400",
        pastOrAdvanceRestricted: "[&>button]:opacity-30 [&>button]:text-gray-500 [&>button]:cursor-not-allowed",
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
