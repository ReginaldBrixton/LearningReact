import { NextResponse } from 'next/server';

export function middleware(request) {
  // Your middleware logic here
  // For example:
  // const isLoggedIn = // check if user is logged in
  // if (!isLoggedIn) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

// Optional: Configure middleware to run on specific paths
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
