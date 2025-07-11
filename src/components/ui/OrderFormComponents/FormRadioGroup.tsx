import { ReactNode } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export interface FormRadioOption {
  id: string;
  label: string;
  price?: number;
  description?: string;
}

interface FormRadioGroupProps {
  title: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: FormRadioOption[];
  required?: boolean;
  showPricing?: boolean;
  customOption?: {
    value: string;
    label: string;
    placeholder: string;
    maxLength?: number;
    customValue?: string;
    onCustomChange?: (value: string) => void;
  };
  className?: string;
  error?: string;
  helpText?: string;
}

export default function FormRadioGroup({
  title,
  name,
  value,
  onChange,
  options,
  required = false,
  showPricing = true,
  customOption,
  className = '',
  error,
  helpText
}: FormRadioGroupProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return '(Free)';
    return `(+$${price})`;
  };

  const isCustomSelected = customOption && value === customOption.value;

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-medium text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </h3>
      
      {helpText && (
        <p className="text-sm text-gray-600">{helpText}</p>
      )}
      
      <RadioGroup 
        value={value}
        onValueChange={onChange}
        className="space-y-2"
        required={required}
      >
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option.id} 
              id={`${name}-${option.id}`}
            />
            <Label 
              htmlFor={`${name}-${option.id}`} 
              className="cursor-pointer font-normal flex-1"
            >
              <span>{option.label}</span>
              {showPricing && option.price !== undefined && (
                <span className="text-gray-500 ml-1">
                  {formatPrice(option.price)}
                </span>
              )}
              {option.description && (
                <span className="block text-xs text-gray-500 mt-1">
                  {option.description}
                </span>
              )}
            </Label>
          </div>
        ))}
        
        {customOption && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value={customOption.value} 
                id={`${name}-${customOption.value}`}
              />
              <Label 
                htmlFor={`${name}-${customOption.value}`} 
                className="cursor-pointer font-normal"
              >
                {customOption.label}
              </Label>
            </div>
            
            {isCustomSelected && (
              <div className="ml-6 space-y-1">
                <Input
                  placeholder={customOption.placeholder}
                  value={customOption.customValue || ''}
                  onChange={(e) => {
                    const inputValue = customOption.maxLength 
                      ? e.target.value.slice(0, customOption.maxLength)
                      : e.target.value;
                    customOption.onCustomChange?.(inputValue);
                  }}
                  className="w-full"
                  maxLength={customOption.maxLength}
                />
                {customOption.maxLength && (
                  <p className="text-xs text-gray-500">
                    {(customOption.customValue || '').length}/{customOption.maxLength} characters
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </RadioGroup>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Helper function to convert cake pricing to FormRadioOption format
export function createOptionsFromPricing(
  pricing: Record<string, number>, 
  labelFormatter?: (key: string, price: number) => string
): FormRadioOption[] {
  return Object.entries(pricing).map(([key, price]) => ({
    id: key,
    label: labelFormatter ? labelFormatter(key, price) : key,
    price
  }));
}

// Common option creators for different form types
export const createSizeOptions = (sizePricing: Record<string, number>) => 
  createOptionsFromPricing(sizePricing, (size, price) => {
    if (size === 'other') return 'Other quantity';
    return `${size} ${size.includes('cup') ? '' : 'cups'}`;
  });

export const createFlavorOptions = (flavorPricing: Record<string, number>) =>
  createOptionsFromPricing(flavorPricing);

export const createColorOptions = (colorPricing: Record<string, number>) =>
  createOptionsFromPricing(colorPricing);

export const createTopperOptions = (topperPricing: Record<string, number>) =>
  createOptionsFromPricing(topperPricing);