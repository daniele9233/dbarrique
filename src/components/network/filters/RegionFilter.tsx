
import React from 'react';
import { useFilterContext } from './FilterContext';
import { getUniqueRegions } from '@/data/NetworkWineData';

const RegionFilter: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  const uniqueRegions = getUniqueRegions();

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
    <div className="space-y-2">
      {uniqueRegions.map(region => (
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
      ))}
    </div>
  );
};

export default RegionFilter;
