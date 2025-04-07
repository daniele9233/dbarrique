
import React from 'react';
import { useFilterContext } from './FilterContext';
import { getUniqueRegions } from '@/data/NetworkWineData';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const RegionFilter: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  const uniqueRegions = getUniqueRegions();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredRegions = uniqueRegions.filter(region => 
    region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (value: string) => {
    const updatedFilters = { ...filters };
    
    if (updatedFilters.regions.includes(value)) {
      updatedFilters.regions = updatedFilters.regions.filter(item => item !== value);
    } else {
      updatedFilters.regions = [...updatedFilters.regions, value];
    }
    
    setFilters(updatedFilters);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/40" />
        <Input
          placeholder="Cerca regione..."
          className="pl-8 bg-noir border-white/10 focus:border-wine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-2 max-h-full overflow-y-auto">
        {filteredRegions.length > 0 ? (
          filteredRegions.map(region => (
            <div key={region} className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                <input
                  type="checkbox"
                  checked={filters.regions.includes(region)}
                  onChange={() => handleChange(region)}
                  className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                />
                <span>{region}</span>
              </label>
            </div>
          ))
        ) : (
          <p className="text-sm text-white/50 py-2">Nessuna regione trovata.</p>
        )}
      </div>
    </div>
  );
};

export default RegionFilter;
