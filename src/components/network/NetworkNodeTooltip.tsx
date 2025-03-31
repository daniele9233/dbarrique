
import React from 'react';
import { SimulationNode } from './types';

interface NetworkNodeTooltipProps {
  tooltipRef: React.RefObject<HTMLDivElement>;
  selectedNode: SimulationNode | null;
}

const NetworkNodeTooltip: React.FC<NetworkNodeTooltipProps> = ({ tooltipRef, selectedNode }) => {
  return (
    <div 
      ref={tooltipRef} 
      className="hidden absolute bg-noir-dark/80 backdrop-blur-md rounded-md p-3 shadow-lg border border-white/10 text-white/90 text-sm z-50 max-w-xs pointer-events-none"
    >
      {selectedNode && (
        <>
          <div className="font-serif text-wine text-lg font-medium">{selectedNode.name}</div>
          <div className="text-white/80 text-xs">{selectedNode.grape}, {selectedNode.year}</div>
          <div className="text-white/70 text-xs">{selectedNode.region}</div>
        </>
      )}
    </div>
  );
};

export default NetworkNodeTooltip;
