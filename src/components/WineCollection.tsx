
import { useState } from 'react';
import WineCard from './WineCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Sample wine data
const wines = [
  {
    id: 1,
    name: "Château Margaux",
    region: "Bordeaux, France",
    year: 2015,
    rating: 5,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Barolo Riserva",
    region: "Piedmont, Italy",
    year: 2016,
    rating: 4,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 3,
    name: "Dom Pérignon",
    region: "Champagne, France",
    year: 2010,
    rating: 5,
    type: "sparkling" as const,
    image: "https://images.unsplash.com/photo-1594372425423-ba65d6e1e226?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 4,
    name: "Opus One",
    region: "Napa Valley, USA",
    year: 2017,
    rating: 4,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1566452348683-79f9cf5c3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 5,
    name: "Chablis Grand Cru",
    region: "Burgundy, France",
    year: 2018,
    rating: 4,
    type: "white" as const,
    image: "https://images.unsplash.com/photo-1556340346-5e30da977c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=994&q=80"
  },
  {
    id: 6,
    name: "Whispering Angel",
    region: "Provence, France",
    year: 2021,
    rating: 3,
    type: "rosé" as const,
    image: "https://images.unsplash.com/photo-1588982637125-d704a8901dce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=991&q=80"
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
