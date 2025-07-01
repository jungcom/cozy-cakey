import { Button } from '@/components/ui/button';
import { 
  DEFAULT_SIZES, 
  BASE_COLORS, 
  CANDY_CROWN_COLORS, 
  type CakeSize 
} from '@/utils/orderFormUtils';

interface TotalOrderProps {
  size: CakeSize;
  baseColor: string;
  candyCrownColor: string;
  lettering: string;
  totalPrice: number;
  isSubmitting: boolean;
  className?: string;
}

export default function TotalOrder({
  size,
  baseColor,
  candyCrownColor,
  lettering,
  totalPrice,
  isSubmitting,
  className = ''
}: TotalOrderProps) {
  // Calculate individual prices for breakdown
  const selectedSize = DEFAULT_SIZES.find(s => s.id === size) || DEFAULT_SIZES[1];
  const baseColorOption = BASE_COLORS.find(c => c.value === baseColor);
  const crownColorOption = CANDY_CROWN_COLORS.find(c => c.value === candyCrownColor);
  
  const basePrice = selectedSize.price;
  const baseColorPrice = baseColorOption?.price || 0;
  const crownColorPrice = crownColorOption?.price || 0;
  const letteringPrice = lettering.trim().length > 0 ? 5 : 0;

  return (
    <div className={`md:col-span-2 pt-4 border-t ${className}`}>
      {/* Price Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {selectedSize.label} cake
            </span>
            <span className="font-medium">${basePrice}.00</span>
          </div>
          
          {baseColorPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Base color ({baseColorOption?.label?.replace(' (+$3)', '') || baseColor})
              </span>
              <span className="font-medium">+${baseColorPrice}.00</span>
            </div>
          )}
          
          {crownColorPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Crown color ({crownColorOption?.label?.replace(' (+$3)', '') || candyCrownColor})
              </span>
              <span className="font-medium">+${crownColorPrice}.00</span>
            </div>
          )}
          
          {letteringPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Lettering: "{lettering}"
              </span>
              <span className="font-medium">+${letteringPrice}.00</span>
            </div>
          )}
          
          <div className="border-t pt-2 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total</span>
              <span className="text-xl font-bold text-amber-700">${totalPrice}.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full py-6 text-lg" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </Button>
      
      <p className="text-sm text-gray-500 mt-2 text-center">
        You won&apos;t be charged until we confirm your order details.
      </p>
    </div>
  );
}