
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Wine, WineCreationData } from '@/data/models/Wine';
import { 
  addWineToCache, updateWineInCache, removeWineFromCache 
} from './wineCache';
import { withRetry } from './wineConnection';

export const addWine = async (wine: WineCreationData): Promise<Wine> => {
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
      description: wine.description || "",
      pairing: wine.pairing || "",
      storage: wine.storage || "",
      image: wine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    };
    
    console.log("wineService: Prepared wine object for Firestore:", wineToAdd);
    
    // Add wine to Firestore with retries
    const newWine = await withRetry(async () => {
      const winesCollection = collection(db, 'wines');
      const docRef = await addDoc(winesCollection, wineToAdd);
      console.log("wineService: Wine added with ID:", docRef.id);
      
      // Create complete wine object with ID
      return { 
        ...wineToAdd, 
        id: docRef.id 
      } as Wine;
    });
    
    // Update local cache
    addWineToCache(newWine);
    
    return newWine;
  } catch (error) {
    console.error('wineService: Error adding wine to Firestore:', error);
    throw error;
  }
};

export const updateWine = async (id: string, updatedWine: Partial<WineCreationData>): Promise<void> => {
  try {
    await withRetry(async () => {
      const wineRef = doc(db, 'wines', id);
      await updateDoc(wineRef, updatedWine);
    });
    
    // Update local cache
    updateWineInCache(id, updatedWine);
  } catch (error) {
    console.error('wineService: Error updating wine in Firestore:', error);
    throw error;
  }
};

export const deleteWine = async (id: string): Promise<void> => {
  try {
    await withRetry(async () => {
      const wineRef = doc(db, 'wines', id);
      await deleteDoc(wineRef);
    });
    
    // Update local cache
    removeWineFromCache(id);
  } catch (error) {
    console.error('wineService: Error deleting wine from Firestore:', error);
    throw error;
  }
};
