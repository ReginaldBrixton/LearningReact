import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA5MjFuz1gZgTgmDQfz2xegR8tK7-qJcOM",
  authDomain: "sample-firebase-ai-app-e4ee2.firebaseapp.com",
  projectId: "sample-firebase-ai-app-e4ee2",
  storageBucket: "sample-firebase-ai-app-e4ee2.appspot.com",
  messagingSenderId: "528387285026",
  appId: "1:528387285026:web:58648592940288f7e6ea7b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);