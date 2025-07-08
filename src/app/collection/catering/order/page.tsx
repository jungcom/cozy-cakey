'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CakeImageDescription from '@/components/CollectionPage/CollectionOrderPage/CakeImageDescription';
import AvailabilityDatePicker from '@/components/ui/AvailabilityDatePicker';
import { designCakes, type Cake } from '@/data/cakes';
import { submitOrder, type Order } from '@/lib/supabase';
import { 
  PICKUP_TIMES,
  getDefaultFormData, 
  type OrderFormData 
} from '@/utils/orderFormUtils';

export default function CateringOrderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cake, setCake] = useState<Cake | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<Omit<OrderFormData, 'cakeId'>>(getDefaultFormData());
  
  useEffect(() => {
    // Find mini cake cups in the designCakes array
    const miniCakeCups = designCakes.find(c => c.id === 'mini-cake-cups');
    setCake(miniCakeCups || null);
    setIsLoading(false);
  }, []);

  // Initialize form data with cake-specific defaults when cake changes
  useEffect(() => {
    if (cake) {
      const sizeOptions = Object.keys(cake.sizePricing);
      const flavorOptions = Object.keys(cake.flavorPricing);
      const baseColorOptions = Object.keys(cake.baseColorPricing);
      const topperOptions = Object.keys(cake.topperPricing || {});
      
      setFormData(prev => ({
        ...prev,
        size: sizeOptions[0] || '',
        flavor: flavorOptions[0] || '',
        baseColor: baseColorOptions[0] || '',
        topperOption: topperOptions[0] || 'None',
        customQuantity: '',
        customTopperText: '',
        allergyAgreement: false,
        customerName: '',
        email: '',
        phone: '',
        customerType: 'new',
        kakaotalkName: '',
        instagramName: '',
        pickupDate: '',
        pickupTime: '',
        deliveryOption: 'pickup',
        deliveryAddress: '',
        specialInstructions: '',
        letteringText: '',
        paymentMethod: 'venmo'
      }));
    }
  }, [cake]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    if (!cake) return 0;
    
    const quantity = formData.size === 'other' ? parseInt(formData.customQuantity || '0') || 0 : parseInt(formData.size);
    const basePrice = formData.size === 'other' ? quantity * 5 : cake.sizePricing[formData.size] || 0;
    const flavorPrice = (cake.flavorPricing[formData.flavor] || 0) * quantity;
    const topperPrice = (cake.topperPricing?.[formData.topperOption || 'None'] || 0) * quantity;
    
    return basePrice + flavorPrice + topperPrice;
  };

  const validateFormData = async (formData: Omit<OrderFormData, 'cakeId'>, totalPrice: number): Promise<string | null> => {
    const requiredFields = [
      { field: 'size', message: 'Please select a quantity' },
      { field: 'flavor', message: 'Please select a flavor' },
      { field: 'topperOption', message: 'Please select a topper option' },
      { field: 'pickupDate', message: 'Please select a pickup date' },
      { field: 'customerName', message: 'Please enter your full name' },
      { field: 'email', message: 'Please enter your email address' },
      { field: 'phone', message: 'Please enter your phone number' },
      { field: 'customerType', message: 'Please select customer type' },
      { field: 'pickupTime', message: 'Please select a pickup time' },
      { field: 'deliveryOption', message: 'Please select pickup or delivery' },
      { field: 'paymentMethod', message: 'Please select a payment method' },
    ];
    
    for (const { field, message } of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return message;
      }
    }
    
    if (!formData.allergyAgreement) {
      return 'You must agree to the allergy disclaimer to place an order';
    }
    
    if (formData.size === 'other' && (!formData.customQuantity || parseInt(formData.customQuantity) < 1)) {
      return 'Please enter a valid quantity for custom orders';
    }
    
    if (formData.deliveryOption === 'delivery' && totalPrice < 50) {
      return 'Delivery is only available for orders over $50';
    }
    
    if (formData.deliveryOption === 'delivery' && !formData.deliveryAddress?.trim()) {
      return 'Please provide a delivery address';
    }
    
    if (formData.topperOption === 'Custom Topper' && !formData.customTopperText?.trim()) {
      return 'Please enter text for the custom topper';
    }
    
    if ((formData.customTopperText?.length || 0) > 12) {
      return 'Custom topper text cannot exceed 12 characters';
    }
    
    // Validate availability for the selected date
    if (formData.pickupDate) {
      try {
        const response = await fetch(`/api/availability?date=${formData.pickupDate}`);
        const data = await response.json();
        
        if (!data.available) {
          return `The selected date is not available: ${data.reason}`;
        }
      } catch (error) {
        console.error('Error checking availability:', error);
        return 'Unable to verify date availability. Please try again.';
      }
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cake) return;
    
    const totalPrice = calculateTotal();
    const validationError = await validateFormData(formData, totalPrice);
    if (validationError) {
      alert(validationError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const quantity = formData.size === 'other' ? parseInt(formData.customQuantity || '0') || 0 : parseInt(formData.size);
      
      const orderData: Order = {
        customer_name: formData.customerName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        kakaotalk_name: formData.kakaotalkName,
        instagram_name: formData.instagramName,
        cake_id: cake.id,
        cake_name: cake.name,
        size: formData.size === 'other' ? `${quantity} cups` : `${formData.size} cups`,
        flavor: formData.flavor,
        base_color: formData.baseColor,
        delivery_date: formData.pickupDate || '',
        pickup_time: formData.pickupTime || '',
        customer_type: formData.customerType || 'new',
        delivery_option: formData.deliveryOption || 'pickup',
        address: formData.deliveryAddress,
        payment_method: formData.paymentMethod || 'venmo',
        allergy_agreement: formData.allergyAgreement,
        questions_comments: formData.specialInstructions,
        total_price: totalPrice,
        order_data: {
          topperOption: formData.topperOption,
          customTopperText: formData.customTopperText,
          customQuantity: formData.customQuantity,
          cakeType: 'catering'
        }
      };

      // Submit order to Supabase
      const result = await submitOrder(orderData);
      console.log('Order submitted successfully:', result);
      
      // Send confirmation email
      if (result && result[0] && result[0].id) {
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order: result[0] }),
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Continue with redirect even if email fails
        }
        
        router.push(`/order/confirmation?id=${result[0].id}`);
      } else {
        router.push('/order/confirmation');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!cake) {
    return <div>Mini cake cups not found</div>;
  }

  const quantityOptions = Object.keys(cake.sizePricing).filter(key => key !== 'other');
  const flavorOptions = Object.keys(cake.flavorPricing);
  const topperOptions = Object.keys(cake.topperPricing || {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800 mb-4">Order Mini Cake Cups</h1>
            <p className="text-amber-700 text-lg">Perfect for catering events and large gatherings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Cake Details */}
            <div className="space-y-6">
              <CakeImageDescription cake={cake} />
            </div>

            {/* Right Column - Order Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quantity Selection */}
                <div className="space-y-2">
                  <h3 className="font-medium">Quantity <span className="text-red-500">*</span></h3>
                  <RadioGroup
                    value={formData.size}
                    onValueChange={(value) => handleInputChange('size', value)}
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
                  {formData.size === 'other' && (
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      value={formData.customQuantity}
                      onChange={(e) => handleInputChange('customQuantity', e.target.value)}
                      className="mt-2"
                      min="1"
                    />
                  )}
                </div>

                {/* Flavor Selection */}
                <div className="space-y-2">
                  <h3 className="font-medium">Flavor <span className="text-red-500">*</span></h3>
                  <RadioGroup
                    value={formData.flavor}
                    onValueChange={(value) => handleInputChange('flavor', value)}
                    className="space-y-2"
                  >
                    {flavorOptions.map(flavor => (
                      <div key={flavor} className="flex items-center space-x-2">
                        <RadioGroupItem value={flavor} id={`flavor-${flavor}`} />
                        <Label htmlFor={`flavor-${flavor}`} className="text-sm">
                          {flavor} {cake.flavorPricing[flavor] > 0 && `(+$${cake.flavorPricing[flavor]} per cup)`}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Topper Selection */}
                <div className="space-y-2">
                  <h3 className="font-medium">Topper Option <span className="text-red-500">*</span></h3>
                  <RadioGroup
                    value={formData.topperOption}
                    onValueChange={(value) => handleInputChange('topperOption', value)}
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
                  {formData.topperOption === 'Custom Topper' && (
                    <div className="mt-2">
                      <Input
                        placeholder="Enter custom topper text (max 12 characters)"
                        value={formData.customTopperText || ''}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 12);
                          handleInputChange('customTopperText', value);
                        }}
                        className="w-full"
                        maxLength={12}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.customTopperText || '').length}/12 characters
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName" className="text-sm font-medium text-gray-700 mb-1 block">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Social Media Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="kakaotalkName" className="text-sm font-medium text-gray-700 mb-1 block">
                      KakaoTalk Name
                    </Label>
                    <Input
                      id="kakaotalkName"
                      value={formData.kakaotalkName || ''}
                      onChange={(e) => handleInputChange('kakaotalkName', e.target.value)}
                      placeholder="Your KakaoTalk username"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instagramName" className="text-sm font-medium text-gray-700 mb-1 block">
                      Instagram Name
                    </Label>
                    <Input
                      id="instagramName"
                      value={formData.instagramName || ''}
                      onChange={(e) => handleInputChange('instagramName', e.target.value)}
                      placeholder="@yourusername"
                    />
                  </div>
                </div>

                {/* Customer Type - Required */}
                <div className="space-y-2">
                  <h3 className="font-medium">Customer Type <span className="text-red-500">*</span></h3>
                  <RadioGroup 
                    value={formData.customerType}
                    onValueChange={(value) => handleInputChange('customerType', value)}
                    className="flex space-x-6"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="customer-new" />
                      <Label htmlFor="customer-new" className="cursor-pointer">New Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="customer-existing" />
                      <Label htmlFor="customer-existing" className="cursor-pointer">Existing Customer</Label>
                    </div>
                  </RadioGroup>
                </div>


                {/* Pickup/Delivery Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Pickup/Delivery Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <AvailabilityDatePicker
                        value={formData.pickupDate || ''}
                        onChange={(date) => handleInputChange('pickupDate', date)}
                        label={formData.deliveryOption === 'delivery' ? 'delivery' : 'pickup'}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        {formData.deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'} Time <span className="text-red-500">*</span>
                        <span className="text-sm font-normal text-gray-600 block">Operating hours: 10am - 8pm</span>
                      </h3>
                      <select
                        value={formData.pickupTime}
                        onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                      >
                        <option value="">Select {formData.deliveryOption === 'delivery' ? 'delivery' : 'pickup'} time</option>
                        {PICKUP_TIMES.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="deliveryOption" className="text-sm font-medium text-gray-700 mb-2 block">
                      Delivery Option <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.deliveryOption}
                      onValueChange={(value) => handleInputChange('deliveryOption', value)}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="text-sm">Pickup</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="text-sm">Delivery</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {formData.deliveryOption === 'delivery' && (
                    <div className="mt-4">
                      <Label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-700 mb-1 block">
                        Delivery Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                        placeholder="Enter complete delivery address"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Special Instructions */}
                <div className="border-t pt-6">
                  <Label htmlFor="specialInstructions" className="text-sm font-medium text-gray-700 mb-1 block">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    placeholder="Any special requests or notes..."
                  />
                </div>

                {/* Payment Method */}
                <div className="border-t pt-6">
                  <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700 mb-2 block">
                    Payment Method <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="venmo" id="venmo" />
                      <Label htmlFor="venmo" className="text-sm">Venmo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="zelle" id="zelle" />
                      <Label htmlFor="zelle" className="text-sm">Zelle</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Allergy Agreement - Required */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Allergy Disclaimer <span className="text-red-500">*</span></h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-sm text-yellow-800 mb-3">
                      <strong>Important:</strong> Cozy Cakey is not responsible for any allergic reactions. 
                      Our kitchen processes common allergens including wheat, eggs, dairy, nuts, and soy. 
                      Please inform us of any allergies, but consume at your own risk.
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allergyAgreement"
                        checked={formData.allergyAgreement}
                        onChange={(e) => handleInputChange('allergyAgreement', e.target.checked)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        required
                      />
                      <Label htmlFor="allergyAgreement" className="cursor-pointer text-sm">
                        I understand and agree to this disclaimer
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Order Total */}
                <div className="border-t pt-6">
                  {/* Price Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Price Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      {/* Base quantity price */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {formData.size === 'other' 
                            ? `${formData.customQuantity || 0} cups`
                            : `${formData.size} cups`
                          }
                        </span>
                        <span className="font-medium">
                          ${formData.size === 'other' 
                            ? (parseInt(formData.customQuantity || '0') * 5)
                            : (cake.sizePricing[formData.size] || 0)
                          }
                        </span>
                      </div>
                      
                      {/* Flavor price (if any additional cost) */}
                      {cake.flavorPricing[formData.flavor] > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {formData.flavor} ({formData.size === 'other' ? formData.customQuantity || 0 : formData.size} cups)
                          </span>
                          <span className="font-medium">
                            +${(cake.flavorPricing[formData.flavor] || 0) * (formData.size === 'other' ? parseInt(formData.customQuantity || '0') : parseInt(formData.size))}
                          </span>
                        </div>
                      )}
                      
                      {/* Topper price (if any additional cost) */}
                      {cake.topperPricing?.[formData.topperOption || 'None'] && cake.topperPricing[formData.topperOption || 'None'] > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {formData.topperOption} ({formData.size === 'other' ? formData.customQuantity || 0 : formData.size} cups)
                            {formData.customTopperText && ` - "${formData.customTopperText}"`}
                          </span>
                          <span className="font-medium">
                            +${(cake.topperPricing[formData.topperOption || 'None'] || 0) * (formData.size === 'other' ? parseInt(formData.customQuantity || '0') : parseInt(formData.size))}
                          </span>
                        </div>
                      )}
                      
                      {/* Total */}
                      <div className="border-t pt-2 mt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}