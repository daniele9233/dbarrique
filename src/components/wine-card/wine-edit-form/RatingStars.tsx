
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RatingStars = ({ rating, onRatingChange }: RatingStarsProps) => {
  return (
    <div className="flex space-x-1">
      {[...Array(10)].map((_, i) => (
        <Star 
          key={i}
          onClick={() => onRatingChange(i + 1)}
          className={`h-4 w-4 ${i < rating ? 'text-wine fill-wine' : 'text-gray-400'} 
            cursor-pointer hover:text-wine-light`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
