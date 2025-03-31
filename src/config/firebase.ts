
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

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

// Get Firestore instance with additional options
const db = getFirestore(app);

// Configure Firestore settings (if needed)
// The experimentalForceLongPolling and experimentalAutoDetectLongPolling properties
// can be applied using FirebaseFirestore.settings(), but they're not directly 
// available in the latest Firebase SDK version. Instead, we use connection resilience
// strategies in the wineService.ts file.

// In development environment, you might want to use the Firestore emulator
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(db, '127.0.0.1', 8080);
// }

export { db };
