import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Countries that are actual customers (Argentina + neighbors + relevant)
const ALLOWED_COUNTRIES = new Set([
  'AR', // Argentina
  'UY', // Uruguay
  'CL', // Chile
  'BR', // Brazil
  'PY', // Paraguay
  'BO', // Bolivia
  'US', // USA (expats, business)
  'ES', // Spain
  'MX', // Mexico
  'CO', // Colombia
  'PE', // Peru
  'EC', // Ecuador
  'VE', // Venezuela
])

function isBlockedTraffic(req: NextRequest): boolean {
  const country = req.headers.get('x-vercel-ip-country') || req.geo?.country
  // If no country info, allow through
  if (!country) return false
  // Block if not in allowed list
  return !ALLOWED_COUNTRIES.has(country)
}

export default auth((req) => {
  const { pathname } = req.nextUrl

  // --- Traffic protection (non-admin, non-API public pages) ---
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/')) {
    if (isBlockedTraffic(req)) {
      return new NextResponse('Access restricted', { status: 403 })
    }
  }

  // --- Admin auth ---
  const isLoggedIn = !!req.auth

  if (pathname.startsWith('/admin/login')) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Admin routes (auth)
    '/admin/:path*',
    // Public pages (geo protection) - exclude static files and API
    '/((?!_next/static|_next/image|favicon.ico|images|api/).*)',
  ]
}
