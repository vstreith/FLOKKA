export interface Club {
  id: string
  name: string
  slug: string
  code: string
  description?: string
  logo?: string
  primaryColor: string
  type: string
  email?: string
  phone?: string
  address?: string
  isActive: boolean
  margin: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  type: string
  isActive: boolean
}

export interface Product {
  id: string
  name: string
  description?: string
  basePrice: number
  images: string[]
  categoryId: string
  category?: Category
  isCustomizable: boolean
  hasNameNumber: boolean
  variants: ProductVariant[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ClubProduct {
  id: string
  clubId: string
  productId: string
  product: Product
  customPrice?: number
  isActive: boolean
  effectivePrice: number
}

export interface OrderItem {
  id?: string
  productId: string
  productName: string
  variant?: string
  quantity: number
  unitPrice: number
  customName?: string
  customNumber?: string
}

export interface Order {
  id: string
  orderNumber: string
  clubId: string
  club?: Club
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerAddress?: string
  notes?: string
  items: OrderItem[]
  subtotal: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'in_production' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'

export interface ContactRequest {
  id: string
  name: string
  structure?: string
  email: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export interface CartItem {
  productId: string
  productName: string
  variant?: string
  quantity: number
  unitPrice: number
  customName?: string
  customNumber?: string
}

export interface ShopAccess {
  slug: string
  name: string
  description?: string
  logo?: string
  primaryColor: string
  margin: number
}

export interface AdminStats {
  totalClubs: number
  activeClubs: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
  newContacts: number
  recentOrders: Order[]
}
