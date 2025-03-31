
import { Wine } from '@/data/models/Wine';
import WineGridDisplay from './WineGridDisplay';
import NoWinesFound from './NoWinesFound';
import LoadingSpinner from './LoadingSpinner';
import useWineLoading from '@/hooks/useWineLoading';

interface WineGridProps {
  wines: Wine[];
  resetAllFilters: () => void;
}

const WineGrid: React.FC<WineGridProps> = ({ wines, resetAllFilters }) => {
  const { wines: localWines, isLoading } = useWineLoading(wines);
  
  // Determine which wines to display - filtered wines from props or loaded wines
  const displayWines = wines.length > 0 ? wines : localWines;
  
  // Show spinner only if we have no wines to display
  if (isLoading && displayWines.length === 0) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4">
      {displayWines.length > 0 ? (
        <WineGridDisplay wines={displayWines} />
      ) : (
        <NoWinesFound resetAllFilters={resetAllFilters} />
      )}
    </div>
  );
};

export default WineGrid;
