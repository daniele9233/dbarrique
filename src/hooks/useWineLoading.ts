import { useState, useEffect } from 'react';
import { Wine } from '@/data/models/Wine';
import { loadWinesFromFirestore, wines as globalWines } from '@/data/services/wineService';
import useFirestoreStatus from './useFirestoreStatus';

interface UseWineLoadingResult {
  wines: Wine[];
  isLoading: boolean;
  isOffline: boolean;
  lastSync: Date | null;
  retryCount: number;
}

/**
 * A hook to handle loading wines from firestore or cache
 * with improved offline support and connection status tracking
 */
const useWineLoading = (providedWines: Wine[] = []): UseWineLoadingResult => {
  const [isLoading, setIsLoading] = useState(providedWines.length === 0 && globalWines.length === 0);
  const [localWines, setLocalWines] = useState<Wine[]>(
    // Use cached wines if available
    providedWines.length > 0 ? providedWines : globalWines.length > 0 ? globalWines : []
  );
  const firestoreStatus = useFirestoreStatus();
  
  useEffect(() => {
    // If we have wines from props, use those
    if (providedWines.length > 0) {
      setLocalWines(providedWines);
      setIsLoading(false);
      return;
    }

    // If we have wines in the cache, show them immediately
    if (globalWines.length > 0) {
      setLocalWines(globalWines);
      setIsLoading(false);
      
      // Then update in background only if we're online
      if (firestoreStatus.isOnline) {
        loadWinesFromFirestore(false).then(freshWines => {
          setLocalWines(freshWines);
        }).catch(error => {
          console.error('Error refreshing wines in background:', error);
        });
      }
      return;
    }

    // Otherwise do a normal load
    setIsLoading(true);
    loadWinesFromFirestore()
      .then(winesFromFirestore => {
        setLocalWines(winesFromFirestore);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Errore nel caricamento dei vini:', error);
        setIsLoading(false);
      });
  }, [providedWines, firestoreStatus.isOnline]);

  return { 
    wines: localWines, 
    isLoading,
    isOffline: !firestoreStatus.isOnline,
    lastSync: firestoreStatus.lastSync,
    retryCount: firestoreStatus.retryCount
  };
};

export default useWineLoading;
