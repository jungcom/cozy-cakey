import { Button } from '@/components/ui/button';
import { 
  getSizeOptionsFromCake,
  getFlavorOptionsFromCake,
  getBaseColorOptionsFromCake,
  getCandyCrownColorOptionsFromCake,
  getLetteringColorOptionsFromCake,
  getBowColorOptionsFromCake,
  type OrderFormData 
} from '@/utils/orderFormUtils';
import { type Cake } from '@/data/cakes';

interface TotalOrderProps {
  cake: Cake;
  formData: Partial<OrderFormData>;
  totalPrice: number;
  isSubmitting: boolean;
  className?: string;
}

export default function TotalOrder({
  cake,
  formData,
  totalPrice,
  isSubmitting,
  className = ''
}: TotalOrderProps) {
  // Get cake-specific options for price breakdown
  const sizeOptions = getSizeOptionsFromCake(cake);
  const flavorOptions = getFlavorOptionsFromCake(cake);
  const baseColorOptions = getBaseColorOptionsFromCake(cake);
  const candyCrownOptions = getCandyCrownColorOptionsFromCake(cake);
  const letteringColorOptions = getLetteringColorOptionsFromCake(cake);
  const bowColorOptions = getBowColorOptionsFromCake(cake);
  
  // Find selected options and their prices
  const selectedSize = sizeOptions.find(s => s.id === formData.size);
  const selectedFlavor = flavorOptions.find(f => f.id === formData.flavor);
  const selectedBaseColor = baseColorOptions.find(c => c.id === formData.baseColor);
  const selectedCandyCrown = candyCrownOptions?.find(c => c.id === formData.candyCrownColor);
  const selectedLetteringColor = letteringColorOptions?.find(c => c.id === formData.letteringColor);
  const selectedBowColor = bowColorOptions?.find(c => c.id === formData.bowColor);
  
  const basePrice = selectedSize?.price || 0;
  const flavorPrice = selectedFlavor?.price || 0;
  const baseColorPrice = selectedBaseColor?.price || 0;
  const candyCrownPrice = selectedCandyCrown?.price || 0;
  const letteringColorPrice = selectedLetteringColor?.price || 0;
  const bowColorPrice = selectedBowColor?.price || 0;

  return (
    <div className={`md:col-span-2 pt-4 border-t ${className}`}>
      {/* Price Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          {/* Base cake size price */}
          <div className="flex justify-between">
            <span className="text-gray-600">
              {selectedSize?.label || 'Cake size'}
            </span>
            <span className="font-medium">${basePrice}</span>
          </div>
          
          {/* Flavor price (if any additional cost) */}
          {flavorPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                {selectedFlavor?.label}
              </span>
              <span className="font-medium">+${flavorPrice}</span>
            </div>
          )}
          
          {/* Base color price (if any additional cost) */}
          {baseColorPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Base color ({selectedBaseColor?.id})
              </span>
              <span className="font-medium">+${baseColorPrice}</span>
            </div>
          )}
          
          {/* Candy crown color (Bead Cake only) */}
          {candyCrownPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Candy crown color ({selectedCandyCrown?.id})
              </span>
              <span className="font-medium">+${candyCrownPrice}</span>
            </div>
          )}
          
          {/* Lettering color */}
          {letteringColorPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Lettering color ({selectedLetteringColor?.id})
              </span>
              <span className="font-medium">+${letteringColorPrice}</span>
            </div>
          )}
          
          {/* Bow color */}
          {bowColorPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Bow color ({selectedBowColor?.id})
              </span>
              <span className="font-medium">+${bowColorPrice}</span>
            </div>
          )}
          
          {/* Lettering text (if any) */}
          {formData.lettering && formData.lettering.trim().length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">
                Lettering: &quot;{formData.lettering}&quot;
              </span>
              <span className="font-medium">Custom text</span>
            </div>
          )}
          
          <div className="border-t pt-2 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total</span>
              <span className="text-xl font-bold text-amber-700">${totalPrice}</span>
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