import { useState, useEffect } from 'react';
import { Wine } from '@/data/models/Wine';
import { loadWinesFromFirestore, wines as globalWines } from '@/data/services/wineService';

interface UseWineLoadingResult {
  wines: Wine[];
  isLoading: boolean;
}

/**
 * A hook to handle loading wines from firestore or cache
 */
const useWineLoading = (providedWines: Wine[] = []): UseWineLoadingResult => {
  const [isLoading, setIsLoading] = useState(providedWines.length === 0 && globalWines.length === 0);
  const [localWines, setLocalWines] = useState<Wine[]>(
    // Use cached wines if available
    providedWines.length > 0 ? providedWines : globalWines.length > 0 ? globalWines : []
  );
  
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
      
      // Then update in background
      loadWinesFromFirestore(false).then(freshWines => {
        setLocalWines(freshWines);
      }).catch(console.error);
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
  }, [providedWines]);

  return { wines: localWines, isLoading };
};

export default useWineLoading;
