
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

// Sample wine data with 1-10 rating scale (only red wines)
const defaultWines = [
  {
    id: 1,
    name: "Château Margaux",
    region: "Bordeaux, France",
    year: 2015,
    rating: 10,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    grape: "Cabernet Sauvignon",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 2,
    name: "Barolo Riserva",
    region: "Piemonte, Italy",
    year: 2016,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Nebbiolo",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Evoluto"
  },
  {
    id: 4,
    name: "Opus One",
    region: "Napa Valley, USA",
    year: 2017,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1566452348683-79f9cf5c3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Merlot",
    body: "Corposo",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 7,
    name: "Sassicaia",
    region: "Toscana, Italy",
    year: 2016,
    rating: 10,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Cabernet Sauvignon",
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 8,
    name: "Penfolds Grange",
    region: "South Australia",
    year: 2014,
    rating: 9,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    grape: "Syrah",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Speziato"
  }
];

export interface Wine {
  id: number | string; // Changed to accept both number and string to accommodate Firestore IDs
  name: string;
  region: string;
  year: number;
  rating: number;
  type: "red";
  image: string;
  grape: string;
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
}

// Variabile per memorizzare i vini
export let wines: Wine[] = [];

// Carica i vini dal database Firestore
export const loadWinesFromFirestore = async (): Promise<Wine[]> => {
  try {
    const winesCollection = collection(db, 'wines');
    const winesQuery = query(winesCollection, orderBy('name'));
    const wineSnapshot = await getDocs(winesQuery);
    
    if (wineSnapshot.empty) {
      // Se non ci sono vini nel database, utilizziamo i dati predefiniti
      // e li aggiungiamo al database
      for (const wine of defaultWines) {
        await addDoc(collection(db, 'wines'), wine);
      }
      return defaultWines;
    }
    
    const wineList = wineSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id // Now correctly typed as string or number
      } as Wine;
    });
    
    return wineList;
  } catch (error) {
    console.error('Errore nel caricamento dei vini da Firestore:', error);
    return defaultWines;
  }
};

// Inizializza i vini all'avvio dell'applicazione
(async () => {
  wines = await loadWinesFromFirestore();
})();

// Aggiungi un nuovo vino al database
export const addWine = async (wine: Omit<Wine, 'id'>): Promise<Wine> => {
  try {
    const docRef = await addDoc(collection(db, 'wines'), wine);
    const newWine = { ...wine, id: docRef.id }; // ID is now a string from Firestore
    wines.push(newWine);
    return newWine;
  } catch (error) {
    console.error('Errore nell\'aggiunta del vino a Firestore:', error);
    throw error;
  }
};

// Aggiorna un vino esistente
export const updateWine = async (id: number | string, updatedWine: Partial<Omit<Wine, 'id'>>): Promise<void> => {
  try {
    const wineRef = doc(db, 'wines', id.toString());
    await updateDoc(wineRef, updatedWine);
    
    // Aggiorna anche l'array locale
    const index = wines.findIndex(wine => wine.id === id);
    if (index !== -1) {
      wines[index] = { ...wines[index], ...updatedWine };
    }
  } catch (error) {
    console.error('Errore nell\'aggiornamento del vino in Firestore:', error);
    throw error;
  }
};

// Elimina un vino
export const deleteWine = async (id: number | string): Promise<void> => {
  try {
    const wineRef = doc(db, 'wines', id.toString());
    await deleteDoc(wineRef);
    
    // Rimuovi dal nostro array locale
    wines = wines.filter(wine => wine.id !== id);
  } catch (error) {
    console.error('Errore nell\'eliminazione del vino da Firestore:', error);
    throw error;
  }
};

// Lista completa di vitigni a bacca rossa (italiani e internazionali)
export const grapes = [
  // Vitigni italiani
  "Aglianico",
  "Barbera",
  "Cabernet Sauvignon",
  "Cannonau",
  "Carignano",
  "Carmignano",
  "Corvina",
  "Dolcetto",
  "Lagrein",
  "Lambrusco",
  "Malvasia Nera",
  "Marzemino",
  "Merlot",
  "Montepulciano",
  "Nebbiolo",
  "Negroamaro",
  "Nero d'Avola",
  "Pinot Noir",
  "Primitivo",
  "Rondinella",
  "Sagrantino",
  "Sangiovese",
  "Schiava",
  "Syrah",
  "Teroldego",
  
  // Vitigni internazionali
  "Cabernet Franc",
  "Carignan",
  "Carménère",
  "Gamay",
  "Grenache",
  "Malbec",
  "Mourvèdre",
  "Petit Verdot",
  "Petite Sirah",
  "Tempranillo",
  "Zinfandel"
];

// Get unique years from the wine data
export const years = [...new Set(wines.map(wine => wine.year))].sort((a, b) => b - a);

// Get unique regions from the wine data
export const regions = [...new Set(wines.map(wine => wine.region))];

// Define the wine characteristics options
export const bodyOptions = ["Leggero", "Medio", "Corposo"];
export const structureOptions = ["Elegante", "Equilibrato", "Strutturato"];
export const tanninOptions = ["Morbido", "Equilibrato", "Tannico"];
export const sweetnessOptions = ["Secco", "Amabile", "Dolce"];
export const aromaOptions = ["Fruttato", "Speziato", "Evoluto"];
