import { NextResponse } from 'next/server';
import { auth } from './app/firebaseConfig';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if the user is authenticated
  const isAuthenticated = await checkAuthentication(request);

  if (!isAuthenticated && path.startsWith('/student')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

async function checkAuthentication(request) {
  // Get the Firebase ID token from the request cookies
  const idToken = request.cookies.get('firebaseIdToken');

  if (!idToken) {
    return false;
  }

  try {
    // Verify the ID token
    await auth.verifyIdToken(idToken);
    return true;
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return false;
  }
}

export const config = {
  matcher: ['/student/:path*', '/api/student/:path*'],
};