
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WineFormData } from "@/hooks/useWineForm";

interface BasicInfoSectionProps {
  wineData: WineFormData;
  handleChange: (field: string, value: string | number | string[]) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ wineData, handleChange }) => {
  return (
    <>
      <div className="space-y-2">
        <Label>
          Nome del Vino *
        </Label>
        <Input
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          placeholder="es. Brunello di Montalcino"
          value={wineData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Cantina
        </Label>
        <Input
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          placeholder="es. Biondi-Santi"
          value={wineData.winery}
          onChange={(e) => handleChange('winery', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Regione
        </Label>
        <Input
          className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
          placeholder="es. Toscana, Italia"
          value={wineData.region}
          onChange={(e) => handleChange('region', e.target.value)}
        />
      </div>
    </>
  );
};

export default BasicInfoSection;
