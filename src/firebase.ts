import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg3evZm0hxEP4YNsLI4YTFkZ03FMr1fdI",
  authDomain: "plano-habitaciones-hotel.firebaseapp.com",
  projectId: "plano-habitaciones-hotel",
  storageBucket: "plano-habitaciones-hotel.firebasestorage.app",
  messagingSenderId: "739478338167",
  appId: "1:739478338167:web:d8de68fe638808c8126472"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
