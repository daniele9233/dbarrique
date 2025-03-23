
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NetworkWine } from '@/data/NetworkWineData';
import { FilterOptions } from './NetworkFilter';

interface WineNetworkProps {
  wines: NetworkWine[];
  filters: FilterOptions;
}

interface SimulationNode extends d3.SimulationNodeDatum {
  id: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  radius: number;
  color: string;
  name: string;
  grape: string;
  region: string;
  year: number;
  rating: number;
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
  image: string;
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: SimulationNode | string | number;
  target: SimulationNode | string | number;
  strength?: number;
}

const WineNetwork: React.FC<WineNetworkProps> = ({ wines, filters }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNode, setSelectedNode] = useState<SimulationNode | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        const { width, height } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Filtra i vini in base ai filtri selezionati
  const filteredWines = wines.filter(wine => {
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

    // Pulisci il grafico precedente
    d3.select(svgRef.current).selectAll("*").remove();

    if (filteredWines.length === 0) return;

    // Prepara i nodi e i collegamenti per la simulazione
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

    // Crea i collegamenti solo tra i nodi filtrati
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

    // Configura la simulazione
    const simulation = d3.forceSimulation<SimulationNode, SimulationLink>(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("collide", d3.forceCollide<SimulationNode>().radius(d => d.radius * 1.2))
      .force("link", d3.forceLink<SimulationNode, SimulationLink>(links).id(d => d.id))
      .on("tick", ticked);

    // Crea gli elementi SVG
    const svg = d3.select(svgRef.current);
    
    // Aggiungi uno sfondo con gradiente
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

    // Disegna i collegamenti
    const link = svg.append("g")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 1);

    // Disegna i nodi
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

    // Aggiungi interattività
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

    // Funzione per aggiornare la posizione degli elementi ad ogni tick della simulazione
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

    // Funzioni per gestire il drag & drop
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

    // Chiudi il pannello dei dettagli quando si fa clic sullo sfondo
    svg.on("click", () => {
      setSelectedNode(null);
    });

    return () => {
      simulation.stop();
    };
  }, [filteredWines, dimensions]);

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" width={dimensions.width} height={dimensions.height}></svg>
      
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
      
      {selectedNode && (
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
      )}
    </div>
  );
};

export default WineNetwork;
