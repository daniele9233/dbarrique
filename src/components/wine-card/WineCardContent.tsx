
import { Star, Plus } from 'lucide-react';
import { Wine } from '@/data/models/Wine';

interface WineCardContentProps {
  name: string;
  region: string;
  year: number;
  rating: number;
}

const WineCardContent = ({ name, region, year, rating }: WineCardContentProps) => {
  const renderRatingStars = (rating: number) => {
    return [...Array(10)].map((_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'}`}
      />
    ));
  };
  
  return (
    <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 ease-wine-bounce">
      <div className="space-y-3">
        <div className="flex items-center space-x-0.5 flex-wrap">
          {renderRatingStars(rating)}
        </div>
        
        <h3 className="font-serif text-2xl">{name}</h3>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/70 text-sm">{region}</p>
            <p className="text-white/90 font-medium">{year}</p>
          </div>
          
          <button 
            className="h-10 w-10 rounded-full flex items-center justify-center bg-wine hover:bg-wine-light transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineCardContent;
