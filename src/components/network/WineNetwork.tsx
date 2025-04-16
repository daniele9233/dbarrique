
import { useRef, useState } from 'react';
import { useNetworkDimensions } from './useNetworkDimensions';
import { useNetworkSimulation } from './useNetworkSimulation';
import NetworkNodeTooltip from './NetworkNodeTooltip';
import NetworkTooltip from './NetworkTooltip';
import { FilterOptions, SimulationNode, WineNetworkProps } from './types';

const WineNetwork: React.FC<WineNetworkProps> = ({ filters }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<SimulationNode | null>(null);
  
  // Get dimensions based on container size
  const dimensions = useNetworkDimensions(svgRef);
  
  // Setup D3 simulation with the filtered wines
  const { filteredWines } = useNetworkSimulation(svgRef, tooltipRef, dimensions, filters, setSelectedNode);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(30,30,30,0.4)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20" />
      
      {/* SVG container */}
      <svg 
        ref={svgRef} 
        className="w-full h-full relative z-10" 
        width={dimensions.width} 
        height={dimensions.height}
      />
      
      {/* Stats overlay */}
      {filteredWines.length > 0 && (
        <div className="absolute top-4 left-4 bg-noir/70 backdrop-blur-sm p-2 rounded-md border border-white/10 text-xs text-white/70">
          <p>Vini visualizzati: <span className="text-wine font-medium">{filteredWines.length}</span></p>
        </div>
      )}
      
      {/* Tooltip that follows cursor */}
      <NetworkNodeTooltip tooltipRef={tooltipRef} selectedNode={selectedNode} />
      
      {/* Detailed info panel when a node is selected */}
      {selectedNode && <NetworkTooltip selectedNode={selectedNode} />}
    </div>
  );
};

export default WineNetwork;
