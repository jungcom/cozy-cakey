import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_COOKIE_NAME = 'admin-authenticated'

export async function validateAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  return adminPassword === password
}

export async function setAdminCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
}

export async function removeAdminCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const adminCookie = cookieStore.get(ADMIN_COOKIE_NAME)
  return adminCookie?.value === 'true'
}

export function isAdminAuthenticatedFromRequest(request: NextRequest): boolean {
  const adminCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  return adminCookie?.value === 'true'
}

export function createAuthResponse(request: NextRequest): NextResponse {
  const url = new URL('/admin/login', request.url)
  url.searchParams.set('redirect', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}