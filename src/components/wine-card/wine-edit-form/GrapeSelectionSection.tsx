
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { grapes } from "@/data/constants/wineConstants";

interface GrapeSelectionSectionProps {
  isBlend: boolean;
  selectedGrape: string;
  selectedGrapes: string[];
  onIsBlendChange: (isBlend: boolean) => void;
  onGrapeChange: (grape: string) => void;
  onGrapeToggle: (grape: string) => void;
}

const GrapeSelectionSection = ({ 
  isBlend, 
  selectedGrape, 
  selectedGrapes,
  onIsBlendChange, 
  onGrapeChange,
  onGrapeToggle 
}: GrapeSelectionSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <Label>
          Vitigno
        </Label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is-blend"
            checked={isBlend}
            onCheckedChange={() => {
              onIsBlendChange(!isBlend);
              if (!isBlend) {
                onGrapeChange('');
              } else {
                // Clear grape selections when switching to single
                onGrapeChange('');
              }
            }}
            className="border-wine data-[state=checked]:bg-wine data-[state=checked]:border-wine"
          />
          <Label
            htmlFor="is-blend"
            className="text-sm cursor-pointer"
          >
            Blend (seleziona più vitigni)
          </Label>
        </div>
      </div>
      
      {isBlend ? (
        <div className="max-h-40 overflow-y-auto pr-2 border border-white/10 rounded-md p-2 bg-noir custom-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {grapes.filter(g => g !== "Blend").map(grape => (
              <div key={grape} className="flex items-center space-x-2">
                <Checkbox 
                  id={`grape-${grape}`}
                  checked={selectedGrapes.includes(grape)}
                  onCheckedChange={() => onGrapeToggle(grape)}
                  className="border-wine data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                />
                <Label 
                  htmlFor={`grape-${grape}`}
                  className="text-sm cursor-pointer"
                >
                  {grape}
                </Label>
              </div>
            ))}
          </div>
          {selectedGrapes.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <p className="text-xs text-white/70">Vitigni selezionati: {selectedGrapes.join(', ')}</p>
            </div>
          )}
        </div>
      ) : (
        <select 
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          value={selectedGrape}
          onChange={(e) => onGrapeChange(e.target.value)}
        >
          <option value="">Seleziona un vitigno</option>
          {grapes.filter(g => g !== "Blend").map(grape => (
            <option key={grape} value={grape}>{grape}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default GrapeSelectionSection;
