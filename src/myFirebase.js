// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAX28nK9l85epu4ReG1Fu-6gpvSa-Kz130",
  authDomain: "corriere-a33bc.firebaseapp.com",
  databaseURL: "https://corriere-a33bc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "corriere-a33bc",
  storageBucket: "corriere-a33bc.appspot.com",
  messagingSenderId: "639406162460",
  appId: "1:639406162460:web:06cb4bf604f707646915d9",
  measurementId: "G-QV8W5E3QM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase();