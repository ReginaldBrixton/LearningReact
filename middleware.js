import { NextResponse } from 'next/server';
import { auth } from './app/firebaseConfig';

export async function middleware(request) {
  const session = await auth.currentUser;

  if (!session && request.nextUrl.pathname.startsWith('/student/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/dashboard/:path*'],
};