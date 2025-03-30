
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Wine } from '../models/Wine';
import { defaultWines } from '../constants/wineConstants';

// In-memory wine data
export let wines: Wine[] = [...defaultWines];

export const loadWinesFromFirestore = async (): Promise<Wine[]> => {
  try {
    console.log("wineService: Loading wines from Firestore...");
    const winesCollection = collection(db, 'wines');
    const winesQuery = query(winesCollection, orderBy('name'));
    const wineSnapshot = await getDocs(winesQuery);
    
    if (wineSnapshot.empty) {
      console.log("wineService: No wines in Firestore, adding default wines...");
      // Add default wines one by one and collect their IDs
      const winesWithIds: Wine[] = [];
      for (const wine of defaultWines) {
        const docRef = await addDoc(collection(db, 'wines'), wine);
        winesWithIds.push({ ...wine, id: docRef.id });
      }
      console.log("wineService: Default wines added with IDs");
      wines = winesWithIds;
      return winesWithIds;
    }
    
    console.log(`wineService: Found ${wineSnapshot.docs.length} wines in Firestore`);
    const wineList = wineSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Wine[];
    
    wines = wineList;
    
    return wineList;
  } catch (error) {
    console.error('wineService: Errore nel caricamento dei vini da Firestore:', error);
    return defaultWines.map((wine, index) => ({
      ...wine,
      id: `default-${index}`
    }));
  }
};

// Initialize wines on import
(async () => {
  try {
    const loadedWines = await loadWinesFromFirestore();
    wines = loadedWines;
    console.log("wineService: Initialized with", wines.length, "wines");
  } catch (error) {
    console.error('wineService: Errore nel caricamento iniziale dei vini:', error);
  }
})();

export const addWine = async (wine: Omit<Wine, 'id'>): Promise<Wine> => {
  try {
    console.log("wineService: Adding wine to Firestore:", wine);
    
    // Ensure all required fields are present
    if (!wine.name) {
      throw new Error("Wine name is required");
    }
    
    // Prepare wine object with default values for missing fields
    const wineToAdd = {
      ...wine,
      // Set defaults for any missing fields
      type: wine.type || "red",
      year: wine.year || new Date().getFullYear(),
      rating: wine.rating || 5,
      grape: wine.grape || "Non specificato",
      grapes: Array.isArray(wine.grapes) ? wine.grapes : [],
      body: wine.body || "Medio",
      structure: wine.structure || "Equilibrato",
      tannins: wine.tannins || "Equilibrato",
      sweetness: wine.sweetness || "Secco",
      aroma: wine.aroma || "Fruttato",
      region: wine.region || "Non specificata",
      winery: wine.winery || "Non specificata",
      image: wine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    };
    
    console.log("wineService: Prepared wine object for Firestore:", wineToAdd);
    
    // Add wine to Firestore
    const docRef = await addDoc(collection(db, 'wines'), wineToAdd);
    console.log("wineService: Wine added with ID:", docRef.id);
    
    // Create complete wine object with ID
    const newWine = { 
      ...wineToAdd, 
      id: docRef.id 
    } as Wine;
    
    // Update local cache
    wines.push(newWine);
    
    return newWine;
  } catch (error) {
    console.error('wineService: Error adding wine to Firestore:', error);
    throw error;
  }
};

export const updateWine = async (id: string, updatedWine: Partial<Omit<Wine, 'id'>>): Promise<void> => {
  try {
    const wineRef = doc(db, 'wines', id);
    await updateDoc(wineRef, updatedWine);
    
    const index = wines.findIndex(wine => wine.id === id);
    if (index !== -1) {
      wines[index] = { ...wines[index], ...updatedWine };
    }
  } catch (error) {
    console.error('wineService: Errore nell\'aggiornamento del vino in Firestore:', error);
    throw error;
  }
};

export const deleteWine = async (id: string): Promise<void> => {
  try {
    const wineRef = doc(db, 'wines', id);
    await deleteDoc(wineRef);
    
    wines = wines.filter(wine => wine.id !== id);
  } catch (error) {
    console.error('wineService: Errore nell\'eliminazione del vino da Firestore:', error);
    throw error;
  }
};

// Derived data based on current wines
export const getYears = (): number[] => {
  return [...new Set(wines.map(wine => wine.year))].sort((a, b) => b - a);
};

export const getRegions = (): string[] => {
  return [...new Set(wines.map(wine => wine.region))];
};
