import { useEffect, useState } from 'react';
import WineCard from '@/components/WineCard';
import { Wine } from '@/data/models/Wine';
import { loadWinesFromFirestore, wines as globalWines } from '@/data/services/wineService';

interface WineGridProps {
  wines: Wine[];
  resetAllFilters: () => void;
}

const WineGrid: React.FC<WineGridProps> = ({ wines, resetAllFilters }) => {
  const [isLoading, setIsLoading] = useState(wines.length === 0 && globalWines.length === 0);
  const [localWines, setLocalWines] = useState<Wine[]>(
    wines.length > 0 ? wines : globalWines.length > 0 ? globalWines : []
  );
  
  useEffect(() => {
    // If we have wines from props, use those
    if (wines.length > 0) {
      setLocalWines(wines);
      setIsLoading(false);
      return;
    }

    // If we have cached wines, show them immediately
    if (globalWines.length > 0) {
      setLocalWines(globalWines);
      setIsLoading(false);
      
      // Update in background
      loadWinesFromFirestore(false).then(freshWines => {
        setLocalWines(freshWines);
      }).catch(console.error);
      return;
    }

    // Otherwise do a regular fetch
    setIsLoading(true);
    loadWinesFromFirestore()
      .then(winesFromFirestore => {
        setLocalWines(winesFromFirestore);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Errore nel caricamento dei vini:', error);
        setIsLoading(false);
      });
  }, [wines]);
  
  const displayWines = wines.length > 0 ? wines : localWines;
  
  // Show spinner only if we genuinely have no wines to display
  if (isLoading && displayWines.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4">
      {displayWines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayWines.map((wine, index) => (
            <div
              key={wine.id}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <WineCard {...wine} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg mb-4">Nessun vino trovato che corrisponda ai tuoi criteri.</p>
          <button
            onClick={resetAllFilters}
            className="text-wine hover:text-wine-light transition-colors duration-300"
          >
            Azzera tutti i filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default WineGrid;
