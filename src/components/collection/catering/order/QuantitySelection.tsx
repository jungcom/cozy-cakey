import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { type Cake } from '@/data/cakes';

interface QuantitySelectionProps {
  cake: Cake;
  selectedSize: string;
  customQuantity: string;
  onSizeChange: (value: string) => void;
  onCustomQuantityChange: (value: string) => void;
}

export default function QuantitySelection({
  cake,
  selectedSize,
  customQuantity,
  onSizeChange,
  onCustomQuantityChange
}: QuantitySelectionProps) {
  const quantityOptions = Object.keys(cake.sizePricing).filter(key => key !== 'other');

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Quantity <span className="text-red-500">*</span></h3>
      <RadioGroup
        value={selectedSize}
        onValueChange={onSizeChange}
        className="space-y-2"
      >
        {quantityOptions.map(qty => (
          <div key={qty} className="flex items-center space-x-2">
            <RadioGroupItem value={qty} id={`qty-${qty}`} />
            <Label htmlFor={`qty-${qty}`} className="text-sm">
              {qty} cups - ${cake.sizePricing[qty]}
            </Label>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="qty-other" />
          <Label htmlFor="qty-other" className="text-sm">
            Other quantity - $5 per cup
          </Label>
        </div>
      </RadioGroup>
      {selectedSize === 'other' && (
        <Input
          type="number"
          placeholder="Enter quantity"
          value={customQuantity}
          onChange={(e) => onCustomQuantityChange(e.target.value)}
          className="mt-2"
          min="1"
        />
      )}
    </div>
  );
}