
import { db } from '@/config/firebase';
import { enableNetwork, disableNetwork } from 'firebase/firestore';

// Network status tracking
export let isOfflineMode = false;
export const MAX_RETRIES = 5;
export const RETRY_DELAY_MS = 2000;
export const MAX_BACKOFF_MS = 30000;

// Function to switch to offline mode
export const goOffline = async (): Promise<void> => {
  if (!isOfflineMode) {
    console.log("wineService: Switching to offline mode");
    isOfflineMode = true;
    try {
      await disableNetwork(db);
    } catch (error) {
      console.error("wineService: Error disabling network:", error);
    }
  }
};

// Function to switch to online mode
export const goOnline = async (): Promise<void> => {
  if (isOfflineMode) {
    console.log("wineService: Switching to online mode");
    isOfflineMode = false;
    try {
      await enableNetwork(db);
    } catch (error) {
      console.error("wineService: Error enabling network:", error);
    }
  }
};

// Helper function to implement exponential backoff retry logic for Firestore operations
export const withRetry = async <T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      // Check if it's the last retry
      if (attempt === retries - 1) {
        throw error;
      }
      
      // Calculate backoff with exponential increase and some randomness
      const delay = Math.min(
        RETRY_DELAY_MS * Math.pow(2, attempt) + Math.random() * 1000,
        MAX_BACKOFF_MS
      );
      
      console.warn(`wineService: Operation failed, retrying in ${Math.round(delay)}ms... (${attempt + 1}/${retries})`);
      console.error("wineService: Error details:", error.code, error.message);
      
      // If error suggests we're offline, switch to offline mode
      if (error.code === 'unavailable' || error.code === 'failed-precondition' || 
          error.message?.includes('network error') || error.message?.includes('aborted')) {
        await goOffline();
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error(`Failed after ${MAX_RETRIES} retries`);
};

// Set up event listeners for online/offline status
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log("wineService: Browser reports online");
    goOnline();
  });
  
  window.addEventListener('offline', () => {
    console.log("wineService: Browser reports offline");
    goOffline();
  });
}
