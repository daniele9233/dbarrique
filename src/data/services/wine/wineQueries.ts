import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Wine } from '@/data/models/Wine';
import { defaultWines } from '@/data/constants/wines';
import { 
  wines, updateWineCache, isCacheValid, getWineCache
} from './wineCache';
import { 
  isOfflineMode, withRetry, goOnline, goOffline
} from './wineConnection';

export const loadWinesFromFirestore = async (forceRefresh = false): Promise<Wine[]> => {
  try {
    // Use cached wines if available and not expired, unless force refresh is specified
    if (!forceRefresh && isCacheValid()) {
      console.log("wineService: Using cached wines, count:", wines.length);
      return getWineCache();
    }

    console.log("wineService: Loading wines from Firestore...");
    
    // If we're in offline mode and have wines cached, just return the cache
    if (isOfflineMode && wines.length > 0) {
      console.log("wineService: In offline mode, using cached wines");
      return wines;
    }
    
    // Use retry logic for Firestore operation
    const wineList = await withRetry(async () => {
      // Try to go online if we're fetching
      if (isOfflineMode) {
        await goOnline();
      }
      
      const winesCollection = collection(db, 'wines');
      const winesQuery = query(winesCollection, orderBy('name'));
      
      // Use getDocs with timeout
      const fetchPromise = getDocs(winesQuery);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firestore query timeout")), 15000)
      );
      
      // Use Promise.race with proper typing
      const wineSnapshot = await Promise.race([fetchPromise, timeoutPromise]) as QuerySnapshot<DocumentData>;
      
      if (wineSnapshot.empty) {
        console.log("wineService: No wines in Firestore, using default wines...");
        // Return default wines with fake IDs since we don't want to add them automatically
        return defaultWines.map((wine, index) => ({
          ...wine,
          id: `default-${index}`
        }));
      }
      
      console.log(`wineService: Found ${wineSnapshot.docs.length} wines in Firestore`);
      return wineSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Wine[];
    });
    
    updateWineCache(wineList);
    
    return wineList;
  } catch (error) {
    console.error('wineService: Error loading wines from Firestore:', error);
    
    // If we have any error, try to go offline mode
    await goOffline();
    
    // Return cached wines in case of error if available
    if (wines.length > 0) {
      console.log("wineService: Returning cached wines due to error");
      return wines;
    }
    
    // Otherwise fall back to default wines
    const fallbackWines = defaultWines.map((wine, index) => ({
      ...wine,
      id: `default-${index}`
    }));
    
    updateWineCache(fallbackWines);
    return fallbackWines;
  }
};

// Initialize wines on import with proper error handling
loadWinesFromFirestore()
  .then(loadedWines => {
    updateWineCache(loadedWines);
    console.log("wineService: Initialized with", loadedWines.length, "wines");
  })
  .catch(error => {
    console.error('wineService: Error during initial wine loading:', error);
    console.log('wineService: Using default wines as fallback');
    // Default wines already loaded in wineCache initialization
  });
