
import { Wine, WineType } from '@/data/models/Wine';
import { addWineToCache } from './wineCache';
import { withRetry } from './wineConnection';
import { v4 as uuidv4 } from 'uuid';

// URL base per le richieste a Vivino (API non ufficiale)
const VIVINO_API_BASE = 'https://www.vivino.com/api/explore/explore';
const VIVINO_DETAILS_BASE = 'https://www.vivino.com/api/wines';

// Tipo per i risultati della ricerca di Vivino
interface VivinoSearchResult {
  id: number;
  name: string;
  vintage?: {
    year: number;
  };
  region?: {
    name: string;
    country: {
      name: string;
    };
  };
  winery: {
    name: string;
  };
  style?: {
    name: string;
  };
  image: {
    location: string;
  };
  statistics?: {
    ratings_average: number;
    ratings_count: number;
  };
}

// Tipo per i dati convertiti da Vivino al nostro formato
interface ConvertedWineResult {
  id: string;
  name: string;
  year: number;
  region: string;
  winery: string;
  type: WineType;
  rating: number;
  image: string;
  source: 'vivino';
  sourceId: number;
}

// Interfaccia per le opzioni di ricerca
export interface WineSearchOptions {
  query: string;
  page?: number;
  perPage?: number;
}

/**
 * Cerca vini utilizzando i dati di Vivino
 */
export const searchWines = async (options: WineSearchOptions): Promise<ConvertedWineResult[]> => {
  const { query, page = 1, perPage = 12 } = options;
  
  if (!query || query.length < 2) {
    console.log('wineSearchService: Query troppo breve');
    return [];
  }
  
  try {
    console.log(`wineSearchService: Cercando vini con query "${query}"`);
    
    // Costruisci l'URL per la ricerca
    const params = new URLSearchParams({
      q: query,
      per_page: perPage.toString(),
      page: page.toString(),
      country_codes: '',
      wine_type_ids: '',
      food_ids: ''
    });
    
    const url = `${VIVINO_API_BASE}?${params.toString()}`;
    
    // Esegui la richiesta con retry
    const response = await withRetry(async () => {
      const fetchResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!fetchResponse.ok) {
        throw new Error(`Errore nella ricerca vini: ${fetchResponse.status}`);
      }
      
      return fetchResponse.json();
    }, 2); // Riduco il numero di tentativi per migliorare la velocità
    
    if (!response || !response.explore_vintage || !response.explore_vintage.matches) {
      console.log('wineSearchService: Nessun risultato trovato');
      return [];
    }
    
    // Converte i risultati nel nostro formato
    const matches = response.explore_vintage.matches;
    console.log(`wineSearchService: Trovati ${matches.length} vini`);
    
    return matches.map((match: any) => {
      const wine = match.vintage?.wine || match.wine;
      if (!wine) return null;
      
      // Determina il tipo di vino in base alle informazioni disponibili
      let wineType: WineType = 'red';
      if (wine.type_id === 1) wineType = 'red';
      else if (wine.type_id === 2) wineType = 'white';
      else if (wine.type_id === 3) wineType = 'sparkling';
      else if (wine.type_id === 4) wineType = 'rosé';
      
      const result: ConvertedWineResult = {
        id: `vivino-${wine.id}-${uuidv4().substring(0, 8)}`,
        name: wine.name,
        year: match.vintage?.year || 0,
        region: wine.region?.name ? `${wine.region.name}, ${wine.region.country?.name || ''}` : 'Sconosciuta',
        winery: wine.winery?.name || 'Sconosciuta',
        type: wineType,
        rating: wine.statistics?.ratings_average || 0,
        image: wine.image?.location || '',
        source: 'vivino',
        sourceId: wine.id
      };
      
      return result;
    }).filter(Boolean);
  } catch (error) {
    console.error('wineSearchService: Errore nella ricerca vini:', error);
    return [];
  }
};

/**
 * Ottiene i dettagli di un vino specifico da Vivino
 */
export const getWineDetails = async (wineId: number): Promise<Partial<Wine> | null> => {
  try {
    const url = `${VIVINO_DETAILS_BASE}/${wineId}`;
    
    const response = await withRetry(async () => {
      const fetchResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!fetchResponse.ok) {
        throw new Error(`Errore nei dettagli vino: ${fetchResponse.status}`);
      }
      
      return fetchResponse.json();
    }, 2);
    
    if (!response || !response.wine) {
      console.log('wineSearchService: Dettagli vino non trovati');
      return null;
    }
    
    const wine = response.wine;
    
    // Mappa le caratteristiche del vino dai dati Vivino
    let body = 'medium';
    let structure = 'medium';
    let tannins = 'medium';
    let sweetness = 'dry';
    let aroma = 'moderate';
    
    if (wine.taste) {
      // Mappiamo i valori di gusto di Vivino ai nostri valori
      if (wine.taste.body > 3.5) body = 'full';
      else if (wine.taste.body < 2.5) body = 'light';
      
      if (wine.taste.structure > 3.5) structure = 'complex';
      else if (wine.taste.structure < 2.5) structure = 'simple';
      
      if (wine.taste.tannin > 3.5) tannins = 'high';
      else if (wine.taste.tannin < 2.5) tannins = 'low';
      
      if (wine.taste.acidity > 3.5) aroma = 'intense';
      else if (wine.taste.acidity < 2.5) aroma = 'delicate';
      
      if (wine.taste.intensity > 3.5) sweetness = 'sweet';
      else if (wine.taste.intensity < 2.5) sweetness = 'dry';
    }
    
    // Estrai le uve
    const grapes = wine.grapes?.map((g: any) => g.name) || [];
    
    return {
      body,
      structure,
      tannins,
      sweetness,
      aroma,
      grapes,
      description: wine.description || '',
      pairing: wine.food_pairing || '',
      storage: wine.maker?.location?.normalized_location || ''
    };
  } catch (error) {
    console.error('wineSearchService: Errore nei dettagli vino:', error);
    return null;
  }
};

/**
 * Aggiunge un vino dalla ricerca alla collezione locale
 */
export const addVivinoWineToCollection = async (result: ConvertedWineResult): Promise<Wine | null> => {
  try {
    // Ottieni dettagli aggiuntivi
    const details = await getWineDetails(result.sourceId);
    
    if (!details) {
      console.error('wineSearchService: Impossibile ottenere dettagli per il vino');
      return null;
    }
    
    // Crea un oggetto Wine completo
    const wine: Wine = {
      id: result.id,
      name: result.name,
      region: result.region,
      winery: result.winery,
      year: result.year || new Date().getFullYear(),
      type: result.type,
      image: result.image,
      rating: result.rating || 3,
      grape: details.grapes?.[0] || 'Sconosciuto',
      grapes: details.grapes || [],
      body: details.body || 'medium',
      structure: details.structure || 'medium',
      tannins: details.tannins || 'medium',
      sweetness: details.sweetness || 'dry',
      aroma: details.aroma || 'moderate',
      description: details.description || `Un ${result.type} di ${result.winery} dalla regione ${result.region}.`,
      pairing: details.pairing || 'Abbinamenti gastronomici non specificati.',
      storage: details.storage || 'Informazioni di conservazione non disponibili.'
    };
    
    // Aggiungi il vino alla cache locale
    addWineToCache(wine);
    
    return wine;
  } catch (error) {
    console.error('wineSearchService: Errore nell\'aggiunta del vino:', error);
    return null;
  }
};
