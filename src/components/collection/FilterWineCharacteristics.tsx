
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FilterWineCharacteristicsProps {
  selectedBody: string | null;
  selectedStructure: string | null;
  selectedTannins: string | null;
  selectedSweetness: string | null;
  selectedAroma: string | null;
  setSelectedBody: (value: string | null) => void;
  setSelectedStructure: (value: string | null) => void;
  setSelectedTannins: (value: string | null) => void;
  setSelectedSweetness: (value: string | null) => void;
  setSelectedAroma: (value: string | null) => void;
}

const bodyOptions = ["Leggero", "Medio", "Corposo"];
const structureOptions = ["Elegante", "Equilibrato", "Strutturato"];
const tanninOptions = ["Morbido", "Equilibrato", "Tannico"];
const sweetnessOptions = ["Secco", "Amabile", "Dolce"];
const aromaOptions = ["Fruttato", "Speziato", "Evoluto"];

const FilterWineCharacteristics: React.FC<FilterWineCharacteristicsProps> = ({
  selectedBody,
  selectedStructure,
  selectedTannins,
  selectedSweetness,
  selectedAroma,
  setSelectedBody,
  setSelectedStructure,
  setSelectedTannins,
  setSelectedSweetness,
  setSelectedAroma
}) => {
  const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(true);
  
  return (
    <Collapsible open={isCharacteristicsOpen} onOpenChange={setIsCharacteristicsOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
        <h3 className="text-lg font-serif">Caratteristiche Vino</h3>
        <span>{isCharacteristicsOpen ? '−' : '+'}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        {/* Corpo */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Corpo</h4>
          <ToggleGroup 
            type="single" 
            className="justify-start"
            value={selectedBody || ""}
            onValueChange={(value) => setSelectedBody(value || null)}
          >
            {bodyOptions.map((option) => (
              <ToggleGroupItem 
                key={option} 
                value={option} 
                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
              >
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {/* Struttura */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Struttura</h4>
          <ToggleGroup 
            type="single" 
            className="justify-start"
            value={selectedStructure || ""}
            onValueChange={(value) => setSelectedStructure(value || null)}
          >
            {structureOptions.map((option) => (
              <ToggleGroupItem 
                key={option} 
                value={option} 
                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
              >
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {/* Tannini */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Tannini</h4>
          <ToggleGroup 
            type="single" 
            className="justify-start"
            value={selectedTannins || ""}
            onValueChange={(value) => setSelectedTannins(value || null)}
          >
            {tanninOptions.map((option) => (
              <ToggleGroupItem 
                key={option} 
                value={option} 
                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
              >
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {/* Dolcezza */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Dolcezza</h4>
          <ToggleGroup 
            type="single" 
            className="justify-start"
            value={selectedSweetness || ""}
            onValueChange={(value) => setSelectedSweetness(value || null)}
          >
            {sweetnessOptions.map((option) => (
              <ToggleGroupItem 
                key={option} 
                value={option} 
                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
              >
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {/* Aromi principali */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Aromi principali</h4>
          <ToggleGroup 
            type="single" 
            className="justify-start"
            value={selectedAroma || ""}
            onValueChange={(value) => setSelectedAroma(value || null)}
          >
            {aromaOptions.map((option) => (
              <ToggleGroupItem 
                key={option} 
                value={option} 
                className="bg-transparent border border-white/10 data-[state=on]:bg-wine data-[state=on]:border-wine"
              >
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterWineCharacteristics;
