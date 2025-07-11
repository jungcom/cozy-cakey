'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CakeImageDescription from '@/components/collection/CollectionOrderPage/CakeImageDescription';
import QuantitySelection from '@/components/collection/catering/order/QuantitySelection';
import FlavorSelection from '@/components/collection/catering/order/FlavorSelection';
import TopperSelection from '@/components/collection/catering/order/TopperSelection';
import CustomerInformation from '@/components/collection/catering/order/CustomerInformation';
import PickupDeliveryInfo from '@/components/collection/catering/order/PickupDeliveryInfo';
import SpecialInstructions from '@/components/collection/catering/order/SpecialInstructions';
import PaymentMethod from '@/components/collection/catering/order/PaymentMethod';
import AllergyAgreement from '@/components/collection/catering/order/AllergyAgreement';
import OrderSummary from '@/components/collection/catering/order/OrderSummary';
import { cateringCakes, type Cake } from '@/data/cakes';
import { submitOrder, type Order } from '@/lib/supabase';
import { 
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
    // Find mini cake cups in the cateringCakes array
    const miniCakeCups = cateringCakes.find(c => c.id === 'mini-cake-cups');
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
                <QuantitySelection
                  cake={cake}
                  selectedSize={formData.size}
                  customQuantity={formData.customQuantity || ''}
                  onSizeChange={(value) => handleInputChange('size', value)}
                  onCustomQuantityChange={(value) => handleInputChange('customQuantity', value)}
                />

                <FlavorSelection
                  cake={cake}
                  selectedFlavor={formData.flavor}
                  onFlavorChange={(value) => handleInputChange('flavor', value)}
                />

                <TopperSelection
                  cake={cake}
                  selectedTopper={formData.topperOption || ''}
                  customTopperText={formData.customTopperText || ''}
                  onTopperChange={(value) => handleInputChange('topperOption', value)}
                  onCustomTopperTextChange={(value) => handleInputChange('customTopperText', value)}
                />

                <CustomerInformation
                  customerName={formData.customerName || ''}
                  email={formData.email || ''}
                  phone={formData.phone || ''}
                  kakaotalkName={formData.kakaotalkName || ''}
                  instagramName={formData.instagramName || ''}
                  customerType={formData.customerType || 'new'}
                  onInputChange={handleInputChange}
                />

                <PickupDeliveryInfo
                  pickupDate={formData.pickupDate || ''}
                  pickupTime={formData.pickupTime || ''}
                  deliveryOption={formData.deliveryOption}
                  deliveryAddress={formData.deliveryAddress || ''}
                  onInputChange={handleInputChange}
                />

                <SpecialInstructions
                  specialInstructions={formData.specialInstructions || ''}
                  onInstructionsChange={(value) => handleInputChange('specialInstructions', value)}
                />

                <PaymentMethod
                  paymentMethod={formData.paymentMethod}
                  onPaymentMethodChange={(value) => handleInputChange('paymentMethod', value)}
                />

                <AllergyAgreement
                  allergyAgreement={formData.allergyAgreement}
                  onAgreementChange={(value) => handleInputChange('allergyAgreement', value)}
                />

                <OrderSummary
                  cake={cake}
                  selectedSize={formData.size}
                  customQuantity={formData.customQuantity || ''}
                  selectedFlavor={formData.flavor}
                  selectedTopper={formData.topperOption || ''}
                  customTopperText={formData.customTopperText || ''}
                  totalPrice={calculateTotal()}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}