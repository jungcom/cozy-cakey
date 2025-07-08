'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, ClipboardList, Home } from 'lucide-react'

export default function AdminNav() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Admin Dashboard</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex gap-4">
          <Link href="/admin/orders">
            <Button variant="outline" className="flex items-center gap-2">
              <ClipboardList size={16} />
              Orders
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <Home size={16} />
              Back to Site
            </Button>
          </Link>
        </nav>
      </CardContent>
    </Card>
  )
}