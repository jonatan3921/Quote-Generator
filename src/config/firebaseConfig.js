// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Auth
import {getAuth} from 'firebase/auth'

// For Database
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArnpoP5DWd4BkD1kCAvX_qvL-U0rOHHuA",
  authDomain: "quote-generator-3eb64.firebaseapp.com",
  projectId: "quote-generator-3eb64",
  storageBucket: "quote-generator-3eb64.appspot.com",
  messagingSenderId: "122017774412",
  appId: "1:122017774412:web:3b97c81a9048b21b2fede9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up auth and export it
export const auth = getAuth(app)

// Set up database and export it
export const db = getFirestore(app)