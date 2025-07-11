import { useState, useEffect } from 'react';
import { type Cake } from '@/data/cakes';
import { 
  type OrderFormData, 
  getDefaultFormData,
  getSizeOptionsFromCake,
  getFlavorOptionsFromCake,
  getBaseColorOptionsFromCake,
  getCandyCrownColorOptionsFromCake,
  getLetteringColorOptionsFromCake,
  getBowColorOptionsFromCake,
} from '@/utils/orderFormUtils';

export interface UseOrderFormOptions {
  cake?: Cake | null;
  orderType?: 'design' | 'catering';
}

export function useOrderForm({ cake, orderType = 'design' }: UseOrderFormOptions = {}) {
  const [formData, setFormData] = useState<Omit<OrderFormData, 'cakeId'>>(getDefaultFormData());

  // Initialize form data with cake-specific defaults when cake changes
  useEffect(() => {
    if (!cake) return;

    if (orderType === 'design') {
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
    } else if (orderType === 'catering') {
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
  }, [cake, orderType]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
  };

  return {
    formData,
    handleInputChange,
    updateFormData,
    resetForm,
    setFormData
  };
}