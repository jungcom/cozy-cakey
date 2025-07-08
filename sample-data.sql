-- Sample Data Insertion Script for Testing Availability System

-- 1. Insert business rules (already done above, but included for completeness)
INSERT INTO availability_rules (rule_type, rule_value, is_available, description) 
VALUES 
    ('day_of_week', '{"day": 0}', false, 'Closed on Sundays'),
    ('day_of_week', '{"day": 1}', false, 'Closed on Mondays'),
    ('daily_limit', '{"max_orders": 3}', true, 'Maximum 3 orders per day'),
    ('advance_booking', '{"min_days": 2}', false, 'Minimum 2 days advance booking required - cannot book for past, current, or tomorrow')
ON CONFLICT DO NOTHING;

-- 2. Sample holiday rules (can be added as needed)
INSERT INTO availability_rules (rule_type, rule_value, is_available, description) 
VALUES 
    ('specific_date', '{"date": "2025-12-25"}', false, 'Closed on Christmas Day'),
    ('specific_date', '{"date": "2025-01-01"}', false, 'Closed on New Year Day'),
    ('date_range', '{"start": "2025-08-15", "end": "2025-08-20"}', false, 'Vacation week')
ON CONFLICT DO NOTHING;

-- 3. Sample test orders to demonstrate availability logic
-- Note: These are just examples and should be adapted to your actual order schema

-- Create some orders for testing (assuming the orders table structure)
-- These will make July 15th fully booked (7 orders > 3 limit)
INSERT INTO orders (
    cake_id, 
    cake_name, 
    size, 
    flavor, 
    delivery_date, 
    pickup_time,
    customer_name, 
    email, 
    phone, 
    customer_type,
    delivery_option,
    payment_method,
    allergy_agreement,
    total_price,
    order_data
) VALUES 
    ('test1', 'Vanilla Cake', '8', 'Vanilla', '2025-07-15', '2:00 PM', 'John Doe', 'john@example.com', '555-0001', 'new', 'pickup', 'venmo', true, 45.00, '{}'),
    ('test2', 'Chocolate Cake', '6', 'Chocolate', '2025-07-15', '3:00 PM', 'Jane Smith', 'jane@example.com', '555-0002', 'new', 'pickup', 'venmo', true, 35.00, '{}'),
    ('test3', 'Red Velvet Cake', '10', 'Red Velvet', '2025-07-15', '4:00 PM', 'Bob Johnson', 'bob@example.com', '555-0003', 'new', 'pickup', 'venmo', true, 55.00, '{}'),
    ('test4', 'Strawberry Cake', '8', 'Strawberry', '2025-07-15', '5:00 PM', 'Alice Brown', 'alice@example.com', '555-0004', 'new', 'pickup', 'venmo', true, 45.00, '{}'),
    ('test5', 'Lemon Cake', '6', 'Lemon', '2025-07-15', '6:00 PM', 'Charlie Wilson', 'charlie@example.com', '555-0005', 'new', 'pickup', 'venmo', true, 35.00, '{}'),
    ('test6', 'Carrot Cake', '8', 'Carrot', '2025-07-15', '7:00 PM', 'Diana Davis', 'diana@example.com', '555-0006', 'new', 'pickup', 'venmo', true, 45.00, '{}'),
    ('test7', 'Funfetti Cake', '6', 'Funfetti', '2025-07-15', '8:00 PM', 'Eve Miller', 'eve@example.com', '555-0007', 'new', 'pickup', 'venmo', true, 35.00, '{}')
ON CONFLICT DO NOTHING;

-- Create orders for July 8th (2 orders, still available for 1 more)
INSERT INTO orders (
    cake_id, 
    cake_name, 
    size, 
    flavor, 
    delivery_date, 
    pickup_time,
    customer_name, 
    email, 
    phone, 
    customer_type,
    delivery_option,
    payment_method,
    allergy_agreement,
    total_price,
    order_data
) VALUES 
    ('test8', 'Birthday Cake', '8', 'Vanilla', '2025-07-08', '2:00 PM', 'Grace Lee', 'grace@example.com', '555-0008', 'new', 'pickup', 'venmo', true, 45.00, '{}'),
    ('test9', 'Wedding Cake', '12', 'Vanilla', '2025-07-08', '4:00 PM', 'Henry Kim', 'henry@example.com', '555-0009', 'new', 'pickup', 'venmo', true, 65.00, '{}')
ON CONFLICT DO NOTHING;

-- Create orders for July 16th (1 order, available for 2 more)
INSERT INTO orders (
    cake_id, 
    cake_name, 
    size, 
    flavor, 
    delivery_date, 
    pickup_time,
    customer_name, 
    email, 
    phone, 
    customer_type,
    delivery_option,
    payment_method,
    allergy_agreement,
    total_price,
    order_data
) VALUES 
    ('test10', 'Anniversary Cake', '10', 'Chocolate', '2025-07-16', '3:00 PM', 'Ivy Chen', 'ivy@example.com', '555-0010', 'new', 'pickup', 'venmo', true, 55.00, '{}')
ON CONFLICT DO NOTHING;