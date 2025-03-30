
export interface Wine {
  id: string;
  name: string;
  region: string;
  winery?: string;
  year: number;
  rating: number;
  type: "red" | "white" | "rosé" | "sparkling";
  image: string;
  grape: string;
  grapes?: string[];
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
}
