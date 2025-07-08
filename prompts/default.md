Based on our calendar component in /components/ui/calendar.tsx and /components/ui/calendar-14.tsx, I want to create a data structure in supabase that can show whether cake orders are available or not on a given date. Help me plan out the DB schema and write the SQL queries to create the tables and insert the data.

- All Mondays and Sundays will be unavailable for booking
- If there are more than three orders in a day, that day will be unavailable to order and be marked as booked.
- If there are less than three orders in a day, that day will be available to order and be marked as available.

The landing page in the schedule calendar should be able to show the availability of the user on a given date, which will be grabbed from the supabase database.
