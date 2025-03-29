
import { useState, useEffect } from 'react';
import { loadWinesFromFirestore, wines as globalWines } from '@/data/WineData';
import { Wine } from '@/data/WineData';
import CollectionHeader from './collection/CollectionHeader';
import WineGridDisplay from './collection/WineGridDisplay';
import Pagination from './collection/Pagination';
import CollectionLoading from './collection/CollectionLoading';

const WineCollection = ({ limit }: { limit?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wines, setWines] = useState<Wine[]>(globalWines);
  const [isLoading, setIsLoading] = useState(globalWines.length === 0);
  
  useEffect(() => {
    // Se abbiamo già i vini globali, non carichiamo di nuovo
    if (globalWines.length > 0) {
      setWines(globalWines);
      setIsLoading(false);
      return;
    }

    const fetchWines = async () => {
      try {
        const winesFromFirestore = await loadWinesFromFirestore();
        setWines(winesFromFirestore);
      } catch (error) {
        console.error('Errore nel caricamento dei vini:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWines();
  }, []);
  
  const displayWines = limit ? wines.slice(0, limit) : wines;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wines.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + wines.length) % wines.length);
  };
  
  if (isLoading) {
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
    </section>
  );
};

export default WineCollection;
