import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth';

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
  
  // Uncomment the following line if you're using Firebase Emulators
  // connectAuthEmulator(auth, "http://localhost:9099");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, auth, googleProvider };