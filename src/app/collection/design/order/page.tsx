'use client';

import { notFound } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { designCakes, type Cake } from '@/data/cakes';

type CakeSize = '6' | '8' | '10' | '12';

interface SizeOption {
  id: CakeSize;
  label: string;
  price: number;
}

interface OrderFormData {
  cakeId: string;
  size: CakeSize;
  flavor: string;
  message: string;
  deliveryDate: string;
  name: string;
  email: string;
  phone: string;
}

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cake, setCake] = useState<Cake | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sizes: SizeOption[] = [
    { id: '6', label: '6" (Serves 8-10)', price: 35 },
    { id: '8', label: '8" (Serves 12-16)', price: 45 },
    { id: '10', label: '10" (Serves 20-25)', price: 55 },
    { id: '12', label: '12" (Serves 30-35)', price: 65 },
  ] as const;

  const flavors = [
    'Vanilla',
    'Chocolate'
  ] as const;

  const [formData, setFormData] = useState<Omit<OrderFormData, 'cakeId'>>({
    size: '8',
    flavor: flavors[0],
    message: '',
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    name: '',
    email: '',
    phone: '',
  });
  
  useEffect(() => {
    const cakeId = searchParams.get('cakeId');
    if (cakeId) {
      const selectedCake = designCakes.find(c => c.id === cakeId);
      setCake(selectedCake || null);
    } else {
      setCake(designCakes[0]);
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!cake) {
    notFound();
  }

  const selectedSize = sizes.find(size => size.id === formData.size) || sizes[1];
  const totalPrice = selectedSize.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit the form data to your API
      console.log('Submitting order:', {
        cakeId: cake.id,
        ...formData,
        totalPrice,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to thank you page or show success message
      router.push('/order/confirmation');
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      size: value as CakeSize
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">Customize Your {cake.name} Cake</h1>
      
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Cake Preview */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            {cake.image ? (
              <Image
                src={cake.image}
                alt={cake.name || 'Cake image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{cake.name}</h2>
            <p className="text-amber-700 text-lg font-medium">
              ${sizes[0].price} - ${sizes[sizes.length - 1].price}
            </p>
            <p className="text-gray-600">{cake.description}</p>
          </div>
        </div>

        {/* Order Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Cake Size</h3>
            <RadioGroup 
              value={formData.size} 
              onValueChange={handleSizeChange}
              className="grid grid-cols-2 gap-4"
            >
              {sizes.map((size) => (
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

          <div className="space-y-2">
            <h3 className="font-medium">Flavor</h3>
            <RadioGroup 
              value={formData.flavor}
              onValueChange={(value) => setFormData(prev => ({ ...prev, flavor: value }))}
              className="space-y-2"
            >
              {flavors.map((flavor) => (
                <div key={flavor} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={flavor} 
                    id={`flavor-${flavor.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <Label 
                    htmlFor={`flavor-${flavor.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="cursor-pointer font-normal"
                  >
                    {flavor}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Special Instructions</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any special requests or dietary restrictions?"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryDate">Delivery/Pickup Date</Label>
            <Input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Your Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-amber-700">${totalPrice}.00</span>
            </div>
            <Button 
              type="submit" 
              className="w-full py-6 text-lg" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              You won&apos;t be charged until we confirm your order details.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
