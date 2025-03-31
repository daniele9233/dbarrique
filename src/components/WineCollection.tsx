
import { useState, useEffect } from 'react';
import { loadWinesFromFirestore, wines as globalWines } from '@/data/services/wineService';
import { Wine } from '@/data/models/Wine';
import CollectionHeader from './collection/CollectionHeader';
import WineGridDisplay from './collection/WineGridDisplay';
import Pagination from './collection/Pagination';
import CollectionLoading from './collection/CollectionLoading';
import useFirestoreStatus from '@/hooks/useFirestoreStatus';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';

const WineCollection = ({ limit }: { limit?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wines, setWines] = useState<Wine[]>(globalWines.length > 0 ? globalWines : []);
  const [isLoading, setIsLoading] = useState(globalWines.length === 0);
  const firestoreStatus = useFirestoreStatus();
  
  useEffect(() => {
    // Skip loading if we already have wines and we're showing a limited collection
    if (limit && globalWines.length > 0) {
      setWines(globalWines);
      setIsLoading(false);
      return;
    }

    const fetchWines = async () => {
      try {
        // If we already have cached wines, show them immediately
        if (globalWines.length > 0) {
          setWines(globalWines);
          setIsLoading(false);
          
          // Then update in the background
          const freshWines = await loadWinesFromFirestore(false);
          setWines(freshWines);
        } else {
          // Otherwise wait for the fetch
          const winesFromFirestore = await loadWinesFromFirestore();
          setWines(winesFromFirestore);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Errore nel caricamento dei vini:', error);
        setIsLoading(false);
      }
    };

    fetchWines();
  }, [limit]);
  
  const displayWines = limit ? wines.slice(0, limit) : wines;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wines.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + wines.length) % wines.length);
  };
  
  // Show loading state only if we have no wines to display
  if (isLoading && wines.length === 0) {
    return (
      <CollectionLoading 
        title="The Collection" 
        subtitle="Premium Selection" 
        loadingText="Caricamento della collezione di vini in corso..." 
      />
    );
  }
  
  return (
    <section className="section relative">
      {!firestoreStatus.isOnline && (
        <Alert variant="destructive" className="mb-4">
          <WifiOff className="h-4 w-4 mr-2" />
          <AlertDescription>
            Modalità offline attiva. I dati visualizzati potrebbero non essere aggiornati.
          </AlertDescription>
        </Alert>
      )}
      
      {firestoreStatus.isOnline && firestoreStatus.retryCount > 0 && (
        <Alert variant="warning" className="mb-4 bg-amber-100 border-amber-500">
          <Wifi className="h-4 w-4 mr-2" />
          <AlertDescription>
            Connessione intermittente. Tentativo di riconnessione in corso ({firestoreStatus.retryCount}/5)...
          </AlertDescription>
        </Alert>
      )}
      
      <CollectionHeader 
        title="The Collection" 
        subtitle="Premium Selection" 
        description="Each bottle in our cellar is chosen with care, representing the pinnacle of its region and vintage. Discover our selection of exceptional wines." 
      />
      
      {limit ? (
        <WineGridDisplay wines={displayWines} />
      ) : (
        <div className="relative">
          <WineGridDisplay wines={displayWines} />
          
          {wines.length > 6 && (
            <Pagination 
              currentIndex={currentIndex}
              totalItems={wines.length}
              itemsPerPage={6}
              onPrevious={prevSlide}
              onNext={nextSlide}
            />
          )}
        </div>
      )}
      
      {firestoreStatus.lastSync && (
        <div className="text-xs text-gray-400 mt-4 text-right">
          Ultimo aggiornamento: {firestoreStatus.lastSync.toLocaleTimeString()}
        </div>
      )}
    </section>
  );
};

export default WineCollection;
