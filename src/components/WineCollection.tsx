
import { useState, useEffect } from 'react';
import WineCard from './WineCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { loadWinesFromFirestore, wines as globalWines } from '@/data/WineData';
import { Wine } from '@/data/WineData';

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
      <section className="section relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h4 className="text-wine uppercase tracking-[0.2em] text-sm mb-3">Premium Selection</h4>
          <h2 className="font-serif text-4xl md:text-5xl mb-5">The Collection</h2>
          <p className="text-white/70">
            Caricamento della collezione di vini in corso...
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine"></div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="section relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h4 className="text-wine uppercase tracking-[0.2em] text-sm mb-3 opacity-0 animate-fade-in">Premium Selection</h4>
        <h2 className="font-serif text-4xl md:text-5xl mb-5 opacity-0 animate-fade-in animate-delay-100">The Collection</h2>
        <p className="text-white/70 opacity-0 animate-fade-in animate-delay-200">
          Each bottle in our cellar is chosen with care, representing the pinnacle of its region and vintage.
          Discover our selection of exceptional wines.
        </p>
      </div>
      
      {limit ? (
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
        <div className="relative">
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
          
          {wines.length > 6 && (
            <div className="flex justify-center mt-12 space-x-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-noir-light hover:bg-wine transition-colors duration-300 disabled:opacity-50"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-noir-light hover:bg-wine transition-colors duration-300 disabled:opacity-50"
                disabled={currentIndex + 6 >= wines.length}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default WineCollection;
