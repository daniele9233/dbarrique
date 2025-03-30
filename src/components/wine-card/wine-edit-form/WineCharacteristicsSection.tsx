
import { Label } from "@/components/ui/label";
import { bodyOptions, structureOptions, tanninOptions, sweetnessOptions, aromaOptions } from "@/data/constants/wineConstants";

interface WineCharacteristicsSectionProps {
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
  onChange: (field: string, value: string) => void;
}

const WineCharacteristicsSection = ({ 
  body, 
  structure, 
  tannins, 
  sweetness, 
  aroma, 
  onChange 
}: WineCharacteristicsSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Corpo
          </Label>
          <select 
            className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
            value={body}
            onChange={(e) => onChange('body', e.target.value)}
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
            value={structure}
            onChange={(e) => onChange('structure', e.target.value)}
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
            value={tannins}
            onChange={(e) => onChange('tannins', e.target.value)}
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
            value={sweetness}
            onChange={(e) => onChange('sweetness', e.target.value)}
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
            value={aroma}
            onChange={(e) => onChange('aroma', e.target.value)}
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

export default WineCharacteristicsSection;
