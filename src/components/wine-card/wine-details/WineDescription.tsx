
import React from 'react';

interface WineDescriptionProps {
  description?: string;
}

const WineDescription: React.FC<WineDescriptionProps> = ({ description }) => {
  if (!description) return null;
  
  return (
    <div className="bg-noir-light/50 p-4 rounded-lg border border-white/5">
      <h3 className="text-sm text-white/60 uppercase mb-2">Descrizione</h3>
      <p className="text-sm text-white/90">{description}</p>
    </div>
  );
};

export default WineDescription;
