
import { Wine } from './models/Wine';
import { wines as originalWines } from './services/wineService';

// Genera un colore esadecimale casuale per ogni vitigno
const getGrapeColor = (grape: string): string => {
  const grapeColors: Record<string, string> = {
    "Cabernet Sauvignon": "#4169E1", // Royal Blue
    "Nebbiolo": "#9370DB",           // Medium Purple
    "Merlot": "#3CB371",             // Medium Sea Green
    "Syrah": "#FF6347",              // Tomato
    "Sangiovese": "#8B4513",         // Saddle Brown
    "Pinot Noir": "#FF69B4",         // Hot Pink
    "Tempranillo": "#CD5C5C",        // Indian Red
    "Malbec": "#4B0082",             // Indigo
    "Zinfandel": "#B22222",          // Fire Brick
    "Grenache": "#E9967A",           // Dark Salmon
    "Chardonnay": "#FFD700",         // Gold
    "Riesling": "#ADFF2F",           // Green Yellow
  };

  return grapeColors[grape] || `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

// Estendi i dati dei vini con informazioni aggiuntive per la visualizzazione della rete
export interface NetworkWine extends Omit<Wine, 'id'> {
  id: string;
  color: string;
  radius: number;
  connections: string[];
}

// Generiamo più vini per la visualizzazione della rete
const generateMoreWines = (): NetworkWine[] => {
  // Aggiungiamo alcuni vini fittizi per avere un dataset più grande
  const additionalWines: Wine[] = [
    {
      id: "10",
      name: "Tignanello",
      region: "Toscana, Italy",
      year: 2018,
      rating: 9,
      type: "red",
      image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      grape: "Sangiovese",
      body: "Corposo",
      structure: "Strutturato",
      tannins: "Tannico",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Elegante vino toscano con note di ciliegia matura e spezie. Corposo e strutturato con tannini vellutati."
    },
    {
      id: "11",
      name: "Amarone della Valpolicella",
      region: "Veneto, Italy",
      year: 2017,
      rating: 8,
      type: "red",
      image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      grape: "Corvina",
      body: "Corposo",
      structure: "Strutturato",
      tannins: "Equilibrato",
      sweetness: "Amabile",
      aroma: "Speziato",
      description: "Vino veneto ricco e complesso, ottenuto da uve appassite. Note di frutta secca, cioccolato e spezie."
    },
    {
      id: "12",
      name: "Rioja Reserva",
      region: "Rioja, Spain",
      year: 2015,
      rating: 7,
      type: "red",
      image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      grape: "Tempranillo",
      body: "Medio",
      structure: "Equilibrato",
      tannins: "Equilibrato",
      sweetness: "Secco",
      aroma: "Evoluto",
      description: "Classico vino spagnolo con note di frutta rossa matura, vaniglia e spezie. Equilibrato e versatile."
    },
    {
      id: "13",
      name: "Chianti Classico",
      region: "Toscana, Italy",
      year: 2019,
      rating: 6,
      type: "red",
      image: "https://images.unsplash.com/photo-1566452348683-79f9cf5c3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      grape: "Sangiovese",
      body: "Medio",
      structure: "Elegante",
      tannins: "Equilibrato",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Vino toscano tradizionale con vivaci note di ciliegia, lampone e un tocco di erbe aromatiche."
    },
    {
      id: "14",
      name: "Malbec Reserva",
      region: "Mendoza, Argentina",
      year: 2020,
      rating: 8,
      type: "red",
      image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      grape: "Malbec",
      body: "Corposo",
      structure: "Strutturato",
      tannins: "Tannico",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Vino argentino intenso con note di mora, prugna e cioccolato. Ricco e vellutato al palato."
    },
    {
      id: "15",
      name: "Pinot Noir",
      region: "Burgundy, France",
      year: 2018,
      rating: 9,
      type: "red",
      image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      grape: "Pinot Noir",
      body: "Leggero",
      structure: "Elegante",
      tannins: "Morbido",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Elegante vino della Borgogna con delicate note di fragola, ciliegia e un tocco di terra bagnata."
    }
  ];

  // Combina i vini originali con quelli aggiuntivi
  const allWines = [...originalWines, ...additionalWines];

  // Crea connessioni tra i vini in base alle caratteristiche comuni
  const networkWines: NetworkWine[] = allWines.map(wine => ({
    ...wine,
    color: getGrapeColor(wine.grape),
    radius: 20 + (wine.rating * 2), // Il raggio è basato sul rating
    connections: [] // Inizialmente vuoto, poi popolato
  }));

  // Calcola le connessioni in base alle caratteristiche comuni
  for (let i = 0; i < networkWines.length; i++) {
    for (let j = i + 1; j < networkWines.length; j++) {
      const wineA = networkWines[i];
      const wineB = networkWines[j];
      
      // Controlla se i vini condividono il vitigno o qualsiasi altra caratteristica
      if (
        wineA.grape === wineB.grape ||
        wineA.body === wineB.body || 
        wineA.structure === wineB.structure ||
        wineA.tannins === wineB.tannins ||
        wineA.sweetness === wineB.sweetness ||
        wineA.aroma === wineB.aroma
      ) {
        wineA.connections.push(wineB.id);
        wineB.connections.push(wineA.id);
      }
    }
  }

  return networkWines;
};

export const networkWines = generateMoreWines();

// Estrae caratteristiche uniche per i filtri
export const uniqueGrapes = [...new Set(networkWines.map(wine => wine.grape))];
export const uniqueRegions = [...new Set(networkWines.map(wine => wine.region))];
export const uniqueCharacteristics = {
  body: [...new Set(networkWines.map(wine => wine.body))],
  structure: [...new Set(networkWines.map(wine => wine.structure))],
  tannins: [...new Set(networkWines.map(wine => wine.tannins))],
  sweetness: [...new Set(networkWines.map(wine => wine.sweetness))],
  aroma: [...new Set(networkWines.map(wine => wine.aroma))]
};
