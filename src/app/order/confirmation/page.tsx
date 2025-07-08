'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase, type Order } from '@/lib/supabase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { CheckCircle, Phone, Mail, Instagram, Clock, MapPin, CreditCard } from 'lucide-react';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = searchParams.get('id');
        if (!orderId) {
          setError('Order ID not found');
          return;
        }

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) {
          console.error('Error fetching order:', error);
          setError('Order not found');
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 text-center bg-background1 rounded-lg border border-primary">
          <div className="text-tertiary mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-tertiary mb-2">Order Not Found</h1>
          <p className="text-secondary mb-6">{error || 'We couldn\'t find your order details.'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-secondary text-background px-6 py-2 rounded-lg hover:bg-tertiary transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPaymentInstructions = () => {
    if (order.payment_method === 'venmo') {
      return {
        method: 'Venmo',
        details: 'Ellen-Kim-28',
        icon: <CreditCard className="w-5 h-5" />
      };
    } else {
      return {
        method: 'Zelle',
        details: '617-775-4505 (Ellen A Kim)',
        icon: <CreditCard className="w-5 h-5" />
      };
    }
  };

  const paymentInfo = getPaymentInstructions();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-background1 rounded-lg shadow-sm p-8 mb-8 text-center border border-primary">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-tertiary mb-2">Order Confirmed!</h1>
          <p className="text-secondary text-lg mb-4">
            Thank you for your order! We've received your custom cake request and will contact you soon.
          </p>
          <div className="bg-primary border border-secondary rounded-lg p-4 inline-block">
            <p className="text-tertiary font-medium">
              Order ID: <span className="font-mono">{order.id}</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-background1 rounded-lg shadow-sm p-6 border border-primary">
            <h2 className="text-xl font-semibold text-tertiary mb-4">Order Details</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4 border-secondary">
                <h3 className="font-medium text-tertiary mb-2">{order.cake_name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-secondary">Size:</span>
                    <span className="ml-2 font-medium text-tertiary">{order.size}"</span>
                  </div>
                  <div>
                    <span className="text-secondary">Flavor:</span>
                    <span className="ml-2 font-medium text-tertiary">{order.flavor}</span>
                  </div>
                  {order.base_color && (
                    <div>
                      <span className="text-secondary">Base Color:</span>
                      <span className="ml-2 font-medium text-tertiary">{order.base_color}</span>
                    </div>
                  )}
                  {order.lettering && (
                    <div>
                      <span className="text-secondary">Lettering:</span>
                      <span className="ml-2 font-medium text-tertiary">"{order.lettering}"</span>
                    </div>
                  )}
                  {order.lettering_color && (
                    <div>
                      <span className="text-secondary">Lettering Color:</span>
                      <span className="ml-2 font-medium text-tertiary">{order.lettering_color}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b pb-4 border-secondary">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 text-secondary mr-2" />
                  <span className="font-medium text-tertiary">
                    {order.delivery_option === 'delivery' ? 'Delivery' : 'Pickup'}
                  </span>
                </div>
                <p className="text-secondary ml-6">
                  {formatDate(order.delivery_date)} at {order.pickup_time}
                </p>
                {order.delivery_option === 'delivery' && order.address && (
                  <div className="flex items-start mt-2">
                    <MapPin className="w-4 h-4 text-secondary mr-2 mt-0.5" />
                    <p className="text-secondary text-sm">{order.address}</p>
                  </div>
                )}
              </div>

              <div className="border-b pb-4 border-secondary">
                <div className="flex items-center mb-2">
                  <CreditCard className="w-4 h-4 text-secondary mr-2" />
                  <span className="font-medium text-tertiary ml-2">Payment</span>
                </div>
                <p className="text-secondary ml-7">
                  {paymentInfo.method}: {paymentInfo.details}
                </p>
                <p className="text-lg font-semibold text-tertiary ml-7 mt-1">
                  Total: ${order.total_price}
                </p>
              </div>

              {order.questions_comments && (
                <div>
                  <h4 className="font-medium text-tertiary mb-2">Special Requests</h4>
                  <p className="text-secondary text-sm bg-background2 p-3 rounded">
                    {order.questions_comments}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background1 rounded-lg shadow-sm p-6 border border-primary">
            <h2 className="text-xl font-semibold text-tertiary mb-4">Customer Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-tertiary mb-2">{order.customer_name}</h3>
                <p className="text-sm text-secondary mb-3">
                  {order.customer_type === 'new' ? 'New Customer' : 'Existing Customer'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-secondary mr-3" />
                  <span className="text-tertiary">{order.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-secondary mr-3" />
                  <span className="text-tertiary">{order.email}</span>
                </div>
                
                {order.instagram_name && (
                  <div className="flex items-center">
                    <Instagram className="w-4 h-4 text-secondary mr-3" />
                    <span className="text-tertiary">{order.instagram_name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-8 bg-primary border border-secondary rounded-lg p-4">
              <h3 className="font-medium text-tertiary mb-2">What's Next?</h3>
              <ul className="text-sm text-secondary space-y-1">
                <li>• We'll contact you within 24 hours to confirm your order</li>
                <li>• Please send payment via {paymentInfo.method} to {paymentInfo.details}</li>
                <li>• We'll send updates via email, phone, or Instagram</li>
                <li>• Your cake will be ready for {order.delivery_option} on {formatDate(order.delivery_date)}</li>
              </ul>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-secondary text-background py-2 px-4 rounded-lg hover:bg-tertiary transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-tertiary text-background py-2 px-4 rounded-lg hover:bg-secondary transition-colors"
              >
                Print Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}