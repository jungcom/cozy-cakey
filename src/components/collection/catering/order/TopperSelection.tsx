import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { type Cake } from '@/data/cakes';

interface TopperSelectionProps {
  cake: Cake;
  selectedTopper: string;
  customTopperText: string;
  onTopperChange: (value: string) => void;
  onCustomTopperTextChange: (value: string) => void;
}

export default function TopperSelection({
  cake,
  selectedTopper,
  customTopperText,
  onTopperChange,
  onCustomTopperTextChange
}: TopperSelectionProps) {
  const topperOptions = Object.keys(cake.topperPricing || {});

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Topper Option <span className="text-red-500">*</span></h3>
      <RadioGroup
        value={selectedTopper}
        onValueChange={onTopperChange}
        className="space-y-2"
        required
      >
        {topperOptions.map(topper => (
          <div key={topper} className="flex items-center space-x-2">
            <RadioGroupItem value={topper} id={`topper-${topper}`} />
            <Label htmlFor={`topper-${topper}`} className="text-sm">
              {topper} {cake.topperPricing?.[topper] && cake.topperPricing[topper] > 0 ? `(+$${cake.topperPricing[topper]} per cup)` : ''}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedTopper === 'Custom Topper' && (
        <div className="mt-2">
          <Input
            placeholder="Enter custom topper text (max 12 characters)"
            value={customTopperText}
            onChange={(e) => {
              const value = e.target.value.slice(0, 12);
              onCustomTopperTextChange(value);
            }}
            className="w-full"
            maxLength={12}
          />
          <p className="text-xs text-gray-500 mt-1">
            {customTopperText.length}/12 characters
          </p>
        </div>
      )}
    </div>
  );
}