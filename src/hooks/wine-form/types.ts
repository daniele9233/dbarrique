
import { Wine } from "@/data/models/Wine";

export interface WineFormData {
  name: string;
  region: string;
  winery: string;
  year: number;
  rating: number;
  type: Wine['type'];
  image: string;
  grape: string;
  grapes: string[];
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
  description: string;
  pairing?: string;
  storage?: string;
}

export interface WineFormCallbacks {
  onComplete?: (wine: Wine) => void;
  onError?: (error: Error) => void;
}
