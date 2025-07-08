import { ReactNode } from 'react';

export interface PriceLineItem {
  label: string;
  amount: number;
  isAddOn?: boolean;
  description?: string;
}

interface PriceBreakdownProps {
  items: PriceLineItem[];
  total: number;
  totalLabel?: string;
  className?: string;
  showHeader?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function PriceBreakdown({
  items,
  total,
  totalLabel = 'Total',
  className = '',
  showHeader = true,
  variant = 'default'
}: PriceBreakdownProps) {
  const formatPrice = (amount: number, isAddOn = false) => {
    if (amount === 0 && !isAddOn) return '$0';
    if (amount === 0) return 'Free';
    return isAddOn ? `+$${amount}` : `$${amount}`;
  };

  const getItemClasses = (item: PriceLineItem) => {
    if (variant === 'compact') return 'flex justify-between text-sm';
    return 'flex justify-between items-start';
  };

  const getContainerClasses = () => {
    const baseClasses = `bg-gray-50 rounded-lg p-4 ${className}`;
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} space-y-1`;
      case 'detailed':
        return `${baseClasses} space-y-3`;
      default:
        return `${baseClasses} space-y-2`;
    }
  };

  return (
    <div className={getContainerClasses()}>
      {showHeader && (
        <h3 className="font-medium text-gray-900 mb-3">Price Breakdown</h3>
      )}
      
      <div className={variant === 'compact' ? 'space-y-1' : 'space-y-2'}>
        {items.map((item, index) => (
          <div key={index} className={getItemClasses(item)}>
            <div className="flex-1">
              <span className="text-gray-600">{item.label}</span>
              {item.description && variant === 'detailed' && (
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              )}
            </div>
            <span className={`font-medium ${item.isAddOn ? 'text-gray-700' : 'text-gray-900'}`}>
              {formatPrice(item.amount, item.isAddOn)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Total Section */}
      <div className="border-t pt-3 mt-3">
        <div className="flex justify-between font-bold text-lg">
          <span className="text-gray-900">{totalLabel}</span>
          <span className="text-gray-900">${total}</span>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying individual price items
export function PriceItem({ 
  label, 
  amount, 
  isAddOn = false, 
  className = '' 
}: { 
  label: string; 
  amount: number; 
  isAddOn?: boolean; 
  className?: string; 
}) {
  const formatPrice = (amount: number, isAddOn = false) => {
    if (amount === 0 && !isAddOn) return '$0';
    if (amount === 0) return 'Free';
    return isAddOn ? `+$${amount}` : `$${amount}`;
  };

  return (
    <div className={`flex justify-between text-sm ${className}`}>
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${isAddOn ? 'text-gray-700' : 'text-gray-900'}`}>
        {formatPrice(amount, isAddOn)}
      </span>
    </div>
  );
}

// Specialized breakdown for cake orders
export function CakePriceBreakdown({
  baseLabel,
  basePrice,
  addOns = [],
  total,
  className = ''
}: {
  baseLabel: string;
  basePrice: number;
  addOns?: PriceLineItem[];
  total: number;
  className?: string;
}) {
  const items: PriceLineItem[] = [
    {
      label: baseLabel,
      amount: basePrice,
      isAddOn: false
    },
    ...addOns.map(addon => ({
      ...addon,
      isAddOn: true
    }))
  ];

  return (
    <PriceBreakdown
      items={items}
      total={total}
      className={className}
      variant="detailed"
    />
  );
}

// Specialized breakdown for catering orders
export function CateringPriceBreakdown({
  quantity,
  quantityLabel,
  basePrice,
  flavorAddOn,
  topperAddOn,
  total,
  className = ''
}: {
  quantity: number;
  quantityLabel: string;
  basePrice: number;
  flavorAddOn?: { label: string; pricePerCup: number };
  topperAddOn?: { label: string; pricePerCup: number; customText?: string };
  total: number;
  className?: string;
}) {
  const items: PriceLineItem[] = [
    {
      label: quantityLabel,
      amount: basePrice,
      isAddOn: false
    }
  ];

  if (flavorAddOn && flavorAddOn.pricePerCup > 0) {
    items.push({
      label: `${flavorAddOn.label} (${quantity} cups)`,
      amount: flavorAddOn.pricePerCup * quantity,
      isAddOn: true
    });
  }

  if (topperAddOn && topperAddOn.pricePerCup > 0) {
    const label = topperAddOn.customText 
      ? `${topperAddOn.label} - "${topperAddOn.customText}" (${quantity} cups)`
      : `${topperAddOn.label} (${quantity} cups)`;
    
    items.push({
      label,
      amount: topperAddOn.pricePerCup * quantity,
      isAddOn: true
    });
  }

  return (
    <PriceBreakdown
      items={items}
      total={total}
      className={className}
      variant="detailed"
    />
  );
}