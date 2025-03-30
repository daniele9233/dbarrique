import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { grapes } from "@/data/constants/wineConstants";

interface FilterGrapeProps {
  selectedGrapes: string[];
  handleGrapeToggle: (grape: string) => void;
}

const FilterGrape: React.FC<FilterGrapeProps> = ({ selectedGrapes, handleGrapeToggle }) => {
  const [isGrapeOpen, setIsGrapeOpen] = useState(true);
  const [grapeSearch, setGrapeSearch] = useState("");
  
  const filteredGrapes = grapes.filter(grape => 
    grape.toLowerCase().includes(grapeSearch.toLowerCase())
  );
  
  return (
    <Collapsible open={isGrapeOpen} onOpenChange={setIsGrapeOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
        <h3 className="text-lg font-serif">Vitigno</h3>
        <span>{isGrapeOpen ? '−' : '+'}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mb-3 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/40" />
          <Input
            placeholder="Cerca vitigno..."
            className="pl-8 bg-noir border-white/10 focus:border-wine"
            value={grapeSearch}
            onChange={(e) => setGrapeSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredGrapes.map((grape) => (
            <div key={grape} className="flex items-center space-x-2">
              <Checkbox 
                id={`grape-${grape}`} 
                checked={selectedGrapes.includes(grape)}
                onCheckedChange={() => handleGrapeToggle(grape)}
                className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
              />
              <Label 
                htmlFor={`grape-${grape}`} 
                className="text-sm font-normal cursor-pointer"
              >
                {grape}
              </Label>
            </div>
          ))}
          {filteredGrapes.length === 0 && (
            <p className="text-sm text-white/50 py-2">Nessun vitigno trovato.</p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterGrape;
