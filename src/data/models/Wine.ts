
// Core wine entity interfaces

// Type for wine variety
export type WineType = "red" | "white" | "rosé" | "sparkling";

// Basic wine information
export interface WineBasicInfo {
  id: string;
  name: string;
  region: string;
  winery: string;
  year: number;
  type: WineType;
  image: string;
}

// Wine characteristics
export interface WineCharacteristics {
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
}

// Wine taste profile
export interface WineTasteProfile {
  grape: string;
  grapes: string[];
  description: string;
  pairing: string;
  storage: string;
}

// Wine rating
export interface WineRating {
  rating: number;
}

// Complete Wine entity combining all aspects
export interface Wine extends 
  WineBasicInfo, 
  WineCharacteristics, 
  WineTasteProfile, 
  WineRating {}

// Type for creating a new wine (without ID)
export type WineCreationData = Omit<Wine, 'id'>;

// Wine with optional properties for form handling
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
  pairing: string;
  storage: string;
}
