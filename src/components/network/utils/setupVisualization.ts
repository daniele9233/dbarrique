
import * as d3 from 'd3';
import { SimulationNode, SimulationLink } from '../types';

/**
 * Creates the SVG background with gradient
 */
export function setupSvgBackground(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number
) {
  // Create gradient background
  const defs = svg.append("defs");
  const gradient = defs.append("radialGradient")
    .attr("id", "network-bg-gradient")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%");
    
  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "rgba(30, 30, 30, 1)");
    
  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "rgba(0, 0, 0, 1)");
  
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "url(#network-bg-gradient)");
}

/**
 * Sets up the D3 force simulation
 */
export function setupSimulation(
  nodes: SimulationNode[],
  links: SimulationLink[],
  width: number,
  height: number,
  tickHandler: () => void
) {
  return d3.forceSimulation<SimulationNode, SimulationLink>(nodes)
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide<SimulationNode>().radius(d => d.radius * 1.2))
    .force("link", d3.forceLink<SimulationNode, SimulationLink>(links).id(d => d.id))
    .on("tick", tickHandler);
}

/**
 * Creates drag behavior for nodes
 */
export function createDragBehavior(simulation: d3.Simulation<SimulationNode, SimulationLink>) {
  return d3.drag<SVGCircleElement, SimulationNode>()
    .on("start", (event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    })
    .on("drag", (event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    })
    .on("end", (event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    });
}
