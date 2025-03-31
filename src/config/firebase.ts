
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';

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

// Get Firestore instance
const db = getFirestore(app);

// Enable offline persistence with unlimited cache size
// This helps with connectivity issues by allowing the app to work offline
// and sync when connection is restored
enableIndexedDbPersistence(db, {
  forceOwnership: true // Take ownership of the persistence layer forcefully
}).catch((err) => {
  console.error("Firestore persistence error:", err.code, err.message);
  if (err.code === 'failed-precondition') {
    console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
  } else if (err.code === 'unimplemented') {
    console.warn("The current browser doesn't support offline persistence.");
  }
});

// Configure Firestore settings for better performance and network resilience
db.settings({
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  ignoreUndefinedProperties: true
});

export { db };
