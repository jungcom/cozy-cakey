import { type Cake } from '@/data/cakes';

interface OrderSummaryProps {
  cake: Cake;
  selectedSize: string;
  customQuantity: string;
  selectedFlavor: string;
  selectedTopper: string;
  customTopperText: string;
  totalPrice: number;
  isSubmitting: boolean;
}

export default function OrderSummary({
  cake,
  selectedSize,
  customQuantity,
  selectedFlavor,
  selectedTopper,
  customTopperText,
  totalPrice,
  isSubmitting
}: OrderSummaryProps) {
  const quantity = selectedSize === 'other' ? parseInt(customQuantity || '0') || 0 : parseInt(selectedSize);

  return (
    <div className="border-t pt-6">
      {/* Price Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          {/* Base quantity price */}
          <div className="flex justify-between">
            <span className="text-gray-600">
              {selectedSize === 'other' 
                ? `${customQuantity || 0} cups`
                : `${selectedSize} cups`
              }
            </span>
            <span className="font-medium">
              ${selectedSize === 'other' 
                ? (parseInt(customQuantity || '0') * 5)
                : (cake.sizePricing[selectedSize] || 0)
              }
            </span>
          </div>
          
          {/* Flavor price (if any additional cost) */}
          {cake.flavorPricing[selectedFlavor] > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                {selectedFlavor} ({selectedSize === 'other' ? customQuantity || 0 : selectedSize} cups)
              </span>
              <span className="font-medium">
                +${(cake.flavorPricing[selectedFlavor] || 0) * quantity}
              </span>
            </div>
          )}
          
          {/* Topper price (if any additional cost) */}
          {selectedTopper && cake.topperPricing?.[selectedTopper] && cake.topperPricing[selectedTopper] > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                {selectedTopper} ({selectedSize === 'other' ? customQuantity || 0 : selectedSize} cups)
                {customTopperText && ` - "${customTopperText}"`}
              </span>
              <span className="font-medium">
                +${(cake.topperPricing[selectedTopper] || 0) * quantity}
              </span>
            </div>
          )}
          
          {/* Total */}
          <div className="border-t pt-2 mt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        style={{ color: 'white' }}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
}