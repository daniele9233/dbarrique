
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterRegionProps {
  selectedRegions: string[];
  handleRegionToggle: (region: string) => void;
}

// Lista completa delle 20 regioni italiane
const italianRegions = [
  { id: "abruzzo", label: "Abruzzo", count: 4 },
  { id: "basilicata", label: "Basilicata", count: 3 },
  { id: "calabria", label: "Calabria", count: 4 },
  { id: "campania", label: "Campania", count: 6 },
  { id: "emilia-romagna", label: "Emilia-Romagna", count: 21 },
  { id: "friuli", label: "Friuli-Venezia Giulia", count: 9 },
  { id: "lazio", label: "Lazio", count: 8 },
  { id: "liguria", label: "Liguria", count: 2 },
  { id: "lombardia", label: "Lombardia", count: 11 },
  { id: "marche", label: "Marche", count: 5 },
  { id: "molise", label: "Molise", count: 1 },
  { id: "piemonte", label: "Piemonte", count: 45 },
  { id: "puglia", label: "Puglia", count: 12 },
  { id: "sardegna", label: "Sardegna", count: 14 },
  { id: "sicilia", label: "Sicilia", count: 18 },
  { id: "toscana", label: "Toscana", count: 42 },
  { id: "trentino", label: "Trentino-Alto Adige", count: 7 },
  { id: "umbria", label: "Umbria", count: 7 },
  { id: "valdaosta", label: "Valle d'Aosta", count: 1 },
  { id: "veneto", label: "Veneto", count: 28 }
];

const FilterRegion: React.FC<FilterRegionProps> = ({ selectedRegions, handleRegionToggle }) => {
  const [isRegionOpen, setIsRegionOpen] = useState(true);
  
  return (
    <Collapsible open={isRegionOpen} onOpenChange={setIsRegionOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
        <h3 className="text-lg font-serif">Regione</h3>
        <span>{isRegionOpen ? '−' : '+'}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {italianRegions.map((region) => (
          <div key={region.id} className="flex items-center space-x-2">
            <Checkbox 
              id={region.id} 
              checked={selectedRegions.includes(region.label)}
              onCheckedChange={() => handleRegionToggle(region.label)}
              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
            />
            <Label 
              htmlFor={region.id} 
              className="text-sm font-normal cursor-pointer flex justify-between w-full"
            >
              <span>{region.label}</span>
              <span className="text-white/40">({region.count})</span>
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterRegion;
