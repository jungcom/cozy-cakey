import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CustomerInformationProps {
  customerName: string;
  email: string;
  phone: string;
  kakaotalkName: string;
  instagramName: string;
  customerType: string;
  onInputChange: (field: string, value: string) => void;
}

export default function CustomerInformation({
  customerName,
  email,
  phone,
  kakaotalkName,
  instagramName,
  customerType,
  onInputChange
}: CustomerInformationProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName" className="text-sm font-medium text-gray-700 mb-1 block">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => onInputChange('customerName', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onInputChange('email', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          required
        />
      </div>

      {/* Social Media Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="kakaotalkName" className="text-sm font-medium text-gray-700 mb-1 block">
            KakaoTalk Name
          </Label>
          <Input
            id="kakaotalkName"
            value={kakaotalkName || ''}
            onChange={(e) => onInputChange('kakaotalkName', e.target.value)}
            placeholder="Your KakaoTalk username"
          />
        </div>
        
        <div>
          <Label htmlFor="instagramName" className="text-sm font-medium text-gray-700 mb-1 block">
            Instagram Name
          </Label>
          <Input
            id="instagramName"
            value={instagramName || ''}
            onChange={(e) => onInputChange('instagramName', e.target.value)}
            placeholder="@yourusername"
          />
        </div>
      </div>

      {/* Customer Type - Required */}
      <div className="space-y-2 mt-4">
        <h3 className="font-medium">Customer Type <span className="text-red-500">*</span></h3>
        <RadioGroup 
          value={customerType}
          onValueChange={(value) => onInputChange('customerType', value)}
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
    </div>
  );
}