import { NextResponse } from 'next/server';
import { auth } from './app/firebaseConfig';

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

export async function middleware(request) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  if (!session && !PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/student/dashboard', request.url));
  }

  // Optionally, you can add session verification here
  // if (session) {
  //   try {
  //     await auth.verifySessionCookie(session);
  //   } catch (error) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/student/:path*'
  ],
};