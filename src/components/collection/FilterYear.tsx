
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getYears } from "@/data/services/wineService";

interface FilterYearProps {
  selectedYears: number[];
  handleYearToggle: (year: number) => void;
}

const FilterYear: React.FC<FilterYearProps> = ({ selectedYears, handleYearToggle }) => {
  const [isYearOpen, setIsYearOpen] = useState(true);
  const years = getYears();
  
  return (
    <Collapsible open={isYearOpen} onOpenChange={setIsYearOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-medium mb-2">
        <h3 className="text-lg font-serif">Anno</h3>
        <span>{isYearOpen ? '−' : '+'}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {years.map((year) => (
          <div key={year} className="flex items-center space-x-2">
            <Checkbox 
              id={`year-${year}`} 
              checked={selectedYears.includes(year)}
              onCheckedChange={() => handleYearToggle(year)}
              className="border-white/30 data-[state=checked]:bg-wine data-[state=checked]:border-wine"
            />
            <Label 
              htmlFor={`year-${year}`} 
              className="text-sm font-normal cursor-pointer"
            >
              {year}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterYear;
