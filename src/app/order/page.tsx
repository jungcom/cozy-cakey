'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { CakeSelect } from '@/components/OrderPage/CakeSelect';
import { PickupDetails } from '@/components/OrderPage/PickupDetails';
import { OrderSummary } from '@/components/OrderPage/OrderSummary';
import { cakeCategories, sizes } from '@/data/cakes';


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
    const cakeType = cakeCategories.find(cake => cake.id === selectedCake);
    if (cakeType) total += cakeType.price;
    
    const size = sizes.find(size => size.id === selectedSize);
    if (size) total += size.price;
    
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      cake: cakeCategories.find(c => c.id === selectedCake)?.name,
      flavor: selectedFlavor,
      size: sizes.find(s => s.id === selectedSize)?.name,
      message,
      pickupDate: selectedDate,
      customer: { name, email, phone },
      total: calculateTotal() * 1.08 // Including 8% tax
    });
    alert('Order submitted successfully!');
  };

  const isFormValid = Boolean(selectedCake && selectedFlavor && selectedSize && selectedDate && name && email && phone);

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
              cakeTypes={cakeCategories}
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
            cakeTypes={cakeCategories}
            selectedCake={selectedCake}
            selectedFlavor={selectedFlavor}
            sizes={sizes}
            selectedSize={selectedSize}
            message={message}
            selectedDate={selectedDate}
            calculateTotal={calculateTotal}
            isFormValid={isFormValid}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
