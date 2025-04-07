
import React, { useState } from 'react';
import { useFilterContext } from './FilterContext';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { grapes } from '@/data/constants/wines/grapeOptions';

const GrapeFilter: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the full list of grapes from our constants file
  // This ensures all grape varieties are available, not just those in the network data
  const allGrapes = grapes.sort((a, b) => a.localeCompare(b));
  
  const filteredGrapes = allGrapes.filter(grape => 
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
    <div className="flex flex-col h-full space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/40" />
        <Input
          placeholder="Cerca vitigno..."
          className="pl-8 bg-noir border-white/10 focus:border-wine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-3">
          {filteredGrapes.length > 0 ? (
            filteredGrapes.map(grape => (
              <div key={grape} className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white w-full py-1">
                  <Checkbox
                    id={`grape-${grape}`}
                    checked={filters.grapes.includes(grape)}
                    onCheckedChange={() => handleChange(grape)}
                    className="rounded-sm bg-transparent border-white/30 text-wine data-[state=checked]:bg-wine data-[state=checked]:text-white"
                  />
                  <span className="flex-1">{grape}</span>
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/50 py-2">Nessun vitigno trovato.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default GrapeFilter;
