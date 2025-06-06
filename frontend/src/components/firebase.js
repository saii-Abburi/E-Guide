// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAETHlcsTPIy1ciOWOUrB12s2aQqYNPb-w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "e-guide-4e170.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "e-guide-4e170",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "e-guide-4e170.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "688892710458",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:688892710458:web:e035ddb6067f3c7bce2f03",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||"G-0WHKKZF078",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);
export default auth;
