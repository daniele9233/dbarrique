
import { useState, useEffect, RefObject } from 'react';
import * as d3 from 'd3';
import { getNetworkWines } from '@/data/NetworkWineData';
import { FilterOptions, SimulationNode, SimulationLink } from './types';

export function useNetworkSimulation(
  svgRef: RefObject<SVGSVGElement>,
  tooltipRef: RefObject<HTMLDivElement>,
  dimensions: { width: number, height: number },
  filters: FilterOptions,
  setSelectedNode: (node: SimulationNode | null) => void
) {
  const networkWines = getNetworkWines();

  const filteredWines = networkWines.filter(wine => {
    const grapeMatch = filters.grapes.length === 0 || filters.grapes.includes(wine.grape);
    const regionMatch = filters.regions.length === 0 || filters.regions.includes(wine.region);
    
    const bodyMatch = filters.characteristics.body.length === 0 || 
                      filters.characteristics.body.includes(wine.body);
                      
    const structureMatch = filters.characteristics.structure.length === 0 || 
                          filters.characteristics.structure.includes(wine.structure);
                          
    const tanninsMatch = filters.characteristics.tannins.length === 0 || 
                         filters.characteristics.tannins.includes(wine.tannins);
                         
    const sweetnessMatch = filters.characteristics.sweetness.length === 0 || 
                           filters.characteristics.sweetness.includes(wine.sweetness);
                           
    const aromaMatch = filters.characteristics.aroma.length === 0 || 
                      filters.characteristics.aroma.includes(wine.aroma);
    
    const characteristicsMatch = bodyMatch && structureMatch && tanninsMatch && 
                                sweetnessMatch && aromaMatch;
    
    return grapeMatch && regionMatch && characteristicsMatch;
  });

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    d3.select(svgRef.current).selectAll("*").remove();

    if (filteredWines.length === 0) return;

    const nodes: SimulationNode[] = filteredWines.map(wine => ({
      id: wine.id,
      radius: wine.radius,
      color: wine.color,
      name: wine.name,
      grape: wine.grape,
      region: wine.region,
      year: wine.year,
      rating: wine.rating,
      body: wine.body,
      structure: wine.structure,
      tannins: wine.tannins,
      sweetness: wine.sweetness,
      aroma: wine.aroma,
      image: wine.image
    }));

    const links: SimulationLink[] = [];
    filteredWines.forEach(wine => {
      const sourceId = wine.id;
      wine.connections.forEach(targetId => {
        if (filteredWines.some(w => w.id === targetId)) {
          links.push({
            source: sourceId,
            target: targetId,
            strength: 0.2
          });
        }
      });
    });

    const svg = d3.select(svgRef.current);
    
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
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("fill", "url(#network-bg-gradient)");

    // Setup simulation
    const simulation = d3.forceSimulation<SimulationNode, SimulationLink>(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("collide", d3.forceCollide<SimulationNode>().radius(d => d.radius * 1.2))
      .force("link", d3.forceLink<SimulationNode, SimulationLink>(links).id(d => d.id))
      .on("tick", ticked);

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
      .call(d3.drag<SVGCircleElement, SimulationNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Node interactions
    node
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
        setSelectedNode(d);
        event.stopPropagation();
      });

    // Update positions on tick
    function ticked() {
      link
        .attr("x1", d => (d.source as SimulationNode).x!)
        .attr("y1", d => (d.source as SimulationNode).y!)
        .attr("x2", d => (d.target as SimulationNode).x!)
        .attr("y2", d => (d.target as SimulationNode).y!);

      node
        .attr("cx", d => Math.max(d.radius, Math.min(dimensions.width - d.radius, d.x!)))
        .attr("cy", d => Math.max(d.radius, Math.min(dimensions.height - d.radius, d.y!)));
    }

    // Drag handlers
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Reset selected node when clicking on background
    svg.on("click", () => {
      setSelectedNode(null);
    });

    return () => {
      simulation.stop();
    };
  }, [filteredWines, dimensions, setSelectedNode]);

  return { filteredWines };
}
