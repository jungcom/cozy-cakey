import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CustomerTypeProps {
  customerType: string;
  onCustomerTypeChange: (value: 'new' | 'existing') => void;
}

export default function CustomerType({
  customerType,
  onCustomerTypeChange
}: CustomerTypeProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Customer Type <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={customerType}
        onValueChange={onCustomerTypeChange}
        className="flex space-x-6"
        required
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="customer-new" />
          <Label htmlFor="customer-new" className="cursor-pointer">New Customer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="customer-existing" />
          <Label htmlFor="customer-existing" className="cursor-pointer">Existing Customer</Label>
        </div>
      </RadioGroup>
    </div>
  );
}