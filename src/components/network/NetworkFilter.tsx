import { useState } from 'react';
import { getUniqueGrapes, getUniqueRegions, getUniqueCharacteristics } from '@/data/NetworkWineData';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

interface NetworkFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

export interface FilterOptions {
  grapes: string[];
  regions: string[];
  characteristics: {
    body: string[];
    structure: string[];
    tannins: string[];
    sweetness: string[];
    aroma: string[];
  };
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

  const uniqueGrapes = getUniqueGrapes();
  const uniqueRegions = getUniqueRegions();
  const uniqueCharacteristics = getUniqueCharacteristics();

  const handleFilterChange = (category: keyof FilterOptions, value: string) => {
    const updatedFilters = { ...filters };
    
    if (category === 'grapes') {
      if (updatedFilters.grapes.includes(value)) {
        updatedFilters.grapes = updatedFilters.grapes.filter(item => item !== value);
      } else {
        updatedFilters.grapes = [...updatedFilters.grapes, value];
      }
    } 
    else if (category === 'regions') {
      if (updatedFilters.regions.includes(value)) {
        updatedFilters.regions = updatedFilters.regions.filter(item => item !== value);
      } else {
        updatedFilters.regions = [...updatedFilters.regions, value];
      }
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleCharacteristicChange = (
    characteristicType: keyof FilterOptions['characteristics'],
    value: string
  ) => {
    const updatedFilters = { ...filters };
    const currentValues = updatedFilters.characteristics[characteristicType];
    
    if (currentValues.includes(value)) {
      updatedFilters.characteristics[characteristicType] = currentValues.filter(
        item => item !== value
      );
    } else {
      updatedFilters.characteristics[characteristicType] = [...currentValues, value];
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
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

  return (
    <div className={`bg-noir-dark/80 rounded-lg p-4 backdrop-blur-lg border border-white/10 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-wine font-serif text-xl">Filtri</h3>
        {(filters.grapes.length || filters.regions.length || 
          Object.values(filters.characteristics).some(arr => arr.length > 0)) && (
          <button 
            onClick={resetFilters}
            className="text-xs text-white/60 hover:text-white flex items-center"
          >
            <X className="w-3 h-3 mr-1" />
            Reset
          </button>
        )}
      </div>
      
      <Tabs defaultValue="grapes" className="w-full">
        <TabsList className="w-full mb-4 bg-noir-light grid grid-cols-3">
          <TabsTrigger value="grapes">Vitigni</TabsTrigger>
          <TabsTrigger value="regions">Regioni</TabsTrigger>
          <TabsTrigger value="characteristics">Caratt.</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grapes" className="max-h-64 overflow-y-auto pr-2">
          <div className="space-y-2">
            {uniqueGrapes.map(grape => (
              <div key={grape} className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                  <input
                    type="checkbox"
                    checked={filters.grapes.includes(grape)}
                    onChange={() => handleFilterChange('grapes', grape)}
                    className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                  />
                  <span>{grape}</span>
                </label>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="regions" className="max-h-64 overflow-y-auto pr-2">
          <div className="space-y-2">
            {uniqueRegions.map(region => (
              <div key={region} className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                  <input
                    type="checkbox"
                    checked={filters.regions.includes(region)}
                    onChange={() => handleFilterChange('regions', region)}
                    className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                  />
                  <span>{region}</span>
                </label>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="characteristics" className="max-h-64 overflow-y-auto pr-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-wine text-xs uppercase tracking-wider mb-2">Corpo</h4>
              <div className="space-y-1">
                {uniqueCharacteristics.body.map(value => (
                  <div key={value} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                      <input
                        type="checkbox"
                        checked={filters.characteristics.body.includes(value)}
                        onChange={() => handleCharacteristicChange('body', value)}
                        className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                      />
                      <span>{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div>
              <h4 className="text-wine text-xs uppercase tracking-wider mb-2">Struttura</h4>
              <div className="space-y-1">
                {uniqueCharacteristics.structure.map(value => (
                  <div key={value} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                      <input
                        type="checkbox"
                        checked={filters.characteristics.structure.includes(value)}
                        onChange={() => handleCharacteristicChange('structure', value)}
                        className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                      />
                      <span>{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div>
              <h4 className="text-wine text-xs uppercase tracking-wider mb-2">Tannini</h4>
              <div className="space-y-1">
                {uniqueCharacteristics.tannins.map(value => (
                  <div key={value} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                      <input
                        type="checkbox"
                        checked={filters.characteristics.tannins.includes(value)}
                        onChange={() => handleCharacteristicChange('tannins', value)}
                        className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                      />
                      <span>{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div>
              <h4 className="text-wine text-xs uppercase tracking-wider mb-2">Dolcezza</h4>
              <div className="space-y-1">
                {uniqueCharacteristics.sweetness.map(value => (
                  <div key={value} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                      <input
                        type="checkbox"
                        checked={filters.characteristics.sweetness.includes(value)}
                        onChange={() => handleCharacteristicChange('sweetness', value)}
                        className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                      />
                      <span>{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="bg-white/10" />
            
            <div>
              <h4 className="text-wine text-xs uppercase tracking-wider mb-2">Aroma</h4>
              <div className="space-y-1">
                {uniqueCharacteristics.aroma.map(value => (
                  <div key={value} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
                      <input
                        type="checkbox"
                        checked={filters.characteristics.aroma.includes(value)}
                        onChange={() => handleCharacteristicChange('aroma', value)}
                        className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
                      />
                      <span>{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkFilter;
