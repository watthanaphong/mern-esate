// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5f3ac.firebaseapp.com",
  projectId: "mern-estate-5f3ac",
  storageBucket: "mern-estate-5f3ac.firebasestorage.app",
  messagingSenderId: "637388610694",
  appId: "1:637388610694:web:f3870b82248ce660d68507"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);