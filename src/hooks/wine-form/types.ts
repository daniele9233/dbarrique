
import { WineType } from "@/data/models/Wine";

export interface WineFormData {
  id?: string;
  name: string;
  region: string;
  winery: string;
  year: number;
  rating: number;
  type: WineType;
  image: string;
  grape: string;
  grapes: string[];
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
  description: string;
  pairing: string; // Making sure this is not optional to match WineCreationData
  storage: string; // Making sure this is not optional to match WineCreationData
}

export interface WineFormCallbacks {
  onComplete?: (wine: any) => void;
  onError?: (error: Error) => void;
}
