import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import AvailabilityDatePicker from '@/components/ui/AvailabilityDatePicker';
import { PICKUP_TIMES } from '@/utils/orderFormUtils';

interface PickupDeliveryInfoProps {
  pickupDate: string;
  pickupTime: string;
  deliveryOption: string;
  deliveryAddress: string;
  onInputChange: (field: string, value: string) => void;
}

export default function PickupDeliveryInfo({
  pickupDate,
  pickupTime,
  deliveryOption,
  deliveryAddress,
  onInputChange
}: PickupDeliveryInfoProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Pickup/Delivery Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <AvailabilityDatePicker
            value={pickupDate || ''}
            onChange={(date) => onInputChange('pickupDate', date)}
            label={deliveryOption === 'delivery' ? 'delivery' : 'pickup'}
            required
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">
            {deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'} Time <span className="text-red-500">*</span>
            <span className="text-sm font-normal text-gray-600 block">Operating hours: 10am - 8pm</span>
          </h3>
          <select
            value={pickupTime}
            onChange={(e) => onInputChange('pickupTime', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            required
          >
            <option value="">Select {deliveryOption === 'delivery' ? 'delivery' : 'pickup'} time</option>
            {PICKUP_TIMES.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <Label htmlFor="deliveryOption" className="text-sm font-medium text-gray-700 mb-2 block">
          Delivery Option <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={deliveryOption}
          onValueChange={(value) => onInputChange('deliveryOption', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="text-sm">Pickup</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery" className="text-sm">Delivery</Label>
          </div>
        </RadioGroup>
      </div>
      
      {deliveryOption === 'delivery' && (
        <div className="mt-4">
          <Label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-700 mb-1 block">
            Delivery Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => onInputChange('deliveryAddress', e.target.value)}
            placeholder="Enter complete delivery address"
            required
          />
        </div>
      )}
    </div>
  );
}