import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BUSINESS_CONFIG } from '@/config/business';
import { VALIDATION_CONFIG, validateFormField } from '@/config/validation';

interface DeliveryOptionsFieldProps {
  formData: {
    pickupDate?: string;
    deliveryDate?: string;
    pickupTime?: string;
    deliveryOption?: string;
    deliveryAddress?: string;
    address?: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
  variant?: 'design' | 'catering';
  className?: string;
  minDate?: string;
}

export default function DeliveryOptionsField({
  formData,
  onChange,
  errors = {},
  variant = 'design',
  className = '',
  minDate
}: DeliveryOptionsFieldProps) {
  const dateField = variant === 'catering' ? 'pickupDate' : 'deliveryDate';
  const dateValue = variant === 'catering' ? formData.pickupDate : formData.deliveryDate;
  const addressField = variant === 'catering' ? 'deliveryAddress' : 'address';
  const addressValue = variant === 'catering' ? formData.deliveryAddress : formData.address;

  const getMinDate = () => {
    if (minDate) return minDate;
    
    const today = new Date();
    const minOrderDate = new Date(today.getTime() + BUSINESS_CONFIG.operations.advanceOrderDays * 24 * 60 * 60 * 1000);
    return minOrderDate.toISOString().split('T')[0];
  };

  const handleInputChange = (field: string, value: string) => {
    // Validate on change for immediate feedback
    const error = validateFormField(field, value, variant);
    onChange(field, value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {variant === 'catering' ? 'Pickup/Delivery Information' : 'Delivery Information'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup/Delivery Date */}
          <div>
            <Label 
              htmlFor={dateField} 
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              {variant === 'catering' ? 'Pickup Date' : 'Delivery/Pickup Date'} <span className="text-red-500">*</span>
            </Label>
            <Input
              id={dateField}
              type="date"
              value={dateValue || ''}
              onChange={(e) => handleInputChange(dateField, e.target.value)}
              min={getMinDate()}
              className={errors[dateField] ? 'border-red-500' : ''}
              required
            />
            {errors[dateField] && (
              <p className="text-sm text-red-600 mt-1">{errors[dateField]}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Orders must be placed at least {BUSINESS_CONFIG.operations.advanceOrderDays} days in advance
            </p>
          </div>
          
          {/* Pickup Time */}
          <div>
            <Label 
              htmlFor="pickupTime" 
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              {variant === 'catering' ? 'Pickup Time' : 'Pickup/Delivery Time'} <span className="text-red-500">*</span>
            </Label>
            <select
              id="pickupTime"
              value={formData.pickupTime || ''}
              onChange={(e) => handleInputChange('pickupTime', e.target.value)}
              required
              className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.pickupTime ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select time</option>
              {BUSINESS_CONFIG.pickupTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.pickupTime && (
              <p className="text-sm text-red-600 mt-1">{errors.pickupTime}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Business hours: {BUSINESS_CONFIG.operations.hours}
            </p>
          </div>
        </div>
        
        {/* Delivery Option */}
        <div className="mt-4">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Delivery Option <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.deliveryOption || BUSINESS_CONFIG.defaults.deliveryOption}
            onValueChange={(value) => onChange('deliveryOption', value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="text-sm">
                Pickup
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="text-sm">
                Delivery (minimum ${BUSINESS_CONFIG.operations.minimumDeliveryAmount})
              </Label>
            </div>
          </RadioGroup>
          {errors.deliveryOption && (
            <p className="text-sm text-red-600 mt-1">{errors.deliveryOption}</p>
          )}
        </div>
        
        {/* Delivery Address - Conditional */}
        {formData.deliveryOption === 'delivery' && (
          <div className="mt-4">
            <Label 
              htmlFor={addressField} 
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Delivery Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id={addressField}
              value={addressValue || ''}
              onChange={(e) => handleInputChange(addressField, e.target.value)}
              placeholder="Enter complete delivery address including street, city, state, and zip code"
              rows={3}
              maxLength={VALIDATION_CONFIG.characterLimits.address}
              className={errors[addressField] ? 'border-red-500' : ''}
              required
            />
            {errors[addressField] && (
              <p className="text-sm text-red-600 mt-1">{errors[addressField]}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Delivery available for orders ${BUSINESS_CONFIG.operations.minimumDeliveryAmount} and above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}