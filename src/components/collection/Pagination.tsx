
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentIndex: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination = ({ 
  currentIndex, 
  totalItems, 
  itemsPerPage, 
  onPrevious, 
  onNext 
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-12 space-x-4">
      <button
        onClick={onPrevious}
        className="p-3 rounded-full bg-noir-light hover:bg-wine transition-colors duration-300 disabled:opacity-50"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        className="p-3 rounded-full bg-noir-light hover:bg-wine transition-colors duration-300 disabled:opacity-50"
        disabled={currentIndex + itemsPerPage >= totalItems}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
