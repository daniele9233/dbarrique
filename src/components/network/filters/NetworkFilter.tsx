
import React, { useState } from 'react';
import { FilterOptions } from '../types';
import { FilterProvider } from './FilterContext';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { X } from 'lucide-react';
import GrapeFilter from './GrapeFilter';
import RegionFilter from './RegionFilter';
import CharacteristicsFilter from './CharacteristicsFilter';

interface NetworkFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const NetworkFilter: React.FC<NetworkFilterProps> = ({ onFilterChange, className }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    grapes: [],
    regions: [],
    characteristics: {
      body: [],
      structure: [],
      tannins: [],
      sweetness: [],
      aroma: []
    }
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const emptyFilters: FilterOptions = {
      grapes: [],
      regions: [],
      characteristics: {
        body: [],
        structure: [],
        tannins: [],
        sweetness: [],
        aroma: []
      }
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    filters.grapes.length > 0 || 
    filters.regions.length > 0 || 
    Object.values(filters.characteristics).some(arr => arr.length > 0);

  return (
    <FilterProvider initialFilters={filters} onFilterChange={handleFilterChange}>
      <div className={`bg-noir-dark/80 rounded-lg p-4 backdrop-blur-lg border border-white/10 flex flex-col h-full ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-wine font-serif text-xl">Filtri</h3>
          {hasActiveFilters && (
            <button 
              onClick={resetFilters}
              className="text-xs text-white/60 hover:text-white flex items-center"
            >
              <X className="w-3 h-3 mr-1" />
              Reset
            </button>
          )}
        </div>
        
        <Tabs defaultValue="grapes" className="w-full flex-1 flex flex-col">
          <TabsList className="w-full mb-4 bg-noir-light grid grid-cols-3">
            <TabsTrigger value="grapes">Vitigni</TabsTrigger>
            <TabsTrigger value="regions">Regioni</TabsTrigger>
            <TabsTrigger value="characteristics">Caratt.</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            <TabsContent value="grapes" className="flex-1 overflow-y-auto pr-2 h-full">
              <GrapeFilter />
            </TabsContent>
            
            <TabsContent value="regions" className="flex-1 overflow-y-auto pr-2 h-full">
              <RegionFilter />
            </TabsContent>
            
            <TabsContent value="characteristics" className="flex-1 overflow-y-auto pr-2 h-full">
              <CharacteristicsFilter />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </FilterProvider>
  );
};

export default NetworkFilter;
