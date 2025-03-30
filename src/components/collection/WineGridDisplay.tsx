
import { Wine } from '@/data/models/Wine';
import WineCard from '@/components/WineCard';

interface WineGridDisplayProps {
  wines: Wine[];
}

const WineGridDisplay = ({ wines }: WineGridDisplayProps) => {
  return (
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
  );
};

export default WineGridDisplay;
