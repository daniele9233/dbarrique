
import { Search, Globe, Wine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GlobalWineSearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSearching: boolean;
}

const GlobalWineSearchBar: React.FC<GlobalWineSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
  isSearching
}) => {
  return (
    <form onSubmit={onSubmit} className="relative flex w-full max-w-2xl mx-auto">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-white/40" />
        </div>
        <input
          type="text"
          placeholder="Cerca vini da tutto il mondo..."
          className="w-full pl-10 pr-4 py-3 rounded-l-md bg-noir-light border border-white/10 focus:border-wine focus:ring-1 focus:ring-wine outline-none transition-colors duration-200 text-white placeholder:text-white/40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isSearching}
        />
      </div>
      
      <Button 
        type="submit" 
        className="bg-wine hover:bg-wine/80 text-white rounded-r-md px-6"
        disabled={isSearching || searchQuery.length < 2}
      >
        {isSearching ? (
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
            <span>Cercando...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            <span>Cerca</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default GlobalWineSearchBar;
