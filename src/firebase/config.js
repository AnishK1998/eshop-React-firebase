// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  // apiKey: "AIzaSyCSpOxUY5nUK__ctk-316hCPSqjjGylUnE",
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-14522.firebaseapp.com",
  projectId: "eshop-14522",
  storageBucket: "eshop-14522.appspot.com",
  messagingSenderId: "554022859872",
  appId: "1:554022859872:web:f43fb59b091870c49ebf05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

export default app;