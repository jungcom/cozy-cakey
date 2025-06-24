'use client';

import { ShoppingCart } from 'lucide-react';
import { CakeType, Size } from './types';

interface OrderSummaryProps {
  cakeTypes: CakeType[];
  selectedCake: string;
  selectedFlavor: string;
  sizes: Size[];
  selectedSize: string;
  message: string;
  selectedDate: string;
  calculateTotal: () => number;
  isFormValid: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function OrderSummary({
  cakeTypes,
  selectedCake,
  selectedFlavor,
  sizes,
  selectedSize,
  message,
  selectedDate,
  calculateTotal,
  isFormValid,
  onSubmit
}: OrderSummaryProps) {
  const selectedCakeData = cakeTypes.find(cake => cake.id === selectedCake);
  const selectedSizeData = sizes.find(size => size.id === selectedSize);
  
  const subtotal = calculateTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="lg:sticky lg:top-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-tertiary flex items-center mb-6">
          <ShoppingCart className="mr-2" />
          Order Summary
        </h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Your Cake</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {selectedCakeData?.name || 'No cake selected'}
                  </p>
                  {selectedCake && (
                    <p className="text-sm text-gray-600">
                      {selectedFlavor || 'No flavor selected'}
                      {selectedSizeData && ` • ${selectedSizeData.name}`}
                    </p>
                  )}
                </div>
                <span className="font-medium">
                  ${selectedCakeData?.price.toFixed(2) || '0.00'}
                </span>
              </div>

              {selectedSizeData && selectedSizeData.price > 0 && (
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Size Upgrade</span>
                  <span>+${selectedSizeData.price.toFixed(2)}</span>
                </div>
              )}

              {message && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</p>
                  <p className="text-sm text-gray-600">{message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Pickup</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm">
                {selectedDate 
                  ? new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'No date selected'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Please bring your ID when picking up your order.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-gray-600">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold text-lg mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            onClick={(e) => onSubmit(e)}
            disabled={!isFormValid}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
              isFormValid
                ? 'bg-tertiary hover:bg-tertiary/90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Place Order
          </button>

          <p className="text-xs text-gray-500 text-center">
            By placing your order, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
