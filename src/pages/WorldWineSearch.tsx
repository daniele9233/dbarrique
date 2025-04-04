
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorldWineSearchHeader from '@/components/search/WorldWineSearchHeader';
import SearchResults from '@/components/search/SearchResults';
import { WineSearchOptions, searchWines, addVivinoWineToCollection } from '@/data/services/wine/wineSearchService';
import { Wine } from '@/data/models/Wine';
import { LoadingSpinner } from '@/components/collection/LoadingSpinner';
import GlobalWineSearchBar from '@/components/search/GlobalWineSearchBar';

const WorldWineSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState<{[key: string]: boolean}>({});
  
  const handleSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      toast({
        title: "Query troppo breve",
        description: "Inserisci almeno 2 caratteri per la ricerca",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      const options: WineSearchOptions = {
        query,
        perPage: 24
      };
      
      const results = await searchWines(options);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "Nessun risultato",
          description: `Non sono stati trovati vini per "${query}"`,
        });
      }
    } catch (error) {
      console.error('Errore nella ricerca:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la ricerca",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  const handleAddToCollection = useCallback(async (wine: any) => {
    setIsAdding(prev => ({ ...prev, [wine.id]: true }));
    
    try {
      const addedWine = await addVivinoWineToCollection(wine);
      
      if (addedWine) {
        toast({
          title: "Vino aggiunto",
          description: `${wine.name} è stato aggiunto alla tua collezione`,
        });
      } else {
        throw new Error("Impossibile aggiungere il vino");
      }
    } catch (error) {
      console.error('Errore nell\'aggiunta del vino:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiungere il vino alla collezione",
        variant: "destructive"
      });
    } finally {
      setIsAdding(prev => ({ ...prev, [wine.id]: false }));
    }
  }, []);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };
  
  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <WorldWineSearchHeader />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <GlobalWineSearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmit={handleSearchSubmit}
            isSearching={isSearching}
          />
          
          {isSearching ? (
            <div className="flex flex-col items-center justify-center mt-20">
              <LoadingSpinner />
              <p className="mt-4 text-white/60">Ricerca vini in corso...</p>
            </div>
          ) : (
            <SearchResults 
              results={searchResults}
              isAdding={isAdding}
              onAddToCollection={handleAddToCollection}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorldWineSearch;
