
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterOccasionProps {
  selectedOccasions: string[];
  handleOccasionToggle: (occasion: string) => void;
}

// Definisco le opzioni per le occasioni
const occasions = [
  { id: "pranzo", label: "Pranzo della domenica", count: 219 },
  { id: "cena", label: "Cena Romantica", count: 1 },
  { id: "giorno", label: "Ogni giorno", count: 192 },
  { id: "importante", label: "Occasione Importante", count: 405 },
  { id: "dopocena", label: "Dopo cena", count: 3 },
  { id: "aperitivo", label: "Aperitivo fra amici", count: 1 }
];

const FilterOccasion: React.FC<FilterOccasionProps> = ({ selectedOccasions, handleOccasionToggle }) => {
  const [isOccasionOpen, setIsOccasionOpen] = useState(true);
  
  return (
    <Collapsible open={isOccasionOpen} onOpenChange={setIsOccasionOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
        <h3 className="text-lg font-serif">Occasioni</h3>
        <span>{isOccasionOpen ? '−' : '+'}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {occasions.map((occasion) => (
          <div key={occasion.id} className="flex items-center space-x-2">
            <Checkbox 
              id={occasion.id} 
              checked={selectedOccasions.includes(occasion.id)}
              onCheckedChange={() => handleOccasionToggle(occasion.id)}
              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
            />
            <Label 
              htmlFor={occasion.id} 
              className="text-sm font-normal cursor-pointer flex justify-between w-full"
            >
              <span>{occasion.label}</span>
              <span className="text-white/40">({occasion.count})</span>
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterOccasion;
