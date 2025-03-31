
import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

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
// Use only the new recommended API for persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  })
});

// Export initialized Firestore
export { db };

