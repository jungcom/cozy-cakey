import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DeliveryAddressProps {
  address: string;
  deliveryOption: string;
  onAddressChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function DeliveryAddress({
  address,
  deliveryOption,
  onAddressChange
}: DeliveryAddressProps) {
  if (deliveryOption !== 'delivery') {
    return null;
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="address">Delivery Address</Label>
      <Textarea
        id="address"
        name="address"
        value={address}
        onChange={onAddressChange}
        placeholder="Enter your full delivery address"
        className="min-h-[80px]"
        required={deliveryOption === 'delivery'}
      />
    </div>
  );
}