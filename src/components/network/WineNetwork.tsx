
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
  useNetworkSimulation(svgRef, tooltipRef, dimensions, filters, setSelectedNode);

  return (
    <div className="relative w-full h-full">
      <svg 
        ref={svgRef} 
        className="w-full h-full" 
        width={dimensions.width} 
        height={dimensions.height}
      />
      
      {/* Tooltip that follows cursor */}
      <NetworkNodeTooltip tooltipRef={tooltipRef} selectedNode={selectedNode} />
      
      {/* Detailed info panel when a node is selected */}
      {selectedNode && <NetworkTooltip selectedNode={selectedNode} />}
    </div>
  );
};

export default WineNetwork;
