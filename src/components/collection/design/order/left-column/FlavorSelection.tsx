import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { type Cake } from '@/data/cakes';
import { getFlavorOptionsFromCake } from '@/utils/orderFormUtils';

interface FlavorSelectionProps {
  cake: Cake;
  selectedFlavor: string;
  onFlavorChange: (value: string) => void;
}

export default function FlavorSelection({
  cake,
  selectedFlavor,
  onFlavorChange
}: FlavorSelectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Flavor <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={selectedFlavor}
        onValueChange={onFlavorChange}
        className="space-y-2"
        required
      >
        {getFlavorOptionsFromCake(cake).map((flavor) => (
          <div key={flavor.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={flavor.id} 
              id={`flavor-${flavor.id.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <Label 
              htmlFor={`flavor-${flavor.id.toLowerCase().replace(/\s+/g, '-')}`} 
              className="cursor-pointer font-normal"
            >
              {flavor.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}