
import { Wine } from './models/Wine';

export interface NetworkWine {
  id: string;
  name: string;
  grape: string;
  region: string;
  year: number;
  rating: number;
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
  radius: number;
  color: string;
  image: string;
  connections: string[];
}

// Sample network data
const networkWinesData: NetworkWine[] = [
  {
    id: "wine1",
    name: "Barolo Riserva",
    grape: "Nebbiolo",
    region: "Piemonte",
    year: 2015,
    rating: 8,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Intensi",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 18,
    color: "#9370DB",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3386&q=80",
    connections: ["wine2", "wine4", "wine6"]
  },
  {
    id: "wine2",
    name: "Brunello di Montalcino",
    grape: "Sangiovese",
    region: "Toscana",
    year: 2016,
    rating: 7,
    body: "Medio",
    structure: "Bilanciato",
    tannins: "Moderati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 16,
    color: "#8B4513",
    image: "https://images.unsplash.com/photo-1544776193-3ca1ead30582?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine1", "wine3", "wine5"]
  },
  {
    id: "wine3",
    name: "Sassicaia",
    grape: "Cabernet Sauvignon",
    region: "Toscana",
    year: 2017,
    rating: 9,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Pronunciati",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 20,
    color: "#4169E1",
    image: "https://images.unsplash.com/photo-1615887495029-0cc5cea73e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine2", "wine4"]
  },
  {
    id: "wine4",
    name: "Amarone della Valpolicella",
    grape: "Merlot",
    region: "Veneto",
    year: 2018,
    rating: 6,
    body: "Corposo",
    structure: "Ricco",
    tannins: "Vellutati",
    sweetness: "Semi-secco",
    aroma: "Floreale",
    radius: 14,
    color: "#3CB371",
    image: "https://images.unsplash.com/photo-1615887377492-a34d560755c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    connections: ["wine1", "wine3", "wine6"]
  },
  {
    id: "wine5",
    name: "Tignanello",
    grape: "Syrah",
    region: "Toscana",
    year: 2019,
    rating: 7,
    body: "Medio",
    structure: "Elegante",
    tannins: "Morbidi",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 16,
    color: "#FF6347",
    image: "https://images.unsplash.com/photo-1586370434639-0fe43b9afeaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    connections: ["wine2", "wine6"]
  },
  {
    id: "wine6",
    name: "Barbaresco",
    grape: "Pinot Noir",
    region: "Piemonte",
    year: 2017,
    rating: 5,
    body: "Leggero",
    structure: "Delicato",
    tannins: "Leggeri",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 12,
    color: "#FF69B4",
    image: "https://images.unsplash.com/photo-1560148218-1a83060f7b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    connections: ["wine1", "wine4", "wine5"]
  }
];

// Function to get network wines
export const getNetworkWines = (): NetworkWine[] => {
  return networkWinesData;
};

// Function to extract unique grape types from network data
export const getUniqueGrapes = (): string[] => {
  return [...new Set(networkWinesData.map(wine => wine.grape))];
};

// Function to extract unique regions from network data
export const getUniqueRegions = (): string[] => {
  return [...new Set(networkWinesData.map(wine => wine.region))];
};

// Function to extract unique characteristics from network data
export const getUniqueCharacteristics = () => {
  return {
    body: [...new Set(networkWinesData.map(wine => wine.body))],
    structure: [...new Set(networkWinesData.map(wine => wine.structure))],
    tannins: [...new Set(networkWinesData.map(wine => wine.tannins))],
    sweetness: [...new Set(networkWinesData.map(wine => wine.sweetness))],
    aroma: [...new Set(networkWinesData.map(wine => wine.aroma))]
  };
};
