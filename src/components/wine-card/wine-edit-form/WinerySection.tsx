
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface WinerySectionProps {
  winery: string;
  onChange: (value: string) => void;
}

const WinerySection = ({ winery, onChange }: WinerySectionProps) => {
  return (
    <div className="space-y-2">
      <Label>
        Cantina
      </Label>
      <Input
        className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
        placeholder="es. Biondi-Santi"
        value={winery}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default WinerySection;
