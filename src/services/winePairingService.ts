
import { Wine } from '@/data/models/Wine';

// Mappatura tra tipi di piatti e caratteristiche del vino ideale
interface PairingRule {
  dishType: string[];
  preferredWineTypes: string[];
  preferredBody: string[];
  preferredStructure: string[];
  preferredSweetness: string[];
  keywords: string[];
  score: number;
}

// Regole di abbinamento cibo-vino
const pairingRules: PairingRule[] = [
  {
    dishType: ['carne rossa', 'manzo', 'bistecca', 'agnello', 'selvaggina'],
    preferredWineTypes: ['red'],
    preferredBody: ['pieno', 'medio-pieno'],
    preferredStructure: ['strutturato'],
    preferredSweetness: ['secco'],
    keywords: ['robusto', 'tannico', 'corposo'],
    score: 30
  },
  {
    dishType: ['carne bianca', 'pollo', 'tacchino', 'maiale'],
    preferredWineTypes: ['red', 'white'],
    preferredBody: ['medio', 'medio-leggero'],
    preferredStructure: ['medio'],
    preferredSweetness: ['secco'],
    keywords: ['fruttato', 'fresco', 'medio corpo'],
    score: 25
  },
  {
    dishType: ['pesce', 'frutti di mare', 'crostacei', 'molluschi'],
    preferredWineTypes: ['white', 'sparkling'],
    preferredBody: ['leggero', 'medio-leggero'],
    preferredStructure: ['fresco'],
    preferredSweetness: ['secco', 'abboccato'],
    keywords: ['minerale', 'fresco', 'acido', 'crudo'],
    score: 35
  },
  {
    dishType: ['pasta', 'risotto', 'pizza'],
    preferredWineTypes: ['red', 'white'],
    preferredBody: ['medio'],
    preferredStructure: ['medio'],
    preferredSweetness: ['secco'],
    keywords: ['pasta', 'riso', 'pizza', 'italiano'],
    score: 20
  },
  {
    dishType: ['dessert', 'dolce', 'torta', 'cioccolato'],
    preferredWineTypes: ['sparkling'],
    preferredBody: ['leggero', 'medio-leggero'],
    preferredStructure: ['fresco'],
    preferredSweetness: ['dolce', 'abboccato'],
    keywords: ['dolce', 'dessert', 'pasticceria'],
    score: 40
  },
  {
    dishType: ['formaggio', 'formaggi'],
    preferredWineTypes: ['red', 'white'],
    preferredBody: ['pieno', 'medio-pieno'],
    preferredStructure: ['strutturato'],
    preferredSweetness: ['secco'],
    keywords: ['formaggio', 'stagionato', 'erborinato'],
    score: 25
  }
];

// Funzione per calcolare il punteggio di abbinamento
export const calculatePairingScore = (wine: Wine, dish: string): number => {
  let score = 0;
  const dishLower = dish.toLowerCase();
  
  // Analizza ogni regola di abbinamento
  for (const rule of pairingRules) {
    // Controlla se il piatto corrisponde a uno dei tipi di piatto della regola
    const matchesDishType = rule.dishType.some(type => dishLower.includes(type));
    
    if (matchesDishType) {
      // Aggiungi punteggio base per il tipo di piatto corrispondente
      score += rule.score;
      
      // Controlla il tipo di vino
      if (rule.preferredWineTypes.includes(wine.type)) {
        score += 15;
      }
      
      // Controlla il corpo del vino
      if (rule.preferredBody.includes(wine.body.toLowerCase())) {
        score += 10;
      }
      
      // Controlla la struttura del vino
      if (rule.preferredStructure.includes(wine.structure.toLowerCase())) {
        score += 10;
      }
      
      // Controlla la dolcezza del vino
      if (rule.preferredSweetness.includes(wine.sweetness.toLowerCase())) {
        score += 10;
      }
      
      // Cerca le parole chiave nelle descrizioni del vino
      if (wine.description) {
        const descriptionLower = wine.description.toLowerCase();
        for (const keyword of rule.keywords) {
          if (descriptionLower.includes(keyword)) {
            score += 5;
          }
        }
      }
    }
  }
  
  // Controlla se il vino ha abbinamenti espliciti nella sua scheda
  if (wine.pairing) {
    const pairingLower = wine.pairing.toLowerCase();
    
    // Estrai parole chiave dal piatto
    const dishWords = dishLower.split(' ');
    for (const word of dishWords) {
      if (word.length > 3 && pairingLower.includes(word)) {
        score += 25;
      }
    }
  }
  
  // Limita il punteggio a 100
  return Math.min(Math.max(score, 10), 100);
};

// Funzione principale per trovare abbinamenti
export const findWinePairings = (wines: Wine[], dish: string): (Wine & { matchScore: number })[] => {
  if (!dish || !wines || wines.length === 0) {
    return [];
  }
  
  // Calcola il punteggio per ogni vino
  const scoredWines = wines.map(wine => {
    const matchScore = calculatePairingScore(wine, dish);
    return {
      ...wine,
      matchScore
    };
  });
  
  // Filtra i vini con un punteggio superiore a 40
  const matchedWines = scoredWines.filter(wine => wine.matchScore > 40);
  
  // Ordina i vini per punteggio (decrescente)
  return matchedWines.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
};
