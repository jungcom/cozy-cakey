import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { type Cake } from '@/data/cakes';
import { getSizeOptionsFromCake } from '@/utils/orderFormUtils';

interface CakeSizeSelectionProps {
  cake: Cake;
  selectedSize: string;
  onSizeChange: (value: string) => void;
}

export default function CakeSizeSelection({
  cake,
  selectedSize,
  onSizeChange
}: CakeSizeSelectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Cake Size <span className="text-red-500">*</span></h3>
      <RadioGroup 
        value={selectedSize} 
        onValueChange={onSizeChange}
        className="grid grid-cols-2 gap-4"
        required
      >
        {getSizeOptionsFromCake(cake).map((size) => (
          <div key={size.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={size.id} 
              id={`size-${size.id}`} 
            />
            <Label htmlFor={`size-${size.id}`} className="cursor-pointer">
              <div>{size.label}</div>
              <div className="text-amber-600 font-medium">${size.price}</div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}