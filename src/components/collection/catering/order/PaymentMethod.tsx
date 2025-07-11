import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PaymentMethodProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
}

export default function PaymentMethod({
  paymentMethod,
  onPaymentMethodChange
}: PaymentMethodProps) {
  return (
    <div className="border-t pt-6">
      <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700 mb-2 block">
        Payment Method <span className="text-red-500">*</span>
      </Label>
      <RadioGroup
        value={paymentMethod}
        onValueChange={onPaymentMethodChange}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="venmo" id="venmo" />
          <Label htmlFor="venmo" className="text-sm">Venmo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="zelle" id="zelle" />
          <Label htmlFor="zelle" className="text-sm">Zelle</Label>
        </div>
      </RadioGroup>
    </div>
  );
}