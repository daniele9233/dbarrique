
import { Label } from "@/components/ui/label";
import { bodyOptions, structureOptions, tanninOptions, sweetnessOptions, aromaOptions } from "@/data/constants/wineConstants";
import { WineFormData } from "@/hooks/useWineForm";

interface CharacteristicsSectionProps {
  wineData: WineFormData;
  handleChange: (field: string, value: string | number | string[]) => void;
}

const CharacteristicsSection: React.FC<CharacteristicsSectionProps> = ({ wineData, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Corpo
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={wineData.body}
            onChange={(e) => handleChange('body', e.target.value)}
          >
            {bodyOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>
            Struttura
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={wineData.structure}
            onChange={(e) => handleChange('structure', e.target.value)}
          >
            {structureOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>
            Tannini
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={wineData.tannins}
            onChange={(e) => handleChange('tannins', e.target.value)}
          >
            {tanninOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>
            Dolcezza
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={wineData.sweetness}
            onChange={(e) => handleChange('sweetness', e.target.value)}
          >
            {sweetnessOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>
            Aromi principali
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={wineData.aroma}
            onChange={(e) => handleChange('aroma', e.target.value)}
          >
            {aromaOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default CharacteristicsSection;
