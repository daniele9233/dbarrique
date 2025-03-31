
import { FilterOptions, SimulationNode } from '../types';
import { getNetworkWines } from '@/data/NetworkWineData';

/**
 * Filters wine data based on user-selected filter options
 */
export function filterWinesByOptions(filters: FilterOptions) {
  const networkWines = getNetworkWines();

  return networkWines.filter(wine => {
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
}

/**
 * Transforms filtered wine data into simulation nodes and links
 */
export function createNodesAndLinks(filteredWines: ReturnType<typeof getNetworkWines>) {
  // Create nodes from filtered wines
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

  // Create links between related wines
  const links = filteredWines.flatMap(wine => {
    const sourceId = wine.id;
    return wine.connections
      .filter(targetId => filteredWines.some(w => w.id === targetId))
      .map(targetId => ({
        source: sourceId,
        target: targetId,
        strength: 0.2
      }));
  });

  return { nodes, links };
}
