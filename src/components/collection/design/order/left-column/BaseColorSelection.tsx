import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type Cake } from '@/data/cakes';
import { getBaseColorOptionsFromCake } from '@/utils/orderFormUtils';

interface BaseColorSelectionProps {
  cake: Cake;
  selectedBaseColor: string;
  customBaseColor: string;
  onBaseColorChange: (value: string) => void;
  onCustomBaseColorChange: (value: string) => void;
}

export default function BaseColorSelection({
  cake,
  selectedBaseColor,
  customBaseColor,
  onBaseColorChange,
  onCustomBaseColorChange
}: BaseColorSelectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Base Color <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={selectedBaseColor}
        onValueChange={onBaseColorChange}
        className="space-y-2"
        required
      >
        {getBaseColorOptionsFromCake(cake).map((color) => (
          <div key={color.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={color.id} 
              id={`base-color-${color.id}`}
            />
            <Label 
              htmlFor={`base-color-${color.id}`} 
              className="cursor-pointer font-normal"
            >
              {color.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedBaseColor === 'Other' && (
        <div className="mt-2">
          <Input
            placeholder="Describe your custom color"
            value={customBaseColor}
            onChange={(e) => onCustomBaseColorChange(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}