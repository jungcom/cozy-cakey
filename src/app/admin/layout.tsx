'use client'

import { usePathname } from 'next/navigation'
import AdminNav from '@/components/admin/admin-nav'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { isAuthenticated, loading } = useAuth()
  
  // Don't show AdminNav on login page or when not authenticated
  const showAdminNav = pathname !== '/admin/login' && isAuthenticated && !loading
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {showAdminNav && <AdminNav />}
        {children}
      </div>
    </div>
  )
}