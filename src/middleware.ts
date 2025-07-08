import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticatedFromRequest, createAuthResponse } from './lib/auth'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Check if user is authenticated
    if (!isAdminAuthenticatedFromRequest(request)) {
      return createAuthResponse(request)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}