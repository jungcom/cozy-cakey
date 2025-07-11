import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { type Cake } from '@/data/cakes';

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
  const flavorOptions = Object.keys(cake.flavorPricing);

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Flavor <span className="text-red-500">*</span></h3>
      <RadioGroup
        value={selectedFlavor}
        onValueChange={onFlavorChange}
        className="space-y-2"
      >
        {flavorOptions.map(flavor => (
          <div key={flavor} className="flex items-center space-x-2">
            <RadioGroupItem value={flavor} id={`flavor-${flavor}`} />
            <Label htmlFor={`flavor-${flavor}`} className="text-sm">
              {flavor} {cake.flavorPricing[flavor] > 0 && `(+$${cake.flavorPricing[flavor]} per cup)`}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}