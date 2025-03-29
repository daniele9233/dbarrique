
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WineFormData } from "@/hooks/useWineForm";

interface YearRatingSectionProps {
  wineData: WineFormData;
  handleChange: (field: string, value: string | number | string[]) => void;
}

const YearRatingSection: React.FC<YearRatingSectionProps> = ({ wineData, handleChange }) => {
  const renderRatingInput = () => {
    return (
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="1"
          max="10"
          value={wineData.rating}
          onChange={(e) => handleChange('rating', parseInt(e.target.value))}
          className="w-full h-2 bg-noir rounded-lg appearance-none cursor-pointer accent-wine"
        />
        <span className="text-white font-medium">{wineData.rating}/10</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>
          Anno
        </Label>
        <Input
          type="number"
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          placeholder="es. 2015"
          value={wineData.year || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? '' : parseInt(e.target.value);
            handleChange('year', value || new Date().getFullYear());
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Valutazione (1-10)
        </Label>
        {renderRatingInput()}
      </div>
    </div>
  );
};

export default YearRatingSection;
