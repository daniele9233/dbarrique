
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterRegionProps {
  selectedRegions: string[];
  handleRegionToggle: (region: string) => void;
}

// Definisco dei vini italiani per regioni
const italianRegions = [
  { id: "abruzzo", label: "Abruzzo", count: 4 },
  { id: "altoadige", label: "Alto Adige", count: 40 },
  { id: "basilicata", label: "Basilicata", count: 1 },
  { id: "calabria", label: "Calabria", count: 1 },
  { id: "campania", label: "Campania", count: 4 },
  { id: "emiliaromagna", label: "Emilia Romagna", count: 21 },
  { id: "friuli", label: "Friuli Venezia Giulia", count: 6 },
  { id: "lazio", label: "Lazio", count: 6 },
  { id: "toscana", label: "Toscana", count: 32 },
  { id: "veneto", label: "Veneto", count: 28 },
  { id: "piemonte", label: "Piemonte", count: 45 },
  { id: "sicilia", label: "Sicilia", count: 18 },
  { id: "sardegna", label: "Sardegna", count: 14 }
];

const FilterRegion: React.FC<FilterRegionProps> = ({ selectedRegions, handleRegionToggle }) => {
  const [isRegionOpen, setIsRegionOpen] = useState(true);
  
  return (
    <Collapsible open={isRegionOpen} onOpenChange={setIsRegionOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
        <h3 className="text-lg font-serif">Nome regione</h3>
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
