
import React from 'react';
import { useFilterContext } from './FilterContext';
import { getUniqueGrapes } from '@/data/NetworkWineData';

const GrapeFilter: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  const uniqueGrapes = getUniqueGrapes();

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
    <div className="space-y-2">
      {uniqueGrapes.map(grape => (
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
      ))}
    </div>
  );
};

export default GrapeFilter;
