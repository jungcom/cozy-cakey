import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { VALIDATION_CONFIG, validateFormField } from '@/config/validation';

interface CustomerInfoFieldsProps {
  formData: {
    customerName?: string;
    name?: string;
    email?: string;
    phone?: string;
    customerType?: string;
    kakaotalkName?: string;
    instagramName?: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
  variant?: 'design' | 'catering';
  className?: string;
}

export default function CustomerInfoFields({
  formData,
  onChange,
  errors = {},
  variant = 'design',
  className = ''
}: CustomerInfoFieldsProps) {
  const nameField = variant === 'catering' ? 'customerName' : 'name';
  const nameValue = variant === 'catering' ? formData.customerName : formData.name;

  const handleInputChange = (field: string, value: string) => {
    // Validate on change for immediate feedback
    const error = validateFormField(field, value, variant);
    onChange(field, value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Customer Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <Label 
              htmlFor={nameField} 
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id={nameField}
              value={nameValue || ''}
              onChange={(e) => handleInputChange(nameField, e.target.value)}
              placeholder="Enter your full name"
              maxLength={VALIDATION_CONFIG.characterLimits.customerName}
              className={errors[nameField] ? 'border-red-500' : ''}
              required
            />
            {errors[nameField] && (
              <p className="text-sm text-red-600 mt-1">{errors[nameField]}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <Label 
              htmlFor="email" 
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              maxLength={VALIDATION_CONFIG.characterLimits.email}
              className={errors.email ? 'border-red-500' : ''}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        
        {/* Phone Number */}
        <div className="mt-4">
          <Label 
            htmlFor="phone" 
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(123) 456-7890"
            maxLength={VALIDATION_CONFIG.characterLimits.phone}
            className={errors.phone ? 'border-red-500' : ''}
            required
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Customer Type - Design orders only */}
        {variant === 'design' && (
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Customer Type <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.customerType || 'new'}
              onValueChange={(value) => onChange('customerType', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="customer-new" />
                <Label htmlFor="customer-new" className="text-sm">
                  New Customer
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="customer-existing" />
                <Label htmlFor="customer-existing" className="text-sm">
                  Existing Customer
                </Label>
              </div>
            </RadioGroup>
            {errors.customerType && (
              <p className="text-sm text-red-600 mt-1">{errors.customerType}</p>
            )}
          </div>
        )}

        {/* Social Media - Design orders only */}
        {variant === 'design' && formData.customerType === 'existing' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label 
                htmlFor="kakaotalkName" 
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                KakaoTalk Name
              </Label>
              <Input
                id="kakaotalkName"
                value={formData.kakaotalkName || ''}
                onChange={(e) => onChange('kakaotalkName', e.target.value)}
                placeholder="Your KakaoTalk name"
                maxLength={50}
              />
            </div>
            
            <div>
              <Label 
                htmlFor="instagramName" 
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Instagram Handle
              </Label>
              <Input
                id="instagramName"
                value={formData.instagramName || ''}
                onChange={(e) => onChange('instagramName', e.target.value)}
                placeholder="@yourusername"
                maxLength={50}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}