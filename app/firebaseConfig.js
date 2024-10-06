// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase configuration object
// TODO: Move these credentials to environment variables for better security
const firebaseConfig = {
  apiKey: "AIzaSyA5MjFuz1gZgTgmDQfz2xegR8tK7-qJcOM",
  authDomain: "sample-firebase-ai-app-e4ee2.firebaseapp.com",
  projectId: "sample-firebase-ai-app-e4ee2",
  storageBucket: "sample-firebase-ai-app-e4ee2.appspot.com",
  messagingSenderId: "528387285026",
  appId: "1:528387285026:web:58648592940288f7e6ea7b"
};

// Declare variables to hold Firebase instances
let app;
let auth;
let googleProvider;

try {
  // Initialize Firebase app
  console.log("Initializing Firebase app...");
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");
  
  // Get Firebase Auth instance
  console.log("Getting auth instance...");
  auth = getAuth(app);
  console.log("Auth instance obtained successfully");
  
  // Create Google Auth Provider
  googleProvider = new GoogleAuthProvider();
  console.log("Google Auth Provider created successfully");

  // Log the current domain (useful for debugging auth domain issues)
  if (typeof window !== 'undefined') {
    console.log("Current domain:", window.location.hostname);
  }

} catch (error) {
  console.error("Error initializing Firebase:", error);
  
  // Provide more detailed error information for unauthorized domain
  if (error.code === 'auth/unauthorized-domain') {
    console.error("Unauthorized domain. Please add this domain to your Firebase console's authorized domains list.");
    console.error("Current domain:", window.location.hostname);
  }
}

/**
 * Initiates Google Sign-In with popup
 * @returns {Promise} A promise that resolves with the user credential
 */
const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
    .catch(error => {
      console.error("Error during Google Sign-In:", error);
      throw error; // Re-throw the error for the caller to handle
    });
};

// Export Firebase instances and authentication function
export { app, auth, googleProvider, signInWithGoogle };