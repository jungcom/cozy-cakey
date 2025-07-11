'use client';

import { notFound } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CakeImageDescription from '@/components/CollectionPage/CollectionOrderPage/CakeImageDescription';
import TotalOrder from '@/components/CollectionPage/CollectionOrderPage/TotalOrder';
import AvailabilityDatePicker from '@/components/ui/AvailabilityDatePicker';
import { designCakes, type Cake } from '@/data/cakes';
import { submitOrder, type Order } from '@/lib/supabase';
import { BUSINESS_CONFIG } from '@/config/business';
import { 
  PICKUP_TIMES,
  getDefaultFormData, 
  calculateCakeTotalPrice,
  getSizeOptionsFromCake,
  getFlavorOptionsFromCake,
  getBaseColorOptionsFromCake,
  getCandyCrownColorOptionsFromCake,
  getLetteringColorOptionsFromCake,
  getBowColorOptionsFromCake,
  type OrderFormData 
} from '@/utils/orderFormUtils';

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cake, setCake] = useState<Cake | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<Omit<OrderFormData, 'cakeId'>>(getDefaultFormData());
  
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

  // Initialize form data with cake-specific defaults when cake changes
  useEffect(() => {
    if (cake) {
      const sizeOptions = getSizeOptionsFromCake(cake);
      const flavorOptions = getFlavorOptionsFromCake(cake);
      const baseColorOptions = getBaseColorOptionsFromCake(cake);
      const candyCrownOptions = getCandyCrownColorOptionsFromCake(cake);
      const letteringColorOptions = getLetteringColorOptionsFromCake(cake);
      const bowColorOptions = getBowColorOptionsFromCake(cake);

      setFormData(prev => ({
        ...prev,
        size: sizeOptions[0]?.id || '6',
        flavor: flavorOptions[0]?.id || 'Vanilla',
        baseColor: baseColorOptions[0]?.id || 'White',
        candyCrownColor: candyCrownOptions?.[0]?.id,
        letteringColor: letteringColorOptions?.[0]?.id,
        bowColor: bowColorOptions?.[0]?.id,
      }));
    }
  }, [cake]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!cake) {
    notFound();
  }

  const totalPrice = calculateCakeTotalPrice(cake, formData);

  const validateFormData = async (formData: Partial<OrderFormData>, totalPrice: number): Promise<string | null> => {
    const requiredFields = [
      { field: 'size', message: 'Please select a cake size' },
      { field: 'flavor', message: 'Please select a flavor' },
      { field: 'deliveryDate', message: 'Please select a delivery/pickup date' },
      { field: 'name', message: 'Please enter your full name' },
      { field: 'phone', message: 'Please enter your phone number' },
      { field: 'customerType', message: 'Please select customer type' },
      { field: 'pickupTime', message: 'Please select a pickup/delivery time' },
      { field: 'baseColor', message: 'Please select a base color' },
      { field: 'deliveryOption', message: 'Please select pickup or delivery' },
      { field: 'paymentMethod', message: 'Please select a payment method' },
    ];
    
    // Add cake-specific required fields
    if (cake.candyCrownColorPricing) {
      requiredFields.push({ field: 'candyCrownColor', message: 'Please select a candy crown color' });
    }
    if (cake.letteringColorPricing) {
      requiredFields.push({ field: 'letteringColor', message: 'Please select a lettering color' });
    }
    if (cake.bowColorPricing) {
      requiredFields.push({ field: 'bowColor', message: 'Please select a bow color' });
    }
    
    for (const { field, message } of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return message;
      }
    }
    
    if (!formData.allergyAgreement) {
      return 'You must agree to the allergy disclaimer to place an order';
    }
    
    if (formData.deliveryOption === 'delivery' && totalPrice < 50) {
      return 'Delivery is only available for orders over $50';
    }
    
    if (formData.deliveryOption === 'delivery' && !formData.address?.trim()) {
      return 'Please provide a delivery address';
    }
    
    if ((formData.lettering?.length || 0) > 20) {
      return 'Lettering cannot exceed 20 characters';
    }
    
    // Validate availability for the selected date
    if (formData.deliveryDate) {
      try {
        const response = await fetch(`/api/availability?date=${formData.deliveryDate}`);
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
    
    const validationError = await validateFormData(formData, totalPrice);
    if (validationError) {
      alert(validationError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare order data for Supabase
      const orderData: Order = {
        cake_id: cake.id,
        cake_name: cake.name,
        size: formData.size,
        flavor: formData.flavor,
        base_color: formData.baseColor,
        custom_base_color: formData.customBaseColor,
        lettering: formData.lettering,
        lettering_color: formData.letteringColor,
        custom_lettering_color: formData.customLetteringColor,
        candy_crown_color: formData.candyCrownColor,
        custom_candy_crown_color: formData.customCandyCrownColor,
        bow_color: formData.bowColor,
        custom_bow_color: formData.customBowColor,
        delivery_date: formData.deliveryDate,
        pickup_time: formData.pickupTime,
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        kakaotalk_name: formData.kakaotalkName,
        instagram_name: formData.instagramName,
        customer_type: formData.customerType,
        delivery_option: formData.deliveryOption,
        address: formData.address,
        payment_method: formData.paymentMethod,
        allergy_agreement: formData.allergyAgreement,
        questions_comments: formData.questionsComments,
        discount_code: formData.discountCode,
        total_price: totalPrice,
        order_data: { ...formData, cakeId: cake.id, totalPrice }
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
      size: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">Customize Your {cake.name}</h1>
      
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Cake Preview */}
          <CakeImageDescription cake={cake} />

          {/* Cake Size - Required */}
          <div className="space-y-2">
            <h3 className="font-medium">Cake Size <span className="text-red-500">*</span></h3>
            <RadioGroup 
              value={formData.size} 
              onValueChange={handleSizeChange}
              className="grid grid-cols-2 gap-4"
              required
            >
              {getSizeOptionsFromCake(cake).map((size) => (
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

          {/* Flavor - Required */}
          <div className="space-y-2">
            <h3 className="font-medium">Flavor <span className="text-red-500">*</span></h3>
            <RadioGroup 
              value={formData.flavor}
              onValueChange={(value) => setFormData(prev => ({ ...prev, flavor: value }))}
              className="space-y-2"
              required
            >
              {getFlavorOptionsFromCake(cake).map((flavor) => (
                <div key={flavor.id} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={flavor.id} 
                    id={`flavor-${flavor.id.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <Label 
                    htmlFor={`flavor-${flavor.id.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="cursor-pointer font-normal"
                  >
                    {flavor.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Base Color - Required */}
          <div className="space-y-2">
            <h3 className="font-medium">Base Color <span className="text-red-500">*</span></h3>
            <RadioGroup 
              value={formData.baseColor}
              onValueChange={(value) => setFormData(prev => ({ ...prev, baseColor: value }))}
              className="space-y-2"
              required
            >
              {getBaseColorOptionsFromCake(cake).map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={color.id} 
                    id={`base-color-${color.id}`}
                  />
                  <Label 
                    htmlFor={`base-color-${color.id}`} 
                    className="cursor-pointer font-normal"
                  >
                    {color.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {formData.baseColor === 'Other' && (
              <div className="mt-2">
                <Input
                  placeholder="Describe your custom color"
                  value={formData.customBaseColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, customBaseColor: e.target.value }))}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Candy Crown Color - Bead Cake Only */}
          {getCandyCrownColorOptionsFromCake(cake) && (
            <div className="space-y-2">
              <h3 className="font-medium">Candy Crown Color <span className="text-red-500">*</span></h3>
              <RadioGroup 
                value={formData.candyCrownColor}
                onValueChange={(value) => setFormData(prev => ({ ...prev, candyCrownColor: value }))}
                className="space-y-2"
                required
              >
                {getCandyCrownColorOptionsFromCake(cake)!.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={color.id} 
                      id={`crown-color-${color.id}`}
                    />
                    <Label 
                      htmlFor={`crown-color-${color.id}`} 
                      className="cursor-pointer font-normal"
                    >
                      {color.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {formData.candyCrownColor === 'Other' && (
                <div className="mt-2">
                  <Input
                    placeholder="Describe your custom crown color"
                    value={formData.customCandyCrownColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, customCandyCrownColor: e.target.value }))}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* Lettering Color - For cakes with lettering options */}
          {getLetteringColorOptionsFromCake(cake) && (
            <div className="space-y-2">
              <h3 className="font-medium">Lettering Color <span className="text-red-500">*</span></h3>
              <RadioGroup 
                value={formData.letteringColor}
                onValueChange={(value) => setFormData(prev => ({ ...prev, letteringColor: value }))}
                className="space-y-2"
                required
              >
                {getLetteringColorOptionsFromCake(cake)!.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={color.id} 
                      id={`lettering-color-${color.id}`}
                    />
                    <Label 
                      htmlFor={`lettering-color-${color.id}`} 
                      className="cursor-pointer font-normal"
                    >
                      {color.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {formData.letteringColor === 'Other' && (
                <div className="mt-2">
                  <Input
                    placeholder="Describe your custom lettering color"
                    value={formData.customLetteringColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, customLetteringColor: e.target.value }))}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* Bow Color - For cakes with bow options */}
          {getBowColorOptionsFromCake(cake) && (
            <div className="space-y-2">
              <h3 className="font-medium">Bow Color <span className="text-red-500">*</span></h3>
              <RadioGroup 
                value={formData.bowColor}
                onValueChange={(value) => setFormData(prev => ({ ...prev, bowColor: value }))}
                className="space-y-2"
                required
              >
                {getBowColorOptionsFromCake(cake)!.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={color.id} 
                      id={`bow-color-${color.id}`}
                    />
                    <Label 
                      htmlFor={`bow-color-${color.id}`} 
                      className="cursor-pointer font-normal"
                    >
                      {color.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {formData.bowColor === 'Other' && (
                <div className="mt-2">
                  <Input
                    placeholder="Describe your custom bow color"
                    value={formData.customBowColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, customBowColor: e.target.value }))}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* Add Lettering */}
          <div className="space-y-2">
            <h3 className="font-medium">
              Add Lettering <span className="text-sm font-normal text-gray-600">(optional, max 20 characters)</span>
            </h3>
            <Input
              placeholder="Enter text for your cake (optional)"
              value={formData.lettering}
              onChange={(e) => {
                if (e.target.value.length <= 20) {
                  setFormData(prev => ({ ...prev, lettering: e.target.value }));
                }
              }}
              className="w-full"
              maxLength={20}
            />
            <div className="text-sm text-gray-500">
              {formData.lettering?.length || 0}/20 characters
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Your Information */}
          <div className="space-y-2">
            <h3 className="font-medium">Your Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
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
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
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
              <div className="space-y-2">
                <Label htmlFor="kakaotalkName">KakaoTalk Name</Label>
                <Input 
                  id="kakaotalkName" 
                  name="kakaotalkName"
                  value={formData.kakaotalkName}
                  onChange={handleInputChange}
                  placeholder="Your KakaoTalk username" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramName">Instagram Name</Label>
                <Input 
                  id="instagramName" 
                  name="instagramName"
                  value={formData.instagramName}
                  onChange={handleInputChange}
                  placeholder="@yourusername" 
                />
              </div>
            </div>
          </div>

          {/* Customer Type - Required */}
          <div className="space-y-2">
            <h3 className="font-medium">Customer Type <span className="text-red-500">*</span></h3>
            <RadioGroup 
              value={formData.customerType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, customerType: value as 'new' | 'existing' }))}
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

          {/* Delivery Options - Required */}
          <div className="space-y-2">
            <h3 className="font-medium">Delivery Options <span className="text-red-500">*</span></h3>
            <RadioGroup 
              value={formData.deliveryOption}
              onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryOption: value as 'pickup' | 'delivery' }))}
              className="space-y-2"
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="delivery-pickup" />
                <Label htmlFor="delivery-pickup" className="cursor-pointer">Pickup</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="delivery" 
                  id="delivery-delivery"
                  disabled={totalPrice < 50}
                />
                <Label 
                  htmlFor="delivery-delivery" 
                  className={`cursor-pointer ${totalPrice < 50 ? 'text-gray-400' : ''}`}
                >
                  Delivery {totalPrice < 50 && '(Available for orders over $50)'}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date - Required (after delivery options) */}
          <AvailabilityDatePicker
            value={formData.deliveryDate}
            onChange={(date) => setFormData(prev => ({ ...prev, deliveryDate: date }))}
            label={formData.deliveryOption === 'delivery' ? 'delivery' : 'pickup'}
            required
            className="w-full"
          />

          {/* Time - Required (after delivery options) */}
          <div className="space-y-2">
            <h3 className="font-medium">
              {formData.deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'} Time <span className="text-red-500">*</span>
              <span className="text-sm font-normal text-gray-600 block">Operating hours: 10am - 8pm</span>
            </h3>
            <select
              value={formData.pickupTime}
              onChange={(e) => setFormData(prev => ({ ...prev, pickupTime: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
            >
              <option value="">Select {formData.deliveryOption === 'delivery' ? 'delivery' : 'pickup'} time</option>
              {PICKUP_TIMES.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Address (when delivery selected) */}
          {formData.deliveryOption === 'delivery' && (
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full delivery address"
                className="min-h-[80px]"
                required={formData.deliveryOption === 'delivery'}
              />
            </div>
          )}

          {/* Payment Method - Required */}
          <div className="space-y-2">
            <h3 className="font-medium">Payment Method <span className="text-red-500">*</span></h3>
            <RadioGroup 
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value as 'venmo' | 'zelle' }))}
              className="space-y-2"
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="venmo" id="payment-venmo" />
                <Label htmlFor="payment-venmo" className="cursor-pointer">
                  Venmo ({BUSINESS_CONFIG.payment.venmo.handle})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="zelle" id="payment-zelle" />
                <Label htmlFor="payment-zelle" className="cursor-pointer">
                  Zelle ({BUSINESS_CONFIG.payment.zelle.phone}, {BUSINESS_CONFIG.payment.zelle.name})
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Allergy Agreement - Required */}
          <div className="space-y-2">
            <h3 className="font-medium">Allergy Disclaimer <span className="text-red-500">*</span></h3>
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
                  onChange={(e) => setFormData(prev => ({ ...prev, allergyAgreement: e.target.checked }))}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  required
                />
                <Label htmlFor="allergyAgreement" className="cursor-pointer text-sm">
                  I understand and agree to this disclaimer
                </Label>
              </div>
            </div>
          </div>

          {/* Questions and Comments */}
          <div className="space-y-2">
            <Label htmlFor="questionsComments">Questions and Comments</Label>
            <Textarea
              id="questionsComments"
              name="questionsComments"
              value={formData.questionsComments}
              onChange={handleInputChange}
              placeholder="Any questions or special requests?"
              className="min-h-[100px]"
            />
          </div>

          {/* Discount Code */}
          <div className="space-y-2">
            <Label htmlFor="discountCode">Discount Code</Label>
            <Input
              id="discountCode"
              name="discountCode"
              value={formData.discountCode}
              onChange={handleInputChange}
              placeholder="Enter discount code (optional)"
              className="w-full"
            />
          </div>
        </div>

        {/* Form Total - Spans both columns */}
        <TotalOrder
          cake={cake}
          formData={formData}
          totalPrice={totalPrice}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
