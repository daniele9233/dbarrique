
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface FormSubmitButtonsProps {
  isSubmitting: boolean;
  isDisabled: boolean;
  onCancel: () => void;
}

const FormSubmitButtons: React.FC<FormSubmitButtonsProps> = ({
  isSubmitting,
  isDisabled,
  onCancel
}) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <Button
        variant="outline"
        onClick={onCancel}
        className="border-white/10 hover:bg-noir hover:text-white"
        type="button"
        disabled={isSubmitting}
      >
        Annulla
      </Button>
      <Button
        className="bg-wine hover:bg-wine-light text-white"
        disabled={isDisabled || isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader className="h-4 w-4 animate-spin" />
            Aggiunta in corso...
          </span>
        ) : (
          "Aggiungi alla Collezione"
        )}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
