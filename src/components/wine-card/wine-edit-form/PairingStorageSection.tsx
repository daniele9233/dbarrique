
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PairingStorageSectionProps {
  pairing: string;
  storage: string;
  onPairingChange: (value: string) => void;
  onStorageChange: (value: string) => void;
}

const PairingStorageSection = ({ 
  pairing, 
  storage, 
  onPairingChange, 
  onStorageChange 
}: PairingStorageSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>
          Abbinamenti Consigliati
        </Label>
        <Input 
          value={pairing}
          onChange={(e) => onPairingChange(e.target.value)}
          className="bg-noir border-white/20 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Conservazione
        </Label>
        <Input 
          value={storage}
          onChange={(e) => onStorageChange(e.target.value)}
          className="bg-noir border-white/20 text-white"
        />
      </div>
    </>
  );
};

export default PairingStorageSection;
