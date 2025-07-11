import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type Cake } from '@/data/cakes';
import { getBowColorOptionsFromCake } from '@/utils/orderFormUtils';

interface BowColorSelectionProps {
  cake: Cake;
  selectedBowColor: string;
  customBowColor: string;
  onBowColorChange: (value: string) => void;
  onCustomBowColorChange: (value: string) => void;
}

export default function BowColorSelection({
  cake,
  selectedBowColor,
  customBowColor,
  onBowColorChange,
  onCustomBowColorChange
}: BowColorSelectionProps) {
  const bowColorOptions = getBowColorOptionsFromCake(cake);
  
  if (!bowColorOptions) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Bow Color <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={selectedBowColor}
        onValueChange={onBowColorChange}
        className="space-y-2"
        required
      >
        {bowColorOptions.map((color) => (
          <div key={color.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={color.id} 
              id={`bow-color-${color.id}`}
            />
            <Label 
              htmlFor={`bow-color-${color.id}`} 
              className="cursor-pointer font-normal"
            >
              {color.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedBowColor === 'Other' && (
        <div className="mt-2">
          <Input
            placeholder="Describe your custom bow color"
            value={customBowColor}
            onChange={(e) => onCustomBowColorChange(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}