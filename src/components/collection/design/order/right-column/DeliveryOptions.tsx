import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface DeliveryOptionsProps {
  deliveryOption: string;
  totalPrice: number;
  onDeliveryOptionChange: (value: 'pickup' | 'delivery') => void;
}

export default function DeliveryOptions({
  deliveryOption,
  totalPrice,
  onDeliveryOptionChange
}: DeliveryOptionsProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Delivery Options <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={deliveryOption}
        onValueChange={onDeliveryOptionChange}
        className="space-y-2"
        required
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pickup" id="delivery-pickup" />
          <Label htmlFor="delivery-pickup" className="cursor-pointer">Pickup</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="delivery" 
            id="delivery-delivery"
            disabled={totalPrice < 50}
          />
          <Label 
            htmlFor="delivery-delivery" 
            className={`cursor-pointer ${totalPrice < 50 ? 'text-gray-400' : ''}`}
          >
            Delivery {totalPrice < 50 && '(Available for orders over $50)'}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}