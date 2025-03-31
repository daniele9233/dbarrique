// Network node data for the wine relationship visualization

export interface WineNode {
  id: string;
  name: string;
  region: string;
  year: number;
  rating: number;
  type: string;
  grape: string;
  image: string;
}

export interface WineLink {
  source: string;
  target: string;
  value: number;
}

export interface WineNetworkData {
  nodes: WineNode[];
  links: WineLink[];
}

export const wineNetworkData: WineNetworkData = {
  nodes: [
    {
      id: "1",
      name: "Brunello di Montalcino",
      region: "Toscana",
      year: 2015,
      rating: 9,
      type: "red",
      image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      grape: "Sangiovese",
      body: "Corposo",
      structure: "Complesso",
      tannins: "Intenso",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Vino prestigioso della Toscana, il Brunello è noto per la sua struttura complessa, i tannini maturi e le note di frutti rossi, spezie e tabacco. Ha un grande potenziale di invecchiamento.",
      // Add the additional fields required by Wine type 
      winery: "Biondi-Santi",
      grapes: ["Sangiovese"],
      pairing: "Selvaggina, formaggi stagionati",
      storage: "15-20 anni in condizioni ottimali"
    },
    {
      id: "2",
      name: "Barolo",
      region: "Piemonte",
      year: 2016,
      rating: 9,
      type: "red",
      image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
      grape: "Nebbiolo",
      body: "Corposo",
      structure: "Complesso",
      tannins: "Intenso",
      sweetness: "Secco",
      aroma: "Speziato",
      description: "Denominato 're dei vini e vino dei re', il Barolo è caratterizzato da tannini potenti, aromi di rosa, catrame e spezie. Richiede tempo per esprimere il suo potenziale.",
      // Add the additional fields required by Wine type
      winery: "Giacomo Conterno",
      grapes: ["Nebbiolo"],
      pairing: "Brasati, tartufi, formaggi stagionati",
      storage: "15-30 anni in condizioni ottimali"
    },
    {
      id: "3",
      name: "Amarone della Valpolicella",
      region: "Veneto",
      year: 2017,
      rating: 8,
      type: "red",
      image: "https://images.unsplash.com/photo-1598306442928-4d90f32c6866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      grape: "Blend",
      body: "Corposo",
      structure: "Complesso",
      tannins: "Medio",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Vino potente ottenuto da uve appassite, l'Amarone presenta aromi di frutta secca, cioccolato e spezie, con un finale lungo e complesso.",
      // Add the additional fields required by Wine type
      winery: "Tommasi",
      grapes: ["Corvina", "Rondinella", "Molinara"],
      pairing: "Selvaggina, brasati, formaggi stagionati",
      storage: "10-20 anni in condizioni ottimali"
    },
    {
      id: "4",
      name: "Chianti Classico Riserva",
      region: "Toscana",
      year: 2018,
      rating: 7,
      type: "red",
      image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80",
      grape: "Sangiovese",
      body: "Medio",
      structure: "Equilibrato",
      tannins: "Medio",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Un vino elegante con note di ciliegia, viola e erbe aromatiche. La Riserva ha un invecchiamento più lungo che ne aumenta la complessità.",
      // Add the additional fields required by Wine type
      winery: "Castello di Ama",
      grapes: ["Sangiovese"],
      pairing: "Carni rosse, pasta al ragù, formaggi",
      storage: "7-12 anni in condizioni ottimali"
    },
    {
      id: "5",
      name: "Pinot Grigio",
      region: "Alto Adige",
      year: 2021,
      rating: 6,
      type: "red",
      image: "https://images.unsplash.com/photo-1566200248748-627b549d68bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      grape: "Pinot Grigio",
      body: "Leggero",
      structure: "Semplice",
      tannins: "Leggero",
      sweetness: "Secco",
      aroma: "Floreale",
      description: "Vino bianco fresco e minerale con note di pera, mela e fiori bianchi. Facile da bere e versatile negli abbinamenti.",
      // Add the additional fields required by Wine type
      winery: "Elena Walch",
      grapes: ["Pinot Grigio"],
      pairing: "Pesce, antipasti, risotti",
      storage: "2-3 anni in condizioni ottimali"
    },
    {
      id: "6",
      name: "Primitivo di Manduria",
      region: "Puglia",
      year: 2019,
      rating: 7,
      type: "red",
      image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      grape: "Primitivo",
      body: "Corposo",
      structure: "Robusto",
      tannins: "Medio",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "Vino intenso con aromi di frutta matura, prugna, spezie e pepe nero. Morbido al palato con una buona struttura.",
      // Add the additional fields required by Wine type
      winery: "San Marzano",
      grapes: ["Primitivo"],
      pairing: "Carne alla griglia, salumi, formaggi piccanti",
      storage: "5-7 anni in condizioni ottimali"
    }
  ],
  links: [
    { source: "1", target: "2", value: 5 },
    { source: "2", target: "3", value: 3 },
    { source: "3", target: "4", value: 8 },
    { source: "4", target: "5", value: 6 },
    { source: "5", target: "6", value: 4 },
    { source: "6", target: "1", value: 7 },
  ]
};
