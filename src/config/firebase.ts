
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZXjRIgDGQpyC4TSAkvGvpxNbGEHIu2KM",
  authDomain: "dbarrique-wines.firebaseapp.com",
  projectId: "dbarrique-wines",
  storageBucket: "dbarrique-wines.appspot.com",
  messagingSenderId: "555848456578",
  appId: "1:555848456578:web:7e8ee9a1d1f4f5c6a2b3c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
