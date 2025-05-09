
import React from 'react';
import { useFilterContext } from './FilterContext';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// List of all Italian regions
const italianRegions = [
  "Abruzzo",
  "Basilicata", 
  "Calabria", 
  "Campania",
  "Emilia-Romagna", 
  "Friuli-Venezia Giulia", 
  "Lazio", 
  "Liguria", 
  "Lombardia", 
  "Marche", 
  "Molise", 
  "Piemonte", 
  "Puglia", 
  "Sardegna", 
  "Sicilia", 
  "Toscana", 
  "Trentino-Alto Adige", 
  "Umbria", 
  "Valle d'Aosta", 
  "Veneto"
];

const RegionFilter: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredRegions = italianRegions
    .filter(region => region.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

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
    <div className="flex flex-col h-full space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/40" />
        <Input
          placeholder="Cerca regione..."
          className="pl-8 bg-noir border-white/10 focus:border-wine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-3 pb-4">
          {filteredRegions.length > 0 ? (
            filteredRegions.map(region => (
              <div key={region} className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white w-full py-1">
                  <Checkbox
                    id={`region-${region}`}
                    checked={filters.regions.includes(region)}
                    onCheckedChange={() => handleChange(region)}
                    className="rounded-sm bg-transparent border-white/30 text-wine data-[state=checked]:bg-wine data-[state=checked]:text-white"
                  />
                  <span className="flex-1">{region}</span>
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/50 py-2">Nessuna regione trovata.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RegionFilter;
