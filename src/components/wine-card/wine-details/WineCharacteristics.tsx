
import React from 'react';
import { Wine } from '@/data/models/Wine';

interface WineCharacteristicsProps {
  wine: Wine;
}

const WineCharacteristics: React.FC<WineCharacteristicsProps> = ({ wine }) => {
  return (
    <div className="bg-noir-light/50 p-4 rounded-lg border border-white/5">
      <h3 className="text-sm text-white/60 uppercase mb-2">Caratteristiche</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span className="text-white/60">Corpo:</span>
        <span>{wine.body || "Non specificato"}</span>
        
        <span className="text-white/60">Struttura:</span>
        <span>{wine.structure || "Non specificato"}</span>
        
        <span className="text-white/60">Tannini:</span>
        <span>{wine.tannins || "Non specificato"}</span>
        
        <span className="text-white/60">Dolcezza:</span>
        <span>{wine.sweetness || "Non specificato"}</span>
        
        <span className="text-white/60">Aroma:</span>
        <span>{wine.aroma || "Non specificato"}</span>
      </div>
    </div>
  );
};

export default WineCharacteristics;
