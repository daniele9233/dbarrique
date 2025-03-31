
import * as d3 from 'd3';

export interface FilterOptions {
  grapes: string[];
  regions: string[];
  characteristics: {
    body: string[];
    structure: string[];
    tannins: string[];
    sweetness: string[];
    aroma: string[];
  };
}

export interface SimulationNode extends d3.SimulationNodeDatum {
  id: string;
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

export interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: SimulationNode | string | number;
  target: SimulationNode | string | number;
  strength?: number;
}

export interface WineNetworkProps {
  wines?: any[];
  filters: FilterOptions;
}
