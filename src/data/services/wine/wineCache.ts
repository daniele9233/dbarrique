
import { Wine } from '@/data/models/Wine';
import { defaultWines } from '@/data/constants/wines';

// Chiave per memorizzare i vini in localStorage
const WINE_CACHE_KEY = 'dbarrique_wines_cache';
const WINE_CACHE_TIMESTAMP_KEY = 'dbarrique_wines_cache_timestamp';

// Inizializza la cache cercando prima nel localStorage, altrimenti usa i vini di default
const initializeWineCache = (): Wine[] => {
  try {
    // Verifica se ci sono vini salvati nel localStorage
    const cachedWinesJson = localStorage.getItem(WINE_CACHE_KEY);
    if (cachedWinesJson) {
      const parsedWines = JSON.parse(cachedWinesJson) as Wine[];
      console.log(`wineCache: Caricati ${parsedWines.length} vini dal localStorage`);
      return parsedWines;
    }
  } catch (error) {
    console.error('wineCache: Errore nel caricamento dei vini dal localStorage:', error);
  }
  
  // Se non ci sono vini nel localStorage, usa i vini di default
  const defaultWinesWithIds = defaultWines.map((wine, index) => ({
    ...wine, 
    id: `default-${index}`
  }));
  
  console.log('wineCache: Utilizzando i vini di default');
  return defaultWinesWithIds;
};

// In-memory wine data with a timestamp for cache invalidation
export let wines: Wine[] = initializeWineCache();

export let lastFetchTime = (() => {
  const savedTimestamp = localStorage.getItem(WINE_CACHE_TIMESTAMP_KEY);
  return savedTimestamp ? parseInt(savedTimestamp, 10) : 0;
})();

export const CACHE_VALIDITY_MS = 600000; // 10 minutes of cache validity

// Funzione per salvare i vini nel localStorage
const persistWineCache = () => {
  try {
    localStorage.setItem(WINE_CACHE_KEY, JSON.stringify(wines));
    localStorage.setItem(WINE_CACHE_TIMESTAMP_KEY, lastFetchTime.toString());
    console.log(`wineCache: Salvati ${wines.length} vini nel localStorage`);
  } catch (error) {
    console.error('wineCache: Errore nel salvataggio dei vini nel localStorage:', error);
  }
};

// Update the wine cache with fresh data
export const updateWineCache = (wineList: Wine[]): void => {
  wines = wineList;
  lastFetchTime = Date.now();
  persistWineCache(); // Salva i vini nel localStorage dopo ogni aggiornamento
};

// Access the wine cache
export const getWineCache = (): Wine[] => {
  return wines;
};

// Check if the cache is still valid
export const isCacheValid = (): boolean => {
  const now = Date.now();
  return wines.length > 0 && now - lastFetchTime < CACHE_VALIDITY_MS;
};

// Update a wine in the cache
export const updateWineInCache = (id: string, updatedWine: Partial<Omit<Wine, 'id'>>): void => {
  const index = wines.findIndex(wine => wine.id === id);
  if (index !== -1) {
    // Create a new array reference to ensure reactivity
    const newWines = [...wines];
    newWines[index] = { ...newWines[index], ...updatedWine };
    wines = newWines;
    persistWineCache(); // Persistere i cambiamenti
  }
};

// Remove a wine from the cache
export const removeWineFromCache = (id: string): void => {
  wines = wines.filter(wine => wine.id !== id);
  persistWineCache(); // Persistere i cambiamenti
};

// Add a new wine to the cache
export const addWineToCache = (wine: Wine): void => {
  // Verifica se il vino esiste già (per ID)
  if (wines.some(w => w.id === wine.id)) {
    // Se esiste già, aggiorna invece di aggiungere
    updateWineInCache(wine.id, wine);
  } else {
    // Altrimenti aggiungi il nuovo vino
    wines = [...wines, wine];
    persistWineCache(); // Persistere i cambiamenti
  }
};

// Derived data functions
export const getYears = (): number[] => {
  return [...new Set(wines.map(wine => wine.year))].sort((a, b) => b - a);
};

export const getRegions = (): string[] => {
  return [...new Set(wines.map(wine => wine.region))];
};
