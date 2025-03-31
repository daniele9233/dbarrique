
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionSectionProps {
  description: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DescriptionSection = ({ description, onChange, placeholder = "Inserisci una descrizione del vino..." }: DescriptionSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>
        Descrizione
      </Label>
      <Textarea 
        value={description || ""}
        onChange={(e) => onChange(e.target.value)}
        className="bg-noir border-white/20 text-white h-24"
        placeholder={placeholder}
      />
    </div>
  );
};

export default DescriptionSection;
