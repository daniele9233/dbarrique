
import React from 'react';
import { useFilterContext } from './FilterContext';
import { getUniqueGrapes } from '@/data/NetworkWineData';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const GrapeFilter: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  const uniqueGrapes = getUniqueGrapes();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredGrapes = uniqueGrapes.filter(grape => 
    grape.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (value: string) => {
    const updatedFilters = { ...filters };
    
    if (updatedFilters.grapes.includes(value)) {
      updatedFilters.grapes = updatedFilters.grapes.filter(item => item !== value);
    } else {
      updatedFilters.grapes = [...updatedFilters.grapes, value];
    }
    
    setFilters(updatedFilters);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/40" />
        <Input
          placeholder="Cerca vitigno..."
          className="pl-8 bg-noir border-white/10 focus:border-wine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-2 max-h-full overflow-y-auto">
        {filteredGrapes.length > 0 ? (
          filteredGrapes.map(grape => (
            <div key={grape} className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                <input
                  type="checkbox"
                  checked={filters.grapes.includes(grape)}
                  onChange={() => handleChange(grape)}
                  className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                />
                <span>{grape}</span>
              </label>
            </div>
          ))
        ) : (
          <p className="text-sm text-white/50 py-2">Nessun vitigno trovato.</p>
        )}
      </div>
    </div>
  );
};

export default GrapeFilter;
