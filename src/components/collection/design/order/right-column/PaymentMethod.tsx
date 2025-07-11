import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BUSINESS_CONFIG } from '@/config/business';

interface PaymentMethodProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: 'venmo' | 'zelle') => void;
}

export default function PaymentMethod({
  paymentMethod,
  onPaymentMethodChange
}: PaymentMethodProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Payment Method <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={paymentMethod}
        onValueChange={onPaymentMethodChange}
        className="space-y-2"
        required
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="venmo" id="payment-venmo" />
          <Label htmlFor="payment-venmo" className="cursor-pointer">
            Venmo ({BUSINESS_CONFIG.payment.venmo.handle})
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="zelle" id="payment-zelle" />
          <Label htmlFor="payment-zelle" className="cursor-pointer">
            Zelle ({BUSINESS_CONFIG.payment.zelle.phone}, {BUSINESS_CONFIG.payment.zelle.name})
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}