'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Eye, Search, Calendar, Package, User, Phone, Mail } from 'lucide-react'
import { supabase, Order } from '@/lib/supabase'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order(sortBy, { ascending: sortOrder === 'asc' })

      if (error) {
        console.error('Error fetching orders:', error)
      } else {
        setOrders(data || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }, [sortBy, sortOrder])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase()
    return (
      order.customer_name.toLowerCase().includes(searchLower) ||
      order.email.toLowerCase().includes(searchLower) ||
      order.phone.includes(searchTerm) ||
      order.cake_name.toLowerCase().includes(searchLower) ||
      order.id?.toLowerCase().includes(searchLower)
    )
  })


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
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package size={24} />
            Order Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders by customer, email, phone, or cake name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Order Date</SelectItem>
                  <SelectItem value="delivery_date">Delivery Date</SelectItem>
                  <SelectItem value="customer_name">Customer</SelectItem>
                  <SelectItem value="total_price">Price</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No orders found matching your search.' : 'No orders found.'}
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{order.cake_name}</h3>
                          <Badge className={getStatusColor(order.delivery_date)}>
                            {new Date(order.delivery_date) < new Date() ? 'Overdue' : 
                             Math.ceil((new Date(order.delivery_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 2 ? 'Due Soon' : 'Scheduled'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{order.customer_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span>{order.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail size={14} />
                            <span>{order.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Delivery: {new Date(order.delivery_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="font-medium">Size: {order.size}</span>
                          <span className="font-medium">Flavor: {order.flavor}</span>
                          <span className="font-medium text-green-600">${order.total_price}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Eye size={16} />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {filteredOrders.length > 0 && (
            <div className="mt-6 text-sm text-gray-500 text-center">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}