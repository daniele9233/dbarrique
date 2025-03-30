
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
      for (const wine of defaultWines) {
        await addDoc(collection(db, 'wines'), wine);
      }
      return defaultWines;
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
    return defaultWines;
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
    
    const wineToAdd = {
      ...wine,
      // Set defaults for any missing fields
      type: wine.type || "red",
      year: wine.year || new Date().getFullYear(),
      rating: wine.rating || 5,
    };
    
    const docRef = await addDoc(collection(db, 'wines'), wineToAdd);
    console.log("wineService: Wine added with ID:", docRef.id);
    
    const newWine = { ...wineToAdd, id: docRef.id } as Wine;
    wines.push(newWine);
    
    return newWine;
  } catch (error) {
    console.error('wineService: Errore nell\'aggiunta del vino a Firestore:', error);
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
