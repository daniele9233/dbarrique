
import React from 'react';
import { FilterOptions } from './types';
import WineNetwork from './WineNetwork';

interface NetworkContainerProps {
  isSidebarOpen: boolean;
  filters: FilterOptions;
}

const NetworkContainer: React.FC<NetworkContainerProps> = ({ isSidebarOpen, filters }) => {
  return (
    <div className={`flex-1 transition-all duration-300 ${
      isSidebarOpen ? 'md:ml-6' : 'ml-0'
    }`}>
      <div className="w-full h-full bg-noir-dark rounded-lg overflow-hidden border border-white/10">
        <WineNetwork filters={filters} />
      </div>
    </div>
  );
};

export default NetworkContainer;
