
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { grapes } from "@/data/WineData";

interface FilterGrapeProps {
  selectedGrapes: string[];
  handleGrapeToggle: (grape: string) => void;
}

const FilterGrape: React.FC<FilterGrapeProps> = ({ selectedGrapes, handleGrapeToggle }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-serif mb-3">Vitigno</h3>
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
        {grapes.map((grape) => (
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
      </div>
    </div>
  );
};

export default FilterGrape;
