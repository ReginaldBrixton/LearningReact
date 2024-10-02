import { NextResponse } from 'next/server';

export async function middleware(request) {
  console.log('Middleware: Triggered for path:', request.nextUrl.pathname);

  // Remove the auth check from middleware as it's not reliable for server-side checks
  // Instead, we'll handle authentication in the client-side components

  if (request.nextUrl.pathname === '/student/dashboard') {
    console.log('Middleware: Allowing access to dashboard');
    return NextResponse.next();
  }

  console.log('Middleware: Proceeding to next middleware or page');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}