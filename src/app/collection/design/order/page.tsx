'use client';

import { notFound } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CakeImageDescription from '@/components/collection/CollectionOrderPage/CakeImageDescription';
import TotalOrder from '@/components/collection/CollectionOrderPage/TotalOrder';

// Left column components
import CakeSizeSelection from '@/components/collection/design/order/left-column/CakeSizeSelection';
import FlavorSelection from '@/components/collection/design/order/left-column/FlavorSelection';
import BaseColorSelection from '@/components/collection/design/order/left-column/BaseColorSelection';
import CandyCrownColorSelection from '@/components/collection/design/order/left-column/CandyCrownColorSelection';
import LetteringColorSelection from '@/components/collection/design/order/left-column/LetteringColorSelection';
import BowColorSelection from '@/components/collection/design/order/left-column/BowColorSelection';
import LetteringInput from '@/components/collection/design/order/left-column/LetteringInput';

// Right column components
import CustomerInformation from '@/components/collection/design/order/right-column/CustomerInformation';
import CustomerType from '@/components/collection/design/order/right-column/CustomerType';
import DeliveryOptions from '@/components/collection/design/order/right-column/DeliveryOptions';
import DateTimeSelection from '@/components/collection/design/order/right-column/DateTimeSelection';
import DeliveryAddress from '@/components/collection/design/order/right-column/DeliveryAddress';
import PaymentMethod from '@/components/collection/design/order/right-column/PaymentMethod';
import AllergyAgreement from '@/components/collection/design/order/right-column/AllergyAgreement';
import QuestionsComments from '@/components/collection/design/order/right-column/QuestionsComments';
import DiscountCode from '@/components/collection/design/order/right-column/DiscountCode';
import { designCakes, type Cake } from '@/data/cakes';
import { submitOrder, type Order } from '@/lib/supabase';
import { 
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

          <CakeSizeSelection
            cake={cake}
            selectedSize={formData.size}
            onSizeChange={handleSizeChange}
          />

          <FlavorSelection
            cake={cake}
            selectedFlavor={formData.flavor}
            onFlavorChange={(value) => setFormData(prev => ({ ...prev, flavor: value }))}
          />

          <BaseColorSelection
            cake={cake}
            selectedBaseColor={formData.baseColor}
            customBaseColor={formData.customBaseColor || ''}
            onBaseColorChange={(value) => setFormData(prev => ({ ...prev, baseColor: value }))}
            onCustomBaseColorChange={(value) => setFormData(prev => ({ ...prev, customBaseColor: value }))}
          />

          <CandyCrownColorSelection
            cake={cake}
            selectedCandyCrownColor={formData.candyCrownColor || ''}
            customCandyCrownColor={formData.customCandyCrownColor || ''}
            onCandyCrownColorChange={(value) => setFormData(prev => ({ ...prev, candyCrownColor: value }))}
            onCustomCandyCrownColorChange={(value) => setFormData(prev => ({ ...prev, customCandyCrownColor: value }))}
          />

          <LetteringColorSelection
            cake={cake}
            selectedLetteringColor={formData.letteringColor || ''}
            customLetteringColor={formData.customLetteringColor || ''}
            onLetteringColorChange={(value) => setFormData(prev => ({ ...prev, letteringColor: value }))}
            onCustomLetteringColorChange={(value) => setFormData(prev => ({ ...prev, customLetteringColor: value }))}
          />

          <BowColorSelection
            cake={cake}
            selectedBowColor={formData.bowColor || ''}
            customBowColor={formData.customBowColor || ''}
            onBowColorChange={(value) => setFormData(prev => ({ ...prev, bowColor: value }))}
            onCustomBowColorChange={(value) => setFormData(prev => ({ ...prev, customBowColor: value }))}
          />

          <LetteringInput
            lettering={formData.lettering || ''}
            onLetteringChange={(value) => setFormData(prev => ({ ...prev, lettering: value }))}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CustomerInformation
            name={formData.name || ''}
            email={formData.email || ''}
            phone={formData.phone || ''}
            kakaotalkName={formData.kakaotalkName || ''}
            instagramName={formData.instagramName || ''}
            onInputChange={handleInputChange}
          />

          <CustomerType
            customerType={formData.customerType || 'new'}
            onCustomerTypeChange={(value) => setFormData(prev => ({ ...prev, customerType: value }))}
          />

          <DeliveryOptions
            deliveryOption={formData.deliveryOption || 'pickup'}
            totalPrice={totalPrice}
            onDeliveryOptionChange={(value) => setFormData(prev => ({ ...prev, deliveryOption: value }))}
          />

          <DateTimeSelection
            deliveryDate={formData.deliveryDate || ''}
            pickupTime={formData.pickupTime || ''}
            deliveryOption={formData.deliveryOption || 'pickup'}
            onDeliveryDateChange={(date) => setFormData(prev => ({ ...prev, deliveryDate: date }))}
            onPickupTimeChange={(time) => setFormData(prev => ({ ...prev, pickupTime: time }))}
          />

          <DeliveryAddress
            address={formData.address || ''}
            deliveryOption={formData.deliveryOption || 'pickup'}
            onAddressChange={handleInputChange}
          />

          <PaymentMethod
            paymentMethod={formData.paymentMethod || 'venmo'}
            onPaymentMethodChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
          />

          <AllergyAgreement
            allergyAgreement={formData.allergyAgreement || false}
            onAllergyAgreementChange={(checked) => setFormData(prev => ({ ...prev, allergyAgreement: checked }))}
          />

          <QuestionsComments
            questionsComments={formData.questionsComments || ''}
            onQuestionsCommentsChange={handleInputChange}
          />

          <DiscountCode
            discountCode={formData.discountCode || ''}
            onDiscountCodeChange={handleInputChange}
          />
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
