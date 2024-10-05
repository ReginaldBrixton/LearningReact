import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated && path.startsWith('/student')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*'],
};