
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionSectionProps {
  description: string;
  onChange: (value: string) => void;
}

const DescriptionSection = ({ description, onChange }: DescriptionSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>
        Descrizione
      </Label>
      <Textarea 
        value={description}
        onChange={(e) => onChange(e.target.value)}
        className="bg-noir border-white/20 text-white h-24"
      />
    </div>
  );
};

export default DescriptionSection;
