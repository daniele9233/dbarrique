
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterRefinementProps {
  selectedRefinements: string[];
  handleRefinementToggle: (refinement: string) => void;
}

// Definisco le opzioni per l'affinamento
const refinements = [
  { id: "acciaio", label: "Acciaio", count: 106 },
  { id: "anfora", label: "Anfora", count: 1 },
  { id: "cemento", label: "Cemento", count: 13 },
  { id: "legnogrande", label: "Legno grande", count: 335 },
  { id: "legnopiccolo", label: "Legno piccolo", count: 563 },
  { id: "surlieviti", label: "Sui lieviti", count: 3 }
];

const FilterRefinement: React.FC<FilterRefinementProps> = ({ selectedRefinements, handleRefinementToggle }) => {
  const [isRefinementOpen, setIsRefinementOpen] = useState(true);
  
  return (
    <Collapsible open={isRefinementOpen} onOpenChange={setIsRefinementOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
        <h3 className="text-lg font-serif">Affinamento</h3>
        <span>{isRefinementOpen ? '−' : '+'}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {refinements.map((refinement) => (
          <div key={refinement.id} className="flex items-center space-x-2">
            <Checkbox 
              id={refinement.id} 
              checked={selectedRefinements.includes(refinement.id)}
              onCheckedChange={() => handleRefinementToggle(refinement.id)}
              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
            />
            <Label 
              htmlFor={refinement.id} 
              className="text-sm font-normal cursor-pointer flex justify-between w-full"
            >
              <span>{refinement.label}</span>
              <span className="text-white/40">({refinement.count})</span>
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterRefinement;
