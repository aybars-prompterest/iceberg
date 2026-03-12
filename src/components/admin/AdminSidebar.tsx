'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/cn'
import { LayoutDashboard, FileText, Settings, Bot, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Ayarlar', href: '/admin/settings', icon: Settings },
  { label: 'Bot', href: '/admin/bot', icon: Bot },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border flex items-center justify-between">
        <span className="text-text-primary font-semibold text-lg tracking-tight">Iceberg Admin</span>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-text-secondary hover:text-text-primary cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'text-accent bg-accent/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-primary/50 transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          Çıkış
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-bg-surface border border-border rounded-lg p-2 text-text-secondary hover:text-text-primary cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop: static, mobile: overlay */}
      <aside
        className={cn(
          'w-[240px] min-h-screen bg-bg-surface border-r border-border flex flex-col shrink-0',
          'fixed lg:sticky lg:top-0 z-50 transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
