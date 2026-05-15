// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW4FYyk63p9vWRiorHqH6JhNX1-S1LssE",
  authDomain: "brains-smart-vms.firebaseapp.com",
  projectId: "brains-smart-vms",
  storageBucket: "brains-smart-vms.firebasestorage.app",
  messagingSenderId: "74875321307",
  appId: "1:74875321307:web:ac7068805c6dc6502505fe",
  measurementId: "G-S9KQ8DRTD1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
