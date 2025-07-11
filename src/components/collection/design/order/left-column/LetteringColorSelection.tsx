import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type Cake } from '@/data/cakes';
import { getLetteringColorOptionsFromCake } from '@/utils/orderFormUtils';

interface LetteringColorSelectionProps {
  cake: Cake;
  selectedLetteringColor: string;
  customLetteringColor: string;
  onLetteringColorChange: (value: string) => void;
  onCustomLetteringColorChange: (value: string) => void;
}

export default function LetteringColorSelection({
  cake,
  selectedLetteringColor,
  customLetteringColor,
  onLetteringColorChange,
  onCustomLetteringColorChange
}: LetteringColorSelectionProps) {
  const letteringColorOptions = getLetteringColorOptionsFromCake(cake);
  
  if (!letteringColorOptions) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Lettering Color <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={selectedLetteringColor}
        onValueChange={onLetteringColorChange}
        className="space-y-2"
        required
      >
        {letteringColorOptions.map((color) => (
          <div key={color.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={color.id} 
              id={`lettering-color-${color.id}`}
            />
            <Label 
              htmlFor={`lettering-color-${color.id}`} 
              className="cursor-pointer font-normal"
            >
              {color.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedLetteringColor === 'Other' && (
        <div className="mt-2">
          <Input
            placeholder="Describe your custom lettering color"
            value={customLetteringColor}
            onChange={(e) => onCustomLetteringColorChange(e.target.value)}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}