// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6XvV16Rulb7FLDgkdbmHx3dW_fpwoXLU",
  authDomain: "tailoring-app-79527.firebaseapp.com",
  projectId: "tailoring-app-79527",
  storageBucket: "tailoring-app-79527.appspot.com",
  messagingSenderId: "291641145779",
  appId: "1:291641145779:web:c218b67bbc0d31519cb3c6",
  measurementId: "G-QVQKV1HEJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);