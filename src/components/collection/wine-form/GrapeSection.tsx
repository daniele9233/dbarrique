
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { grapes } from "@/data/WineData";
import { WineFormData } from "@/hooks/useWineForm";

interface GrapeSectionProps {
  wineData: WineFormData;
  isBlend: boolean;
  setIsBlend: (isBlend: boolean) => void;
  handleChange: (field: string, value: string | number | string[]) => void;
  handleGrapeToggle: (grape: string) => void;
}

const GrapeSection: React.FC<GrapeSectionProps> = ({ 
  wineData, 
  isBlend, 
  setIsBlend, 
  handleChange, 
  handleGrapeToggle 
}) => {
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
              setIsBlend(!isBlend);
              if (!isBlend) {
                handleChange('grape', ''); // Clear single grape selection when switching to blend
              } else {
                handleChange('grapes', []); // Clear blend selections when switching to single
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
                  checked={wineData.grapes.includes(grape)}
                  onCheckedChange={() => handleGrapeToggle(grape)}
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
          {wineData.grapes.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <p className="text-xs text-white/70">Vitigni selezionati: {wineData.grapes.join(', ')}</p>
            </div>
          )}
        </div>
      ) : (
        <select 
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          value={wineData.grape}
          onChange={(e) => handleChange('grape', e.target.value)}
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

export default GrapeSection;
