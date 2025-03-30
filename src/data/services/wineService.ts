
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Wine } from '../models/Wine';
import { defaultWines } from '../constants/wineConstants';

// In-memory wine data
export let wines: Wine[] = [...defaultWines];

export const loadWinesFromFirestore = async (): Promise<Wine[]> => {
  try {
    const winesCollection = collection(db, 'wines');
    const winesQuery = query(winesCollection, orderBy('name'));
    const wineSnapshot = await getDocs(winesQuery);
    
    if (wineSnapshot.empty) {
      for (const wine of defaultWines) {
        await addDoc(collection(db, 'wines'), wine);
      }
      return defaultWines;
    }
    
    const wineList = wineSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Wine[];
    
    wines = wineList;
    
    return wineList;
  } catch (error) {
    console.error('Errore nel caricamento dei vini da Firestore:', error);
    return defaultWines;
  }
};

// Initialize wines on import
(async () => {
  try {
    const loadedWines = await loadWinesFromFirestore();
    wines = loadedWines;
  } catch (error) {
    console.error('Errore nel caricamento iniziale dei vini:', error);
  }
})();

export const addWine = async (wine: Omit<Wine, 'id'>): Promise<Wine> => {
  try {
    const docRef = await addDoc(collection(db, 'wines'), wine);
    const newWine = { ...wine, id: docRef.id };
    wines.push(newWine);
    return newWine;
  } catch (error) {
    console.error('Errore nell\'aggiunta del vino a Firestore:', error);
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
    console.error('Errore nell\'aggiornamento del vino in Firestore:', error);
    throw error;
  }
};

export const deleteWine = async (id: string): Promise<void> => {
  try {
    const wineRef = doc(db, 'wines', id);
    await deleteDoc(wineRef);
    
    wines = wines.filter(wine => wine.id !== id);
  } catch (error) {
    console.error('Errore nell\'eliminazione del vino da Firestore:', error);
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
