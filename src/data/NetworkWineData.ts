
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

// Helper function to assign colors based on grape variety
const getGrapeColor = (grape: string): string => {
  // Color palette for major grape varieties
  switch(grape) {
    // Red varieties
    case "Nebbiolo": return "#9370DB";
    case "Sangiovese": return "#8B4513";
    case "Cabernet Sauvignon": return "#4169E1";
    case "Merlot": return "#3CB371";
    case "Syrah": return "#FF6347";
    case "Pinot Noir": return "#FF69B4";
    case "Primitivo": return "#800000";
    case "Aglianico": return "#A0522D";
    case "Montepulciano": return "#8B0000";
    case "Barbera": return "#B22222";
    case "Nero d'Avola": return "#CD5C5C";
    
    // White varieties
    case "Chardonnay": return "#FFD700";
    case "Sauvignon Blanc": return "#7FFF00";
    case "Pinot Grigio": return "#F0E68C";
    case "Riesling": return "#ADFF2F";
    case "Vermentino": return "#98FB98";
    
    // Default colors for other varieties
    default: 
      // Generate a deterministic color based on the grape name
      const hash = Array.from(grape).reduce((acc, char) => 
        (acc << 5) - acc + char.charCodeAt(0), 0);
      // Use the hash to generate a hue between 0 and 360
      const hue = Math.abs(hash) % 360;
      return `hsl(${hue}, 70%, 60%)`;
  }
};

// Sample network data expanded with more Italian and international varieties
const networkWinesData: NetworkWine[] = [
  {
    id: "wine1",
    name: "Barolo Riserva",
    grape: "Nebbiolo",
    region: "Piemonte",
    year: 2015,
    rating: 9,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Intensi",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 18,
    color: getGrapeColor("Nebbiolo"),
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3386&q=80",
    connections: ["wine2", "wine4", "wine6", "wine9", "wine15"]
  },
  {
    id: "wine2",
    name: "Brunello di Montalcino",
    grape: "Sangiovese",
    region: "Toscana",
    year: 2016,
    rating: 8,
    body: "Medio",
    structure: "Bilanciato",
    tannins: "Moderati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 16,
    color: getGrapeColor("Sangiovese"),
    image: "https://images.unsplash.com/photo-1544776193-3ca1ead30582?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine1", "wine3", "wine5", "wine12"]
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
    color: getGrapeColor("Cabernet Sauvignon"),
    image: "https://images.unsplash.com/photo-1615887495029-0cc5cea73e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine2", "wine4", "wine11", "wine17"]
  },
  {
    id: "wine4",
    name: "Amarone della Valpolicella",
    grape: "Corvina",
    region: "Veneto",
    year: 2018,
    rating: 8,
    body: "Corposo",
    structure: "Ricco",
    tannins: "Vellutati",
    sweetness: "Semi-secco",
    aroma: "Floreale",
    radius: 17,
    color: getGrapeColor("Corvina"),
    image: "https://images.unsplash.com/photo-1615887377492-a34d560755c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    connections: ["wine1", "wine3", "wine6", "wine8"]
  },
  {
    id: "wine5",
    name: "Tignanello",
    grape: "Sangiovese",
    region: "Toscana",
    year: 2019,
    rating: 9,
    body: "Medio",
    structure: "Elegante",
    tannins: "Morbidi",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 18,
    color: getGrapeColor("Sangiovese"),
    image: "https://images.unsplash.com/photo-1586370434639-0fe43b9afeaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    connections: ["wine2", "wine6", "wine13"]
  },
  {
    id: "wine6",
    name: "Barbaresco",
    grape: "Nebbiolo",
    region: "Piemonte",
    year: 2017,
    rating: 8,
    body: "Pieno",
    structure: "Elegante",
    tannins: "Pronunciati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 16,
    color: getGrapeColor("Nebbiolo"),
    image: "https://images.unsplash.com/photo-1560148218-1a83060f7b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    connections: ["wine1", "wine4", "wine5", "wine9"]
  },
  {
    id: "wine7",
    name: "Châteauneuf-du-Pape",
    grape: "Grenache",
    region: "Francia",
    year: 2018,
    rating: 9,
    body: "Pieno",
    structure: "Ricco",
    tannins: "Morbidi",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 18,
    color: getGrapeColor("Grenache"),
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine8", "wine13", "wine19"]
  },
  {
    id: "wine8",
    name: "Rioja Reserva",
    grape: "Tempranillo",
    region: "Spagna",
    year: 2016,
    rating: 8,
    body: "Medio",
    structure: "Bilanciato",
    tannins: "Moderati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 16,
    color: getGrapeColor("Tempranillo"),
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine4", "wine7", "wine14"]
  },
  {
    id: "wine9",
    name: "Gattinara",
    grape: "Nebbiolo",
    region: "Piemonte",
    year: 2015,
    rating: 7,
    body: "Medio",
    structure: "Elegante",
    tannins: "Pronunciati",
    sweetness: "Secco",
    aroma: "Floreale",
    radius: 15,
    color: getGrapeColor("Nebbiolo"),
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    connections: ["wine1", "wine6", "wine15"]
  },
  {
    id: "wine10",
    name: "Aglianico del Vulture",
    grape: "Aglianico",
    region: "Basilicata",
    year: 2016,
    rating: 7,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Intensi",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 15,
    color: getGrapeColor("Aglianico"),
    image: "https://images.unsplash.com/photo-1553361371-9b22f78a0b98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    connections: ["wine11", "wine16", "wine20"]
  },
  {
    id: "wine11",
    name: "Bordeaux Grand Cru",
    grape: "Cabernet Sauvignon",
    region: "Francia",
    year: 2014,
    rating: 9,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Pronunciati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 19,
    color: getGrapeColor("Cabernet Sauvignon"),
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine3", "wine10", "wine17"]
  },
  {
    id: "wine12",
    name: "Chianti Classico Riserva",
    grape: "Sangiovese",
    region: "Toscana",
    year: 2017,
    rating: 7,
    body: "Medio",
    structure: "Bilanciato",
    tannins: "Moderati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 15,
    color: getGrapeColor("Sangiovese"),
    image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    connections: ["wine2", "wine5", "wine13"]
  },
  {
    id: "wine13",
    name: "Côtes du Rhône",
    grape: "Syrah",
    region: "Francia",
    year: 2018,
    rating: 6,
    body: "Medio",
    structure: "Bilanciato",
    tannins: "Morbidi",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 14,
    color: getGrapeColor("Syrah"),
    image: "https://images.unsplash.com/photo-1506815444479-bfdb1e96c566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    connections: ["wine5", "wine7", "wine12"]
  },
  {
    id: "wine14",
    name: "Malbec Reserva",
    grape: "Malbec",
    region: "Argentina",
    year: 2019,
    rating: 8,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Vellutati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 16,
    color: getGrapeColor("Malbec"),
    image: "https://images.unsplash.com/photo-1546944517-4f38480ff03c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    connections: ["wine8", "wine19"]
  },
  {
    id: "wine15",
    name: "Ghemme",
    grape: "Nebbiolo",
    region: "Piemonte",
    year: 2014,
    rating: 6,
    body: "Medio",
    structure: "Elegante",
    tannins: "Moderati",
    sweetness: "Secco",
    aroma: "Floreale",
    radius: 14,
    color: getGrapeColor("Nebbiolo"),
    image: "https://images.unsplash.com/photo-1558346490-00a8350a6653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine1", "wine9"]
  },
  {
    id: "wine16",
    name: "Taurasi",
    grape: "Aglianico",
    region: "Campania",
    year: 2015,
    rating: 8,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Intensi",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 16,
    color: getGrapeColor("Aglianico"),
    image: "https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    connections: ["wine10", "wine20"]
  },
  {
    id: "wine17",
    name: "Cabernet Franc",
    grape: "Cabernet Franc",
    region: "Francia",
    year: 2016,
    rating: 7,
    body: "Medio",
    structure: "Elegante",
    tannins: "Moderati",
    sweetness: "Secco",
    aroma: "Erbaceo",
    radius: 15,
    color: getGrapeColor("Cabernet Franc"),
    image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    connections: ["wine3", "wine11", "wine18"]
  },
  {
    id: "wine18",
    name: "Pinot Nero",
    grape: "Pinot Noir",
    region: "Alto Adige",
    year: 2018,
    rating: 7,
    body: "Leggero",
    structure: "Delicato",
    tannins: "Leggeri",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 15,
    color: getGrapeColor("Pinot Noir"),
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    connections: ["wine17", "wine21"]
  },
  {
    id: "wine19",
    name: "Shiraz",
    grape: "Syrah",
    region: "Australia",
    year: 2017,
    rating: 8,
    body: "Pieno",
    structure: "Strutturato",
    tannins: "Pronunciati",
    sweetness: "Secco",
    aroma: "Speziato",
    radius: 16,
    color: getGrapeColor("Syrah"),
    image: "https://images.unsplash.com/photo-1584916520379-834cd8464d84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80",
    connections: ["wine7", "wine14"]
  },
  {
    id: "wine20",
    name: "Nero d'Avola",
    grape: "Nero d'Avola",
    region: "Sicilia",
    year: 2018,
    rating: 6,
    body: "Medio",
    structure: "Bilanciato",
    tannins: "Moderati",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 14,
    color: getGrapeColor("Nero d'Avola"),
    image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    connections: ["wine10", "wine16"]
  },
  {
    id: "wine21",
    name: "Bourgogne",
    grape: "Pinot Noir",
    region: "Francia",
    year: 2016,
    rating: 8,
    body: "Leggero",
    structure: "Elegante",
    tannins: "Leggeri",
    sweetness: "Secco",
    aroma: "Fruttato",
    radius: 16,
    color: getGrapeColor("Pinot Noir"),
    image: "https://images.unsplash.com/photo-1495482336510-f7716cc29a92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    connections: ["wine18"]
  },
  {
    id: "wine22",
    name: "Primitivo di Manduria",
    grape: "Primitivo",
    region: "Puglia",
    year: 2019,
    rating: 7,
    body: "Pieno",
    structure: "Ricco",
    tannins: "Vellutati",
    sweetness: "Semi-secco",
    aroma: "Fruttato",
    radius: 15,
    color: getGrapeColor("Primitivo"),
    image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    connections: ["wine20"]
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
