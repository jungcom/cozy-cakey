import { Input } from '@/components/ui/input';

interface LetteringInputProps {
  lettering: string;
  onLetteringChange: (value: string) => void;
}

export default function LetteringInput({
  lettering,
  onLetteringChange
}: LetteringInputProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">
        Add Lettering <span className="text-sm font-normal text-gray-600">(optional, max 20 characters)</span>
      </h3>
      <Input
        placeholder="Enter text for your cake (optional)"
        value={lettering}
        onChange={(e) => {
          if (e.target.value.length <= 20) {
            onLetteringChange(e.target.value);
          }
        }}
        className="w-full"
        maxLength={20}
      />
      <div className="text-sm text-gray-500">
        {lettering?.length || 0}/20 characters
      </div>
    </div>
  );
}