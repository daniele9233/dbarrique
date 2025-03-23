
import WineCard from '@/components/WineCard';

interface Wine {
  id: number;
  name: string;
  region: string;
  year: number;
  rating: number;
  type: "red";
  image: string;
  grape: string;
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
}

interface WineGridProps {
  wines: Wine[];
  resetAllFilters: () => void;
}

const WineGrid: React.FC<WineGridProps> = ({ wines, resetAllFilters }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {wines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wines.map((wine, index) => (
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
