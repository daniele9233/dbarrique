
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

// Sample wine data with 1-10 rating scale (only red wines)
const defaultWines = [
  {
    id: "1",
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
    id: "2",
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
    id: "4",
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
    id: "7",
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
    id: "8",
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
  },
  // Aggiunti 10 vini rossi di alta qualità alla collezione
  {
    id: "9",
    name: "Brunello di Montalcino",
    region: "Toscana, Italy",
    year: 2015,
    rating: 9,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Sangiovese",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: "10",
    name: "Tignanello",
    region: "Toscana, Italy",
    year: 2018,
    rating: 9,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Sangiovese",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: "11",
    name: "Amarone della Valpolicella",
    region: "Veneto, Italy",
    year: 2017,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    grape: "Corvina",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Equilibrato",
    sweetness: "Amabile",
    aroma: "Speziato"
  },
  {
    id: "12",
    name: "Rioja Reserva",
    region: "Rioja, Spain",
    year: 2015,
    rating: 7,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Tempranillo",
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Evoluto"
  },
  {
    id: "13",
    name: "Chianti Classico",
    region: "Toscana, Italy",
    year: 2019,
    rating: 7,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1566452348683-79f9cf5c3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Sangiovese",
    body: "Medio",
    structure: "Elegante",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: "14",
    name: "Malbec Reserva",
    region: "Mendoza, Argentina",
    year: 2020,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    grape: "Malbec",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: "15",
    name: "Pinot Noir",
    region: "Burgundy, France",
    year: 2018,
    rating: 9,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Pinot Noir",
    body: "Leggero",
    structure: "Elegante",
    tannins: "Morbido",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: "16",
    name: "Bordeaux Grand Cru",
    region: "Bordeaux, France",
    year: 2014,
    rating: 10,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    grape: "Cabernet Sauvignon",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Evoluto"
  },
  {
    id: "17",
    name: "Barbaresco",
    region: "Piemonte, Italy",
    year: 2016,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Nebbiolo",
    body: "Corposo",
    structure: "Elegante",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Evoluto"
  },
  {
    id: "18",
    name: "Shiraz",
    region: "Barossa Valley, Australia",
    year: 2019,
    rating: 8,
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
  id: string;
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

// Inizializziamo l'array dei vini con i vini predefiniti per evitare lo stato di loading
export let wines: Wine[] = [...defaultWines];

export const loadWinesFromFirestore = async (): Promise<Wine[]> => {
  try {
    const winesCollection = collection(db, 'wines');
    const winesQuery = query(winesCollection, orderBy('name'));
    const wineSnapshot = await getDocs(winesQuery);
    
    if (wineSnapshot.empty) {
      // Se non ci sono vini nel database, aggiungi i vini predefiniti
      for (const wine of defaultWines) {
        await addDoc(collection(db, 'wines'), wine);
      }
      return defaultWines;
    }
    
    const wineList = wineSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Wine[];
    
    // Aggiorna la variabile globale dei vini
    wines = wineList;
    
    return wineList;
  } catch (error) {
    console.error('Errore nel caricamento dei vini da Firestore:', error);
    // In caso di errore, ritorna i vini predefiniti
    return defaultWines;
  }
};

// Carica i vini all'avvio dell'applicazione
(async () => {
  try {
    const loadedWines = await loadWinesFromFirestore();
    wines = loadedWines;
  } catch (error) {
    console.error('Errore nel caricamento iniziale dei vini:', error);
    // In caso di errore, mantieni i vini predefiniti
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

export const grapes = [
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

export const years = [...new Set(wines.map(wine => wine.year))].sort((a, b) => b - a);

export const regions = [...new Set(wines.map(wine => wine.region))];

export const bodyOptions = ["Leggero", "Medio", "Corposo"];
export const structureOptions = ["Elegante", "Equilibrato", "Strutturato"];
export const tanninOptions = ["Morbido", "Equilibrato", "Tannico"];
export const sweetnessOptions = ["Secco", "Amabile", "Dolce"];
export const aromaOptions = ["Fruttato", "Speziato", "Evoluto"];
