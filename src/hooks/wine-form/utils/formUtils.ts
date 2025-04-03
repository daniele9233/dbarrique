
import { toast } from "@/hooks/use-toast";
import { WineFormData } from '../types';

export const showErrorToast = (message: string): void => {
  toast({
    title: "Errore",
    description: message,
    variant: "destructive"
  });
};

export const showSuccessToast = (wineName: string): void => {
  toast({
    title: "Successo",
    description: `${wineName} è stato aggiunto alla collezione con successo.`
  });
};

export const validateWineForm = (newWine: WineFormData): boolean => {
  if (!newWine.name || newWine.name.trim() === "") {
    showErrorToast("Il nome del vino è obbligatorio.");
    return false;
  }
  return true;
};
