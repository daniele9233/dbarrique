
import { useState, useEffect, RefObject } from 'react';
import * as d3 from 'd3';
import { FilterOptions, SimulationNode, SimulationLink } from './types';
import { filterWinesByOptions, createNodesAndLinks } from './utils/filterWines';
import { setupSvgBackground, setupSimulation, createDragBehavior } from './utils/setupVisualization';
import { setupNodeInteractions, createTickHandler } from './utils/nodeInteractions';

export function useNetworkSimulation(
  svgRef: RefObject<SVGSVGElement>,
  tooltipRef: RefObject<HTMLDivElement>,
  dimensions: { width: number, height: number },
  filters: FilterOptions,
  setSelectedNode: (node: SimulationNode | null) => void
) {
  const [filteredWines, setFilteredWines] = useState(filterWinesByOptions(filters));

  useEffect(() => {
    setFilteredWines(filterWinesByOptions(filters));
  }, [filters]);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    if (filteredWines.length === 0) return;

    const { nodes, links } = createNodesAndLinks(filteredWines);
    const svg = d3.select(svgRef.current);
    
    // Setup visualization background
    setupSvgBackground(svg, dimensions.width, dimensions.height);

    // Add links
    const link = svg.append("g")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 1);

    // Add nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.3)
      .call(createDragBehavior(undefined as any) as any); // Will be set after simulation is created

    // Create tick handler
    const tickHandler = createTickHandler(link, node, dimensions.width, dimensions.height);
    
    // Create simulation
    const simulation = setupSimulation(nodes, links, dimensions.width, dimensions.height, tickHandler);
    
    // Now that we have the simulation, update the drag behavior
    node.call(createDragBehavior(simulation) as any);
    
    // Add node interactions
    setupNodeInteractions(node, tooltipRef, setSelectedNode);

    // Reset selected node when clicking on background
    svg.on("click", () => {
      setSelectedNode(null);
    });

    return () => {
      simulation.stop();
    };
  }, [filteredWines, dimensions, tooltipRef, svgRef, setSelectedNode]);

  return { filteredWines };
}
