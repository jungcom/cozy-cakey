import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Order interface for database operations
export interface Order {
  id?: string
  cake_id: string
  cake_name: string
  size: string
  flavor: string
  base_color?: string
  custom_base_color?: string
  lettering?: string
  lettering_color?: string
  custom_lettering_color?: string
  candy_crown_color?: string
  custom_candy_crown_color?: string
  bow_color?: string
  custom_bow_color?: string
  delivery_date: string
  pickup_time: string
  customer_name: string
  email: string
  phone: string
  kakaotalk_name?: string
  instagram_name?: string
  customer_type: string
  delivery_option: string
  address?: string
  delivery_fee?: number
  payment_method: string
  allergy_agreement: boolean
  questions_comments?: string
  discount_code?: string
  total_price: number
  order_data: any // Full form data as JSON
  created_at?: string
}

// Function to submit an order
export async function submitOrder(orderData: Order) {
  console.log('Submitting order data:', orderData)
  
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()

  if (error) {
    console.error('Supabase error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    throw new Error(`Database error: ${error.message}`)
  }

  console.log('Order submitted successfully:', data)
  return data
}

