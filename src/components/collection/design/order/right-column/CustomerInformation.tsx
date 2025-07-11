import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerInformationProps {
  name: string;
  email: string;
  phone: string;
  kakaotalkName: string;
  instagramName: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomerInformation({
  name,
  email,
  phone,
  kakaotalkName,
  instagramName,
  onInputChange
}: CustomerInformationProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Your Information</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            name="name"
            value={name}
            onChange={onInputChange}
            placeholder="John Doe" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            value={email}
            onChange={onInputChange}
            placeholder="john@example.com" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
          <Input 
            id="phone" 
            name="phone"
            type="tel" 
            value={phone}
            onChange={onInputChange}
            placeholder="(123) 456-7890" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kakaotalkName">KakaoTalk Name</Label>
          <Input 
            id="kakaotalkName" 
            name="kakaotalkName"
            value={kakaotalkName}
            onChange={onInputChange}
            placeholder="Your KakaoTalk username" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagramName">Instagram Name</Label>
          <Input 
            id="instagramName" 
            name="instagramName"
            value={instagramName}
            onChange={onInputChange}
            placeholder="@yourusername" 
          />
        </div>
      </div>
    </div>
  );
}