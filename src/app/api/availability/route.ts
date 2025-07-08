import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')
    const date = searchParams.get('date')

    // If checking a specific date
    if (date) {
      const { data, error } = await supabase
        .rpc('check_date_availability', { check_date: date })

      if (error) {
        console.error('Error checking date availability:', error)
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
      }

      return NextResponse.json({ 
        date: date,
        available: data[0]?.is_available || false,
        reason: data[0]?.reason || 'Unknown',
        currentOrders: data[0]?.current_orders || 0,
        maxOrders: data[0]?.max_orders || 3
      })
    }

    // If getting unavailable dates for a range (used by calendar)
    if (startDate && endDate) {
      const { data, error } = await supabase
        .rpc('get_unavailable_dates', { 
          start_date: startDate, 
          end_date: endDate 
        })

      if (error) {
        console.error('Error getting unavailable dates:', error)
        return NextResponse.json({ error: 'Failed to get availability data' }, { status: 500 })
      }

      return NextResponse.json({ 
        unavailableDates: data.map(item => ({
          date: item.date,
          reason: item.reason,
          currentOrders: item.current_orders
        }))
      })
    }

    // If no parameters provided, return error
    return NextResponse.json({ 
      error: 'Please provide either a date parameter or start/end date range' 
    }, { status: 400 })

  } catch (error) {
    console.error('Availability API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dates } = body

    if (!dates || !Array.isArray(dates)) {
      return NextResponse.json({ error: 'Please provide an array of dates' }, { status: 400 })
    }

    // Check availability for multiple dates
    const results = await Promise.all(
      dates.map(async (date: string) => {
        const { data, error } = await supabase
          .rpc('check_date_availability', { check_date: date })

        if (error) {
          console.error(`Error checking availability for ${date}:`, error)
          return { date, available: false, reason: 'Error checking availability' }
        }

        return {
          date,
          available: data[0]?.is_available || false,
          reason: data[0]?.reason || 'Unknown',
          currentOrders: data[0]?.current_orders || 0,
          maxOrders: data[0]?.max_orders || 3
        }
      })
    )

    return NextResponse.json({ availability: results })

  } catch (error) {
    console.error('Availability API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}