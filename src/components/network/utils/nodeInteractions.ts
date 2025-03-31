
import * as d3 from 'd3';
import { SimulationNode } from '../types';

/**
 * Sets up node interactions: hover effects, tooltips, and click handling
 */
export function setupNodeInteractions(
  nodeSelection: d3.Selection<SVGCircleElement, SimulationNode, SVGGElement, unknown>,
  tooltipRef: React.RefObject<HTMLDivElement>,
  onNodeSelect: (node: SimulationNode | null) => void
) {
  nodeSelection
    .on("mouseover", (event, d) => {
      d3.select(event.currentTarget)
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 1);
        
      const tooltip = d3.select(tooltipRef.current);
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`);
    })
    .on("mousemove", (event, d) => {
      const tooltip = d3.select(tooltipRef.current);
      tooltip
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY + 15}px`);
    })
    .on("mouseout", (event, d) => {
      d3.select(event.currentTarget)
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.3);
        
      d3.select(tooltipRef.current)
        .style("display", "none");
    })
    .on("click", (event, d) => {
      onNodeSelect(d);
      event.stopPropagation();
    });

  return nodeSelection;
}

/**
 * Updates the positions of nodes and links on each simulation tick
 */
export function createTickHandler(
  linkSelection: d3.Selection<SVGLineElement, SimulationLink, SVGGElement, unknown>,
  nodeSelection: d3.Selection<SVGCircleElement, SimulationNode, SVGGElement, unknown>,
  width: number,
  height: number
) {
  return function ticked() {
    linkSelection
      .attr("x1", d => (d.source as SimulationNode).x!)
      .attr("y1", d => (d.source as SimulationNode).y!)
      .attr("x2", d => (d.target as SimulationNode).x!)
      .attr("y2", d => (d.target as SimulationNode).y!);

    nodeSelection
      .attr("cx", d => Math.max(d.radius, Math.min(width - d.radius, d.x!)))
      .attr("cy", d => Math.max(d.radius, Math.min(height - d.radius, d.y!)));
  };
}
