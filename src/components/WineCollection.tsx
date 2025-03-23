import { useState } from 'react';
import WineCard from './WineCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Sample wine data with 1-10 rating scale (only red wines)
const wines = [
  {
    id: 1,
    name: "Château Margaux",
    region: "Bordeaux, France",
    year: 2015,
    rating: 10,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    grape: "Cabernet Sauvignon",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 2,
    name: "Barolo Riserva",
    region: "Piedmont, Italy",
    year: 2016,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Nebbiolo",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Evoluto"
  },
  {
    id: 4,
    name: "Opus One",
    region: "Napa Valley, USA",
    year: 2017,
    rating: 8,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1566452348683-79f9cf5c3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Merlot",
    body: "Corposo",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 7,
    name: "Sassicaia",
    region: "Tuscany, Italy",
    year: 2016,
    rating: 10,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    grape: "Cabernet Sauvignon",
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  },
  {
    id: 8,
    name: "Penfolds Grange",
    region: "South Australia",
    year: 2014,
    rating: 9,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    grape: "Syrah",
    body: "Corposo",
    structure: "Strutturato",
    tannins: "Tannico",
    sweetness: "Secco",
    aroma: "Speziato"
  }
];

const WineCollection = ({ limit }: { limit?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayWines = limit ? wines.slice(0, limit) : wines;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wines.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + wines.length) % wines.length);
  };
  
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
