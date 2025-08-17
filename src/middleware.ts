import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes are public (don't require authentication)
const publicRoutes = ['/login', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Get the auth token from cookies
  const token = request.cookies.get('ai-demo-token');
  
  // If it's a public route, allow access
  if (isPublicRoute) {
    // If user is already authenticated and trying to access login/signup, redirect to home
    if (token && (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  
  // For protected routes, check if user is authenticated
  if (!token) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};