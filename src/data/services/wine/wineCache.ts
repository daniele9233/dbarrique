
import { Wine } from '@/data/models/Wine';
import { defaultWines } from '@/data/constants/wines';

// In-memory wine data with a timestamp for cache invalidation
export let wines: Wine[] = [...defaultWines.map((wine, index) => ({
  ...wine, 
  id: `default-${index}`
}))];

export let lastFetchTime = 0;
export const CACHE_VALIDITY_MS = 600000; // 10 minutes of cache validity

// Update the wine cache with fresh data
export const updateWineCache = (wineList: Wine[]): void => {
  wines = wineList;
  lastFetchTime = Date.now();
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
  }
};

// Remove a wine from the cache
export const removeWineFromCache = (id: string): void => {
  wines = wines.filter(wine => wine.id !== id);
};

// Add a new wine to the cache
export const addWineToCache = (wine: Wine): void => {
  wines = [...wines, wine];
};

// Derived data functions
export const getYears = (): number[] => {
  return [...new Set(wines.map(wine => wine.year))].sort((a, b) => b - a);
};

export const getRegions = (): string[] => {
  return [...new Set(wines.map(wine => wine.region))];
};
