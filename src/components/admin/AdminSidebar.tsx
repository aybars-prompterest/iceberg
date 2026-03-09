'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/cn'

const navLinks = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Ayarlar', href: '/admin/settings' },
  { label: 'Bot', href: '/admin/bot' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-[220px] min-h-screen bg-bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <span className="text-text-primary font-semibold text-lg">🧊 Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {navLinks.map(({ label, href }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'text-accent border-l-2 border-accent pl-[10px] bg-accent/5'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
              )}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-primary/50 transition-colors cursor-pointer"
        >
          Çıkış
        </button>
      </div>
    </aside>
  )
}
