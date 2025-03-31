
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

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

// Initialize Firestore with persistence enabled
// Use the new recommended API for persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  })
});

// For backwards compatibility with existing code, also attempt to enable 
// indexed DB persistence with the older API
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

export { db };
