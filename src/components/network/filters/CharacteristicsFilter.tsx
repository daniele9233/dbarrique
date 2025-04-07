
import React from 'react';
import { useFilterContext } from './FilterContext';
import { getUniqueCharacteristics } from '@/data/NetworkWineData';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from "@/components/ui/scroll-area";

type CharacteristicType = 'body' | 'structure' | 'tannins' | 'sweetness' | 'aroma';

interface CharacteristicSectionProps {
  title: string;
  type: CharacteristicType;
  values: string[];
}

const CharacteristicSection: React.FC<CharacteristicSectionProps> = ({ title, type, values }) => {
  const { filters, setFilters } = useFilterContext();

  const handleChange = (value: string) => {
    const updatedFilters = { ...filters };
    const currentValues = updatedFilters.characteristics[type];
    
    if (currentValues.includes(value)) {
      updatedFilters.characteristics[type] = currentValues.filter(item => item !== value);
    } else {
      updatedFilters.characteristics[type] = [...currentValues, value];
    }
    
    setFilters(updatedFilters);
  };

  return (
    <div>
      <h4 className="text-wine text-xs uppercase tracking-wider mb-2">{title}</h4>
      <div className="space-y-1">
        {values.map(value => (
          <div key={value} className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer text-sm text-white/70 hover:text-white">
              <input
                type="checkbox"
                checked={filters.characteristics[type].includes(value)}
                onChange={() => handleChange(value)}
                className="rounded-sm bg-transparent border-white/30 text-wine focus:ring-wine"
              />
              <span>{value}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const CharacteristicsFilter: React.FC = () => {
  const uniqueCharacteristics = getUniqueCharacteristics();

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 pr-3 pb-4">
        <CharacteristicSection 
          title="Corpo" 
          type="body" 
          values={uniqueCharacteristics.body} 
        />
        
        <Separator className="bg-white/10" />
        
        <CharacteristicSection 
          title="Struttura" 
          type="structure" 
          values={uniqueCharacteristics.structure} 
        />
        
        <Separator className="bg-white/10" />
        
        <CharacteristicSection 
          title="Tannini" 
          type="tannins" 
          values={uniqueCharacteristics.tannins} 
        />
        
        <Separator className="bg-white/10" />
        
        <CharacteristicSection 
          title="Dolcezza" 
          type="sweetness" 
          values={uniqueCharacteristics.sweetness} 
        />
        
        <Separator className="bg-white/10" />
        
        <CharacteristicSection 
          title="Aroma" 
          type="aroma" 
          values={uniqueCharacteristics.aroma} 
        />
      </div>
    </ScrollArea>
  );
};

export default CharacteristicsFilter;
