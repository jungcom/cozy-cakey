'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { CakeSelect } from '@/components/OrderPage/CakeSelect';
import { PickupDetails } from '@/components/OrderPage/PickupDetails';
import { OrderSummary } from '@/components/OrderPage/OrderSummary';
import type { CakeType, Size } from '@/components/OrderPage/types';

const cakeTypes: CakeType[] = [
  {
    id: 'design',
    name: 'Design Cake',
    price: 45,
    description: 'Custom designed cake with your choice of decoration'
  },
  {
    id: 'two-tiered',
    name: 'Two-Tiered Cake',
    price: 85,
    description: 'Elegant two-tiered cake perfect for celebrations'
  },
  {
    id: 'catering',
    name: 'Catering Cake',
    price: 120,
    description: 'Large cake suitable for events and parties (serves 50+)'
  },
  {
    id: 'gift',
    name: 'Gift Set',
    price: 35,
    description: 'Small cake with gift wrapping and a personal message'
  },
];

const flavors = [
  'Vanilla',
  'Chocolate',
  'Strawberry',
  'Red Velvet',
  'Carrot',
  'Lemon',
];

const sizes = [
  { id: 'small', name: 'Small (6")', servings: '6-8', price: 0 },
  { id: 'medium', name: 'Medium (8")', servings: '10-12', price: 15 },
  { id: 'large', name: 'Large (10")', servings: '16-20', price: 30 },
];

export default function OrderPage() {
  const [selectedCake, setSelectedCake] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const calculateTotal = () => {
    let total = 0;
    const cakeType = cakeTypes.find(cake => cake.id === selectedCake);
    if (cakeType) total += cakeType.price;
    
    const size = sizes.find(size => size.id === selectedSize);
    if (size) total += size.price;
    
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      cake: cakeTypes.find(c => c.id === selectedCake)?.name,
      flavor: selectedFlavor,
      size: sizes.find(s => s.id === selectedSize)?.name,
      message,
      pickupDate: selectedDate,
      customer: { name, email, phone },
      total: calculateTotal() * 1.08 // Including 8% tax
    });
    alert('Order submitted successfully!');
  };

  const isFormValid = selectedCake && selectedFlavor && selectedSize && selectedDate && name && email && phone;

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-tertiary mb-12">
          Order Your Custom Cake
        </h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Form */}
          <div className="lg:col-span-2 space-y-8">
            <CakeSelect
              cakeTypes={cakeTypes}
              selectedCake={selectedCake}
              onCakeSelect={setSelectedCake}
              sizes={sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              selectedFlavor={selectedFlavor}
              onFlavorSelect={setSelectedFlavor}
              message={message}
              onMessageChange={setMessage}
            />
            
            <PickupDetails
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              name={name}
              onNameChange={setName}
              email={email}
              onEmailChange={setEmail}
              phone={phone}
              onPhoneChange={setPhone}
            />
          </div>
          
          {/* Right Column - Order Summary */}
          <OrderSummary
            cakeTypes={cakeTypes}
            selectedCake={selectedCake}
            selectedFlavor={selectedFlavor}
            sizes={sizes}
            selectedSize={selectedSize}
            message={message}
            selectedDate={selectedDate}
            calculateTotal={calculateTotal}
            isFormValid={!!isFormValid}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
