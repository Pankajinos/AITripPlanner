// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO7dc-TOv4T0SgPBbC-5RPgZ_nYvgtcSQ",
  authDomain: "ai-trip-planner-5a8db.firebaseapp.com",
  projectId: "ai-trip-planner-5a8db",
  storageBucket: "ai-trip-planner-5a8db.appspot.com", // ✅ Corrected
  messagingSenderId: "612674323201",
  appId: "1:612674323201:web:31dea39ec3b7eeb9101100",
  measurementId: "G-G8N2QBRF39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
