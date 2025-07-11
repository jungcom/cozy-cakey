import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BUSINESS_CONFIG, type PaymentMethod } from '@/config/business';

interface PaymentMethodFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  showBusinessHours?: boolean;
}

export default function PaymentMethodField({
  value,
  onChange,
  error,
  className = '',
  showBusinessHours = true
}: PaymentMethodFieldProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Method <span className="text-red-500">*</span>
        </h3>
        
        <RadioGroup
          value={value || BUSINESS_CONFIG.defaults.paymentMethod}
          onValueChange={onChange}
          className="space-y-3"
        >
          {/* Venmo Option */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="venmo" id="payment-venmo" />
            <Label htmlFor="payment-venmo" className="cursor-pointer">
              {BUSINESS_CONFIG.payment.venmo.displayName}
            </Label>
          </div>
          
          {/* Zelle Option */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="zelle" id="payment-zelle" />
            <Label htmlFor="payment-zelle" className="cursor-pointer">
              {BUSINESS_CONFIG.payment.zelle.displayName}
            </Label>
          </div>
        </RadioGroup>
        
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
        
        {/* Payment Instructions */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="font-medium text-blue-900 mb-2">Payment Instructions</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Payment is required to confirm your order</p>
            <p>• You will receive payment details after order confirmation</p>
            {showBusinessHours && (
              <p>• Business hours: {BUSINESS_CONFIG.operations.hours}</p>
            )}
            <p>• Please include your order number in the payment note</p>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mt-3 text-xs text-gray-600">
          <p>Questions? Contact us:</p>
          <p>📞 {BUSINESS_CONFIG.contact.phone}</p>
          <p>📱 {BUSINESS_CONFIG.contact.instagram}</p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get payment display info
export function getPaymentDisplayInfo(method: PaymentMethod) {
  const config = BUSINESS_CONFIG.payment[method];
  return {
    displayName: config.displayName,
    details: method === 'venmo' 
      ? `Send payment to: ${config.handle}`
      : `Send payment to: ${config.phone} (${config.name})`
  };
}