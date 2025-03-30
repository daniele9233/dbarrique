
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isDisabled: boolean;
}

const FormActions = ({ onCancel, onSave, isDisabled }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <Button
        variant="outline"
        onClick={onCancel}
        className="border-white/10 hover:bg-noir hover:text-white"
      >
        Annulla
      </Button>
      <Button
        onClick={onSave}
        className="bg-wine hover:bg-wine-light"
        disabled={isDisabled}
      >
        Salva Modifiche
      </Button>
    </div>
  );
};

export default FormActions;
