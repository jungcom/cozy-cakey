'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Package, 
  MessageSquare,
  Trash2
} from 'lucide-react'
import { supabase, Order } from '@/lib/supabase'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchOrder(params.id as string)
    }
  }, [params.id])

  const fetchOrder = async (orderId: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (error) {
        console.error('Error fetching order:', error)
        setError('Order not found')
      } else {
        setOrder(data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      setError('Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrder = async () => {
    if (!order || !confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id)

      if (error) {
        console.error('Error deleting order:', error)
        setError('Failed to delete order')
      } else {
        router.push('/admin/orders')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      setError('Failed to delete order')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (deliveryDate: string) => {
    const today = new Date()
    const delivery = new Date(deliveryDate)
    const diffDays = Math.ceil((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'bg-red-100 text-red-800'
    if (diffDays <= 2) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error || 'Order not found'}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push('/admin/orders')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            onClick={handleDeleteOrder}
            className="flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete Order
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package size={24} />
              Order Details
            </CardTitle>
            <Badge className={getStatusColor(order.delivery_date)}>
              {new Date(order.delivery_date) < new Date() ? 'Overdue' : 
               Math.ceil((new Date(order.delivery_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 2 ? 'Due Soon' : 'Scheduled'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Cake Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {order.cake_name}</div>
                  <div><span className="font-medium">Size:</span> {order.size}</div>
                  <div><span className="font-medium">Flavor:</span> {order.flavor}</div>
                  {order.base_color && (
                    <div><span className="font-medium">Base Color:</span> {order.base_color}</div>
                  )}
                  {order.custom_base_color && (
                    <div><span className="font-medium">Custom Base Color:</span> {order.custom_base_color}</div>
                  )}
                  {order.lettering && (
                    <div><span className="font-medium">Lettering:</span> {order.lettering}</div>
                  )}
                  {order.lettering_color && (
                    <div><span className="font-medium">Lettering Color:</span> {order.lettering_color}</div>
                  )}
                  {order.custom_lettering_color && (
                    <div><span className="font-medium">Custom Lettering Color:</span> {order.custom_lettering_color}</div>
                  )}
                  {order.candy_crown_color && (
                    <div><span className="font-medium">Candy Crown Color:</span> {order.candy_crown_color}</div>
                  )}
                  {order.custom_candy_crown_color && (
                    <div><span className="font-medium">Custom Candy Crown Color:</span> {order.custom_candy_crown_color}</div>
                  )}
                  {order.bow_color && (
                    <div><span className="font-medium">Bow Color:</span> {order.bow_color}</div>
                  )}
                  {order.custom_bow_color && (
                    <div><span className="font-medium">Custom Bow Color:</span> {order.custom_bow_color}</div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Delivery Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span><span className="font-medium">Date:</span> {new Date(order.delivery_date).toLocaleDateString()}</span>
                  </div>
                  <div><span className="font-medium">Pickup Time:</span> {order.pickup_time}</div>
                  <div><span className="font-medium">Option:</span> {order.delivery_option}</div>
                  {order.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span><span className="font-medium">Address:</span> {order.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span><span className="font-medium">Name:</span> {order.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span><span className="font-medium">Email:</span> {order.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span><span className="font-medium">Phone:</span> {order.phone}</span>
                  </div>
                  <div><span className="font-medium">Type:</span> {order.customer_type}</div>
                  {order.kakaotalk_name && (
                    <div><span className="font-medium">KakaoTalk:</span> {order.kakaotalk_name}</div>
                  )}
                  {order.instagram_name && (
                    <div><span className="font-medium">Instagram:</span> {order.instagram_name}</div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <span><span className="font-medium">Payment Method:</span> {order.payment_method}</span>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    Total: ${order.total_price}
                  </div>
                  {order.discount_code && (
                    <div><span className="font-medium">Discount Code:</span> {order.discount_code}</div>
                  )}
                  <div><span className="font-medium">Allergy Agreement:</span> {order.allergy_agreement ? 'Yes' : 'No'}</div>
                  <div><span className="font-medium">Order ID:</span> {order.id}</div>
                  <div><span className="font-medium">Created:</span> {formatDate(order.created_at || '')}</div>
                </div>
              </div>
            </div>
          </div>

          {order.questions_comments && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <MessageSquare size={20} />
                  Questions & Comments
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{order.questions_comments}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}