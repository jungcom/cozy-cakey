import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SpecialInstructionsProps {
  specialInstructions: string;
  onInstructionsChange: (value: string) => void;
}

export default function SpecialInstructions({
  specialInstructions,
  onInstructionsChange
}: SpecialInstructionsProps) {
  return (
    <div className="border-t pt-6">
      <Label htmlFor="specialInstructions" className="text-sm font-medium text-gray-700 mb-1 block">
        Special Instructions
      </Label>
      <Textarea
        id="specialInstructions"
        value={specialInstructions}
        onChange={(e) => onInstructionsChange(e.target.value)}
        placeholder="Any special requests or notes..."
      />
    </div>
  );
}