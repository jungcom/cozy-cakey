# Order Availability Database Schema Plan

## Current Analysis
- Calendar component at `src/components/ui/calendar-14.tsx:27` currently disables Sundays, Saturdays, Mondays, and past dates
- Existing `orders` table in Supabase with `delivery_date` field
- Need to create availability system based on:
  - Business rules (closed Sundays/Mondays)
  - Daily order limits (max 3 orders per day)
  - Advance booking requirement (2 days minimum - no booking for past, current, or tomorrow)
  - Real-time availability checking

## Database Schema Design

### 1. Availability Rules Table
```sql
CREATE TABLE availability_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_type VARCHAR(50) NOT NULL, -- 'day_of_week', 'date_range', 'holiday'
  rule_value JSONB NOT NULL, -- Flexible storage for different rule types
  is_available BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Daily Availability View
```sql
CREATE VIEW daily_availability AS
WITH date_series AS (
  SELECT generate_series(
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '365 days',
    INTERVAL '1 day'
  )::date AS date
),
business_rules AS (
  SELECT 
    ds.date,
    CASE 
      WHEN EXTRACT(DOW FROM ds.date) IN (0, 1) THEN false -- Sunday=0, Monday=1
      ELSE true
    END AS open_by_schedule
),
order_counts AS (
  SELECT 
    delivery_date::date AS date,
    COUNT(*) AS order_count
  FROM orders
  GROUP BY delivery_date::date
)
SELECT 
  br.date,
  br.open_by_schedule,
  COALESCE(oc.order_count, 0) AS current_orders,
  CASE 
    WHEN br.open_by_schedule = false THEN false
    WHEN COALESCE(oc.order_count, 0) >= 3 THEN false
    ELSE true
  END AS is_available,
  CASE 
    WHEN br.date < CURRENT_DATE THEN 'Past date'
    WHEN br.date = CURRENT_DATE THEN 'Cannot book same day'
    WHEN br.date = CURRENT_DATE + INTERVAL '1 day' THEN 'Cannot book for tomorrow (2-day advance required)'
    WHEN EXTRACT(DOW FROM br.date) IN (0, 1) THEN 'Closed on Sundays and Mondays'
    WHEN COALESCE(oc.order_count, 0) >= 3 THEN 'Fully booked (3+ orders)'
    ELSE 'Available'
  END AS availability_reason
FROM business_rules br
LEFT JOIN order_counts oc ON br.date = oc.date
ORDER BY br.date;
```

## Implementation Tasks

### ✅ 1. Analyze current calendar implementation and requirements
- Reviewed calendar components and existing order system
- Identified current hardcoded availability rules
- Understood existing database structure

### 🔄 2. Design database schema for order availability tracking
- Created availability_rules table design
- Designed daily_availability view for efficient querying
- Planned flexible rule system for future expansion

### ⏳ 3. Create availability_rules table for business rules
- Run SQL migration to create availability_rules table
- Insert initial business rules (closed Sundays/Mondays)

### ⏳ 4. Create daily_availability view for efficient querying
- Create view that combines business rules with order counts
- Optimize for calendar component consumption

### ⏳ 5. Write SQL queries for availability checking
- Query to check if specific date is available
- Query to get available dates for date range
- Query to get availability status with reasons

### ⏳ 6. Create sample data insertion scripts
- Insert default business rules
- Create test orders to verify availability logic

### ⏳ 7. Update calendar component to use database availability
- Modify calendar-14.tsx to fetch availability from database
- Update disabled date logic to use API endpoint

### ✅ 8. Add rule to prevent booking on past, current, and tomorrow
- Updated daily_availability view to include 2-day advance booking requirement
- Added advance_booking rule to availability_rules table
- Updated documentation and sample data

## SQL Implementation Details

### Business Rules to Insert
```sql
-- Sunday closure rule
INSERT INTO availability_rules (rule_type, rule_value, is_available) 
VALUES ('day_of_week', '{"day": 0}', false);

-- Monday closure rule  
INSERT INTO availability_rules (rule_type, rule_value, is_available)
VALUES ('day_of_week', '{"day": 1}', false);

-- Daily order limit rule (handled in view logic)
-- Max 3 orders per day
```

### Key Queries
1. **Check date availability**: `SELECT is_available FROM daily_availability WHERE date = $1`
2. **Get available dates**: `SELECT date FROM daily_availability WHERE date >= $1 AND date <= $2 AND is_available = true`
3. **Get availability with details**: `SELECT date, is_available, current_orders, open_by_schedule FROM daily_availability WHERE date = $1`

## Benefits of This Approach
- ✅ Flexible rule system can handle complex business logic
- ✅ Real-time availability based on actual order counts
- ✅ Efficient querying with materialized view approach
- ✅ Easy to extend with holidays, special dates, etc.
- ✅ Calendar component gets simple boolean availability data