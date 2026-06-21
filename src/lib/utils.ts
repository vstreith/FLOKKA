import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

/**
 * Prix affiché au client final.
 * = prix fournisseur (basePrice) + marge du club (%),
 * sauf si un prix spécial (customPrice) est défini pour ce club/produit.
 */
export function computeEffectivePrice(
  basePrice: number,
  margin: number | null | undefined,
  customPrice?: number | null
): number {
  if (customPrice !== null && customPrice !== undefined) {
    return Math.round(customPrice * 100) / 100
  }
  const withMargin = basePrice * (1 + (margin || 0) / 100)
  return Math.round(withMargin * 100) / 100
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function generateCode(length = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `FLK-${timestamp}-${random}`
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmé',
  in_production: 'En production',
  shipped: 'Expédié',
  delivered: 'Livré',
  cancelled: 'Annulé',
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_production: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  unpaid: 'Non payé',
  paid: 'Payé',
  refunded: 'Remboursé',
}

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  unpaid: 'bg-gray-100 text-gray-700',
  paid: 'bg-green-100 text-green-800',
  refunded: 'bg-orange-100 text-orange-800',
}

export const CLUB_TYPE_LABELS: Record<string, string> = {
  club: 'Club sportif',
  association: 'Association',
  entreprise: 'Entreprise / PME',
  commune: 'Commune',
  evenement: 'Événement',
}
