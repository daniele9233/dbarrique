
import React from 'react';

interface WineStorageProps {
  storage?: string;
}

const WineStorage: React.FC<WineStorageProps> = ({ storage }) => {
  if (!storage) return null;
  
  return (
    <div className="bg-noir-light/50 p-4 rounded-lg border border-white/5">
      <h3 className="text-sm text-white/60 uppercase mb-2">Conservazione</h3>
      <p className="text-sm text-white/90">{storage}</p>
    </div>
  );
};

export default WineStorage;
