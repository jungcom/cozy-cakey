-- Essential SQL Queries for Order Availability System
-- Updated to include 2-day advance booking requirement

-- 1. Check if a specific date is available for booking
-- Usage: Check availability for a single date
SELECT 
    date,
    is_available,
    availability_reason,
    current_orders
FROM daily_availability 
WHERE date = '2025-07-15'::date;

-- 2. Get all available dates within a date range
-- Usage: Get available dates for calendar display
SELECT 
    date,
    current_orders,
    availability_reason
FROM daily_availability 
WHERE date >= '2025-07-01'::date 
  AND date <= '2025-07-31'::date 
  AND is_available = true
ORDER BY date;

-- 3. Get all unavailable dates within a date range (for calendar blocking)
-- Usage: Get dates to disable in calendar component
SELECT 
    date,
    availability_reason,
    current_orders
FROM daily_availability 
WHERE date >= '2025-07-01'::date 
  AND date <= '2025-07-31'::date 
  AND is_available = false
ORDER BY date;

-- 4. Get availability summary for a month
-- Usage: Monthly availability overview
SELECT 
    date,
    is_available,
    availability_reason,
    current_orders,
    CASE 
        WHEN is_available THEN 'Available'
        ELSE 'Unavailable'
    END as status
FROM daily_availability 
WHERE date >= date_trunc('month', '2025-07-01'::date)
  AND date < date_trunc('month', '2025-07-01'::date) + INTERVAL '1 month'
ORDER BY date;

-- 5. Get next 7 available dates
-- Usage: Quick booking suggestions
SELECT 
    date,
    availability_reason,
    current_orders
FROM daily_availability 
WHERE is_available = true 
  AND date >= CURRENT_DATE
ORDER BY date 
LIMIT 7;

-- 6. Count orders for a specific date (for debugging)
-- Usage: Verify order count calculations
SELECT 
    delivery_date::date as date,
    COUNT(*) as order_count,
    string_agg(customer_name, ', ') as customers
FROM orders 
WHERE delivery_date::date = '2025-07-15'::date
GROUP BY delivery_date::date;

-- 7. Get availability with detailed order information
-- Usage: Admin view of availability with order details
SELECT 
    da.date,
    da.is_available,
    da.availability_reason,
    da.current_orders,
    COALESCE(
        array_agg(
            o.customer_name || ' (' || o.cake_name || ')'
        ) FILTER (WHERE o.id IS NOT NULL),
        ARRAY[]::text[]
    ) as orders
FROM daily_availability da
LEFT JOIN orders o ON da.date = o.delivery_date::date
WHERE da.date >= '2025-07-01'::date 
  AND da.date <= '2025-07-31'::date
GROUP BY da.date, da.is_available, da.availability_reason, da.current_orders
ORDER BY da.date;

-- 8. Function to check availability for API usage
-- Usage: Create this as a PostgreSQL function for API calls
CREATE OR REPLACE FUNCTION check_date_availability(check_date DATE)
RETURNS TABLE(
    date DATE,
    is_available BOOLEAN,
    reason TEXT,
    current_orders INTEGER,
    max_orders INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        da.date,
        da.is_available,
        da.availability_reason,
        da.current_orders,
        3 as max_orders
    FROM daily_availability da
    WHERE da.date = check_date;
END;
$$ LANGUAGE plpgsql;

-- 9. Function to get available dates in range
-- Usage: Get available dates for calendar component
CREATE OR REPLACE FUNCTION get_available_dates(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE(
    date DATE,
    current_orders INTEGER,
    availability_reason TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        da.date,
        da.current_orders,
        da.availability_reason
    FROM daily_availability da
    WHERE da.date >= start_date 
      AND da.date <= end_date 
      AND da.is_available = true
    ORDER BY da.date;
END;
$$ LANGUAGE plpgsql;

-- 10. Function to get unavailable dates in range  
-- Usage: Get dates to disable in calendar
CREATE OR REPLACE FUNCTION get_unavailable_dates(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE(
    date DATE,
    reason TEXT,
    current_orders INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        da.date,
        da.availability_reason,
        da.current_orders
    FROM daily_availability da
    WHERE da.date >= start_date 
      AND da.date <= end_date 
      AND da.is_available = false
    ORDER BY da.date;
END;
$$ LANGUAGE plpgsql;