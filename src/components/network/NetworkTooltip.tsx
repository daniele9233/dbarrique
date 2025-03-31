
import React from 'react';
import { SimulationNode } from './types';

interface NetworkTooltipProps {
  selectedNode: SimulationNode | null;
}

const NetworkTooltip: React.FC<NetworkTooltipProps> = ({ selectedNode }) => {
  if (!selectedNode) return null;

  return (
    <div className="absolute right-4 bottom-4 p-4 bg-noir-dark/80 backdrop-blur-md rounded-lg border border-white/10 shadow-lg max-w-xs w-full">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
          <img src={selectedNode.image} alt={selectedNode.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-serif text-wine text-lg font-medium">{selectedNode.name}</h3>
          <p className="text-white/80 text-sm">{selectedNode.grape}, {selectedNode.year}</p>
          <p className="text-white/70 text-xs">{selectedNode.region}</p>
          <div className="mt-2 flex items-center">
            <span className="text-white/60 text-xs mr-1">Rating:</span>
            <div className="flex">
              {Array.from({ length: 10 }).map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs ${i < selectedNode.rating ? 'text-wine' : 'text-white/30'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex flex-col">
          <span className="text-white/60">Corpo:</span>
          <span className="text-white">{selectedNode.body}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/60">Struttura:</span>
          <span className="text-white">{selectedNode.structure}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/60">Tannini:</span>
          <span className="text-white">{selectedNode.tannins}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/60">Dolcezza:</span>
          <span className="text-white">{selectedNode.sweetness}</span>
        </div>
        <div className="flex flex-col col-span-2">
          <span className="text-white/60">Aroma:</span>
          <span className="text-white">{selectedNode.aroma}</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkTooltip;
