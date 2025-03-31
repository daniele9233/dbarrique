
import React, { createContext, useContext, useState } from 'react';
import { FilterOptions } from '../types';

interface FilterContextType {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

interface FilterProviderProps {
  children: ((contextValue: FilterContextType) => React.ReactNode) | React.ReactNode;
  initialFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ 
  children, 
  initialFilters,
  onFilterChange 
}) => {
  const [filters, setFiltersState] = useState<FilterOptions>(initialFilters);

  const setFilters = (newFilters: FilterOptions) => {
    setFiltersState(newFilters);
    onFilterChange(newFilters);
  };

  const contextValue = { filters, setFilters };

  return (
    <FilterContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </FilterContext.Provider>
  );
};
