// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBgnMR0Vw9f_HgCDU4ywIYoB6er8HTV3TE',
  authDomain: 'tailoring-app-eef31.firebaseapp.com',
  projectId: 'tailoring-app-eef31',
  storageBucket: 'tailoring-app-eef31.appspot.com',
  messagingSenderId: '765276535513',
  appId: '1:765276535513:web:e27861cb2d1670e2fc1cc8',
  measurementId: 'G-TRZH37BD8Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
