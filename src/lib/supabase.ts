
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Medicine {
  id: string
  name: string
  generic_name?: string
  batch_number: string
  manufacturer: string
  quantity: number
  unit_price: number
  selling_price: number
  expiry_date: string
  minimum_stock: number
  category: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  date_of_birth?: string
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  name: string
  contact_person: string
  email?: string
  phone: string
  address?: string
  payment_terms?: string
  created_at: string
  updated_at: string
}

export interface Sale {
  id: string
  customer_id?: string
  total_amount: number
  discount: number
  final_amount: number
  payment_method: string
  sale_date: string
  cashier_id: string
  created_at: string
}

export interface SaleItem {
  id: string
  sale_id: string
  medicine_id: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface Purchase {
  id: string
  supplier_id: string
  total_amount: number
  purchase_date: string
  grn_number?: string
  created_at: string
}

export interface PurchaseItem {
  id: string
  purchase_id: string
  medicine_id: string
  quantity: number
  unit_cost: number
  total_cost: number
  batch_number: string
  expiry_date: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'pharmacist' | 'cashier' | 'supplier'
  phone?: string
  created_at: string
  updated_at: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  expense_date: string
  created_by: string
  created_at: string
}
