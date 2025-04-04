
import { db } from '@/config/firebase';
import { enableNetwork, disableNetwork } from 'firebase/firestore';

// Network status tracking
export let isOfflineMode = false;
export const MAX_RETRIES = 3; // Ridotto da 5 a 3 per avere feedback più rapidi
export const RETRY_DELAY_MS = 1000; // Ridotto da 2000 a 1000 per tentativi più rapidi
export const MAX_BACKOFF_MS = 10000; // Ridotto da 30000 a 10000 per limitare i tempi di attesa

// Chiave per memorizzare lo stato di connessione in localStorage
const OFFLINE_MODE_KEY = 'dbarrique_offline_mode';

// Inizializza lo stato offline dal localStorage
(() => {
  try {
    const savedOfflineMode = localStorage.getItem(OFFLINE_MODE_KEY);
    if (savedOfflineMode !== null) {
      isOfflineMode = savedOfflineMode === 'true';
      console.log(`wineConnection: Stato offline inizializzato dal localStorage: ${isOfflineMode}`);
    }
  } catch (error) {
    console.error('wineConnection: Errore nel recupero dello stato offline:', error);
  }
})();

// Function to switch to offline mode
export const goOffline = async (): Promise<void> => {
  if (!isOfflineMode) {
    console.log("wineService: Switching to offline mode");
    isOfflineMode = true;
    
    // Salva lo stato offline nel localStorage
    try {
      localStorage.setItem(OFFLINE_MODE_KEY, 'true');
    } catch (error) {
      console.error("wineService: Error saving offline mode to localStorage:", error);
    }
    
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
    
    // Salva lo stato offline nel localStorage
    try {
      localStorage.setItem(OFFLINE_MODE_KEY, 'false');
    } catch (error) {
      console.error("wineService: Error saving offline mode to localStorage:", error);
    }
    
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
        RETRY_DELAY_MS * Math.pow(1.5, attempt) + Math.random() * 500, // Ridotto il fattore esponenziale e la casualità
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
