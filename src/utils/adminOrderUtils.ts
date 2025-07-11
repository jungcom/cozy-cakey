import { type Order } from '@/lib/supabase';
import { toBusinessTimezone, formatDateInBusinessTimezone } from '@/utils/timezone';

/**
 * Gets the status color class based on delivery date
 */
export function getStatusColor(deliveryDate: string): string {
  const today = toBusinessTimezone(new Date());
  const delivery = toBusinessTimezone(deliveryDate);
  const diffDays = Math.ceil((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'bg-red-100 text-red-800';
  if (diffDays <= 2) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
}

/**
 * Gets the status text based on delivery date
 */
export function getStatusText(deliveryDate: string): string {
  const today = toBusinessTimezone(new Date());
  const delivery = toBusinessTimezone(deliveryDate);
  const diffDays = Math.ceil((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 2) return 'Urgent';
  return 'Scheduled';
}

/**
 * Filters orders based on search term
 */
export function filterOrders(orders: Order[], searchTerm: string): Order[] {
  if (!searchTerm.trim()) return orders;
  
  const searchLower = searchTerm.toLowerCase();
  return orders.filter(order => {
    return (
      order.customer_name.toLowerCase().includes(searchLower) ||
      order.email.toLowerCase().includes(searchLower) ||
      order.phone.includes(searchTerm) ||
      order.cake_name.toLowerCase().includes(searchLower) ||
      order.id?.toLowerCase().includes(searchLower)
    );
  });
}

/**
 * Formats order data for display
 */
export function formatOrderForDisplay(order: Order) {
  return {
    ...order,
    formattedDeliveryDate: formatDateInBusinessTimezone(order.delivery_date),
    formattedCreatedAt: order.created_at ? formatDateInBusinessTimezone(order.created_at) : '',
    statusColor: getStatusColor(order.delivery_date),
    statusText: getStatusText(order.delivery_date),
    formattedPrice: `$${order.total_price.toFixed(2)}`,
  };
}

/**
 * Sorts orders by specified criteria
 */
export function sortOrders(orders: Order[], sortBy: string, sortOrder: 'asc' | 'desc'): Order[] {
  const sorted = [...orders].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'created_at':
        aValue = new Date(a.created_at || 0);
        bValue = new Date(b.created_at || 0);
        break;
      case 'delivery_date':
        aValue = new Date(a.delivery_date);
        bValue = new Date(b.delivery_date);
        break;
      case 'customer_name':
        aValue = a.customer_name.toLowerCase();
        bValue = b.customer_name.toLowerCase();
        break;
      case 'total_price':
        aValue = a.total_price;
        bValue = b.total_price;
        break;
      case 'cake_name':
        aValue = a.cake_name.toLowerCase();
        bValue = b.cake_name.toLowerCase();
        break;
      default:
        aValue = a.created_at;
        bValue = b.created_at;
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

/**
 * Gets order statistics
 */
export function getOrderStats(orders: Order[]) {
  const total = orders.length;
  const today = toBusinessTimezone(new Date());
  
  const upcomingCount = orders.filter(order => {
    const delivery = toBusinessTimezone(order.delivery_date);
    const diffDays = Math.ceil((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;
  
  const overdueCount = orders.filter(order => {
    const delivery = toBusinessTimezone(order.delivery_date);
    return delivery < today;
  }).length;
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
  
  return {
    total,
    upcoming: upcomingCount,
    overdue: overdueCount,
    totalRevenue,
    averageOrderValue: total > 0 ? totalRevenue / total : 0
  };
}

/**
 * Export order data to CSV format
 */
export function exportOrdersToCSV(orders: Order[]): string {
  const headers = [
    'Order ID',
    'Customer Name', 
    'Email',
    'Phone',
    'Cake Name',
    'Size',
    'Flavor',
    'Delivery Date',
    'Pickup Time',
    'Total Price',
    'Payment Method',
    'Delivery Option',
    'Address',
    'Created At'
  ];
  
  const csvContent = [
    headers.join(','),
    ...orders.map(order => [
      order.id || '',
      `"${order.customer_name}"`,
      order.email,
      order.phone,
      `"${order.cake_name}"`,
      order.size,
      order.flavor,
      order.delivery_date,
      order.pickup_time,
      order.total_price,
      order.payment_method,
      order.delivery_option,
      `"${order.address || ''}"`,
      order.created_at || ''
    ].join(','))
  ].join('\n');
  
  return csvContent;
}