import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DiscountCodeProps {
  discountCode: string;
  onDiscountCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DiscountCode({
  discountCode,
  onDiscountCodeChange
}: DiscountCodeProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="discountCode">Discount Code</Label>
      <Input
        id="discountCode"
        name="discountCode"
        value={discountCode}
        onChange={onDiscountCodeChange}
        placeholder="Enter discount code (optional)"
        className="w-full"
      />
    </div>
  );
}