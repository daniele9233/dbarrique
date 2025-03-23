
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-white/40" />
      </div>
      <input
        type="text"
        placeholder="Cerca vini per nome, regione, anno o vitigno..."
        className="w-full pl-10 pr-4 py-3 rounded-md bg-noir-light border border-white/10 focus:border-wine focus:ring-1 focus:ring-wine outline-none transition-colors duration-200 text-white placeholder:text-white/40"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
