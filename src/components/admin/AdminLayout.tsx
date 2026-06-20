'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { FlokkaLogo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/clubs', label: 'Clubs & Associations', icon: Users },
  { href: '/admin/produits', label: 'Produits', icon: Package },
  { href: '/admin/commandes', label: 'Commandes', icon: ShoppingCart },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('flokka_token')
    const userData = localStorage.getItem('flokka_user')
    if (!token || !userData) {
      router.push('/admin/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('flokka_token')
    localStorage.removeItem('flokka_user')
    router.push('/admin/login')
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-brand-black text-white flex flex-col transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:inset-auto'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <FlokkaLogo size="sm" href="/admin" dark={false} />
          <p className="text-xs text-white/40 mt-2 tracking-wider uppercase">Administration</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href, item.exact)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors',
                  active
                    ? 'bg-white text-brand-black'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon size={16} />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-white/40 truncate">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 text-xs text-center py-1.5 text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded transition-colors"
            >
              Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs py-1.5 px-3 text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded transition-colors"
            >
              <LogOut size={12} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-4 px-4 h-14 bg-white border-b border-gray-200 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="font-bold tracking-widest text-sm">FLOKKA</span>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
