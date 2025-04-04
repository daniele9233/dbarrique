
import { Button } from '@/components/ui/button';
import { Wine, Star } from 'lucide-react';

interface SearchResultsProps {
  results: any[];
  isAdding: {[key: string]: boolean};
  onAddToCollection: (wine: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  isAdding,
  onAddToCollection
}) => {
  if (results.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-white/60">
          Inserisci un termine di ricerca per trovare vini da tutto il mondo
        </p>
      </div>
    );
  }
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-serif mb-6">Risultati della ricerca</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((wine) => (
          <div 
            key={wine.id} 
            className="bg-noir-light border border-white/10 rounded-lg overflow-hidden transition-all hover:border-wine"
          >
            <div className="h-48 relative overflow-hidden">
              {wine.image ? (
                <img 
                  src={wine.image} 
                  alt={wine.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-noir to-noir-light">
                  <Wine className="h-12 w-12 text-white/20" />
                </div>
              )}
              
              <div className="absolute top-2 right-2 bg-noir/80 px-2 py-1 rounded text-sm flex items-center">
                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                <span>{wine.rating.toFixed(1)}</span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-noir via-noir/80 to-transparent">
                <p className="text-sm text-white/60">{wine.year > 0 ? wine.year : 'N.V.'}</p>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1 line-clamp-1">{wine.name}</h3>
              <p className="text-white/60 text-sm mb-2">{wine.winery}</p>
              <p className="text-white/40 text-xs mb-4">{wine.region}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 capitalize">{wine.type}</span>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAddToCollection(wine)}
                  disabled={isAdding[wine.id]}
                  className="bg-wine hover:bg-wine/80 text-white"
                >
                  {isAdding[wine.id] ? (
                    <>
                      <div className="animate-spin mr-1 h-3 w-3 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                      <span>Aggiungendo...</span>
                    </>
                  ) : (
                    <span>Aggiungi</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
