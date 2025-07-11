import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type Cake } from '@/data/cakes';
import { getCandyCrownColorOptionsFromCake } from '@/utils/orderFormUtils';

interface CandyCrownColorSelectionProps {
  cake: Cake;
  selectedCandyCrownColor: string;
  customCandyCrownColor: string;
  onCandyCrownColorChange: (value: string) => void;
  onCustomCandyCrownColorChange: (value: string) => void;
}

export default function CandyCrownColorSelection({
  cake,
  selectedCandyCrownColor,
  customCandyCrownColor,
  onCandyCrownColorChange,
  onCustomCandyCrownColorChange
}: CandyCrownColorSelectionProps) {
  const crownColorOptions = getCandyCrownColorOptionsFromCake(cake);
  
  if (!crownColorOptions) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Candy Crown Color <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={selectedCandyCrownColor}
        onValueChange={onCandyCrownColorChange}
        className="space-y-2"
        required
      >
        {crownColorOptions.map((color) => (
          <div key={color.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={color.id} 
              id={`crown-color-${color.id}`}
            />
            <Label 
              htmlFor={`crown-color-${color.id}`} 
              className="cursor-pointer font-normal"
            >
              {color.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedCandyCrownColor === 'Other' && (
        <div className="mt-2">
          <Input
            placeholder="Describe your custom crown color"
            value={customCandyCrownColor}
            onChange={(e) => onCustomCandyCrownColorChange(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}