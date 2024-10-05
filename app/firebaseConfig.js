import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA5MjFuz1gZgTgmDQfz2xegR8tK7-qJcOM",
  authDomain: "sample-firebase-ai-app-e4ee2.firebaseapp.com",
  projectId: "sample-firebase-ai-app-e4ee2",
  storageBucket: "sample-firebase-ai-app-e4ee2.appspot.com",
  messagingSenderId: "528387285026",
  appId: "1:528387285026:web:58648592940288f7e6ea7b"
};

let app;
let auth;
let googleProvider;

try {
  console.log("Initializing Firebase app...");
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");
  
  console.log("Getting auth instance...");
  auth = getAuth(app);
  console.log("Auth instance obtained successfully");
  
  googleProvider = new GoogleAuthProvider();
  console.log("Google Auth Provider created successfully");

  // Log the current domain
  if (typeof window !== 'undefined') {
    console.log("Current domain:", window.location.hostname);
  }

} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Log more details about the error
  if (error.code === 'auth/unauthorized-domain') {
    console.error("Unauthorized domain. Please add this domain to your Firebase console's authorized domains list.");
  }
}

// Function to initiate Google Sign-In with redirect
const signInWithGoogle = () => {
  return signInWithRedirect(auth, googleProvider);
};

export { app, auth, googleProvider, signInWithGoogle };