'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, signInWithGoogle, setSessionCookie } from '../firebaseConfig'

import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorBanner, setShowErrorBanner] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log('LoginPage: useEffect hook triggered');
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('LoginPage: Auth state changed:', user ? 'User signed in' : 'No user');
      if (user) {
        console.log('LoginPage: User is signed in, user details:', JSON.stringify(user, null, 2));
        console.log('LoginPage: Attempting to redirect to dashboard');
        // Use a timeout to ensure the router is ready
        setTimeout(() => {
          router.push('/student/dashboard');
        }, 100);
      } else {
        console.log('LoginPage: No user signed in');
      }
    });

    return () => {
      console.log('LoginPage: Cleaning up auth state listener');
      unsubscribe();
    };
  }, [router]);

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await setSessionCookie(userCredential.user);
      console.log("User signed in:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error.code, error.message, error);
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error("Email/Password sign-in is not enabled. Please contact the administrator.");
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error("Invalid email or password. Please try again.");
      } else {
        throw new Error("An error occurred during login. Please try again later.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    console.log('LoginPage: Handle submit triggered');

    try {
      const user = await handleLogin(email, password);
      console.log('LoginPage: Login successful, user:', user.uid);
      // Redirection is handled in the useEffect hook
    } catch (error) {
      console.error('LoginPage: Login error:', error);
      setError(error.message);
      setShowErrorBanner(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log('Google sign-in successful:', result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message);
      setShowErrorBanner(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your project dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showErrorBanner && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block mr-2">⌛</span>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Log In
                </>
              )}
            </Button>
          </form>
          <div className="mt-4">
            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
              <span className="mr-2 font-bold text-blue-500">G</span> Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span>Don&apos;t have an account? </span>
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </div>
          <Link href="/forgot-password" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary">
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}