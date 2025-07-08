"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, X } from "lucide-react"

interface UnavailableDate {
  date: string;
  reason: string;
  currentOrders: number;
}

interface AvailabilityDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: 'delivery' | 'pickup';
  required?: boolean;
  className?: string;
  error?: string;
}

export default function AvailabilityDatePicker({
  value,
  onChange,
  label,
  required = false,
  className = "",
  error
}: AvailabilityDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [unavailableDates, setUnavailableDates] = React.useState<UnavailableDate[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined)

  // Fetch unavailable dates from database
  React.useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const today = new Date()
        const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
        
        const response = await fetch(`/api/availability?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`)
        const data = await response.json()
        
        if (data.unavailableDates) {
          setUnavailableDates(data.unavailableDates)
        }
      } catch (error) {
        console.error('Error fetching availability:', error)
        setUnavailableDates([])
      } finally {
        setLoading(false)
      }
    }

    fetchUnavailableDates()
  }, [])

  // Update selected date when value prop changes
  React.useEffect(() => {
    if (value && value.trim() !== '') {
      // Parse date string as local date to avoid timezone issues
      const [year, month, day] = value.split('-').map(Number)
      if (year && month && day) {
        const parsedDate = new Date(year, month - 1, day)
        console.log('Parsing value:', value, 'to date:', parsedDate) // Debug log
        setSelectedDate(parsedDate)
      }
    } else {
      setSelectedDate(undefined)
    }
  }, [value])

  // Create a set of unavailable date strings for quick lookup
  const unavailableDateStrings = React.useMemo(() => {
    return new Set(unavailableDates.map(item => item.date))
  }, [unavailableDates])

  // Function to check if a date is unavailable based on database data
  const isUnavailable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return unavailableDateStrings.has(dateString)
  }


  // Fallback functions if API is not available
  const isSunday = (date: Date) => date.getDay() === 0
  const isMonday = (date: Date) => date.getDay() === 1;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Create a new date to ensure we're working with the exact selected date
      const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      setSelectedDate(selectedDate)
      
      // Format date as YYYY-MM-DD in local timezone to avoid timezone issues
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const dateString = `${year}-${month}-${day}`
      
      console.log('Selected date:', selectedDate, 'Formatted string:', dateString) // Debug log
      onChange(dateString)
      setIsOpen(false)
    }
  }

  const formatDisplayDate = (date: Date) => {
    // Create date parts manually to ensure accuracy
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    const dayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]
    
    const dayOfWeek = new Date(year, month, day).getDay()
    
    return `${dayNames[dayOfWeek]}, ${monthNames[month]} ${day}, ${year}`
  }

  const clearDate = () => {
    setSelectedDate(undefined)
    onChange('')
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-medium">
        {label === 'delivery' ? 'Delivery' : 'Pickup'} Date {required && <span className="text-red-500">*</span>}
      </h3>
      
      <div className="relative">
        <div className="flex">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex-1 justify-start text-left font-normal ${
              !selectedDate ? 'text-gray-500' : ''
            } ${error ? 'border-red-500' : ''}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? formatDisplayDate(selectedDate) : `Select ${label} date`}
          </Button>
          
          {selectedDate && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearDate}
              className="ml-2 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => {
                  // Always disable past dates and today/tomorrow regardless of API status
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  const tomorrow = new Date(today)
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  
                  if (date <= tomorrow) {
                    return true
                  }
                  
                  // Use database data if available, otherwise fall back to hardcoded rules
                  if (unavailableDates.length > 0) {
                    return isUnavailable(date)
                  }
                  
                  // Fallback to original logic (only for future dates)
                  return isSunday(date) || isMonday(date)
                }}
                className="w-auto"
                showOutsideDays={false}
              />
            )}
          </div>
        )}
      </div>

      {/* Hidden input for form compatibility */}
      <Input
        type="hidden"
        id={`${label}-date`}
        name={label === 'delivery' ? 'deliveryDate' : 'pickupDate'}
        value={value}
        required={required}
      />

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}