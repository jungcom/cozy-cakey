import AvailabilityDatePicker from '@/components/ui/AvailabilityDatePicker';
import { PICKUP_TIMES } from '@/utils/orderFormUtils';

interface DateTimeSelectionProps {
  deliveryDate: string;
  pickupTime: string;
  deliveryOption: string;
  onDeliveryDateChange: (date: string) => void;
  onPickupTimeChange: (time: string) => void;
}

export default function DateTimeSelection({
  deliveryDate,
  pickupTime,
  deliveryOption,
  onDeliveryDateChange,
  onPickupTimeChange
}: DateTimeSelectionProps) {
  return (
    <>
      {/* Date - Required (after delivery options) */}
      <AvailabilityDatePicker
        value={deliveryDate}
        onChange={onDeliveryDateChange}
        label={deliveryOption === 'delivery' ? 'delivery' : 'pickup'}
        required
        className="w-full"
      />

      {/* Time - Required (after delivery options) */}
      <div className="space-y-2">
        <h3 className="font-medium">
          {deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'} Time <span className="text-red-500">*</span>
          <span className="text-sm font-normal text-gray-600 block">Operating hours: 10am - 8pm</span>
        </h3>
        <select
          value={pickupTime}
          onChange={(e) => onPickupTimeChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          required
        >
          <option value="">Select {deliveryOption === 'delivery' ? 'delivery' : 'pickup'} time</option>
          {PICKUP_TIMES.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>
    </>
  );
}