
import { Dispatch, SetStateAction, useCallback } from 'react';
import { WineFormData, WineFormCallbacks } from './types';
import { validateWineForm } from './utils/formUtils';
import { prepareWineData } from './utils/wineDataPreparation';
import { setupUITimeout, performWineSubmission } from './utils/submissionHandlers';
import { toast } from "@/hooks/use-toast";

export const useWineFormActions = (
  newWine: WineFormData,
  isSubmitting: boolean,
  setNewWine: Dispatch<SetStateAction<WineFormData>>,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  setIsBlend: Dispatch<SetStateAction<boolean>>,
  fileInputRef: React.RefObject<HTMLInputElement>,
  callbacks: WineFormCallbacks
) => {
  const handleChange = useCallback((field: string, value: string | number | string[]) => {
    setNewWine(prev => ({
      ...prev,
      [field]: value
    }));
  }, [setNewWine]);
  
  const handleGrapeToggle = useCallback((grape: string) => {
    setNewWine(prev => {
      const updatedGrapes = prev.grapes.includes(grape)
        ? prev.grapes.filter(g => g !== grape)
        : [...prev.grapes, grape];
      
      return {
        ...prev,
        grapes: updatedGrapes
      };
    });
  }, [setNewWine]);
  
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleChange('image', e.target.result as string);
        toast({
          title: "Immagine caricata",
          description: "L'immagine del vino è stata caricata con successo.",
        });
      }
    };
    reader.readAsDataURL(file);
  }, [handleChange]);
  
  const resetForm = useCallback(() => {
    setNewWine({
      name: "",
      region: "",
      winery: "",
      year: new Date().getFullYear(),
      rating: 5,
      type: "red",
      image: "",
      grape: "",
      grapes: [],
      body: "Medio",
      structure: "Equilibrato",
      tannins: "Equilibrato",
      sweetness: "Secco",
      aroma: "Fruttato",
      description: "",
      pairing: "",
      storage: ""
    });
    setIsBlend(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setNewWine, setIsBlend, fileInputRef]);
  
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) {
      console.log("useWineFormActions: Already submitting, ignoring additional submit request");
      return;
    }
    
    if (!validateWineForm(newWine)) {
      return;
    }
    
    let submissionTimeout: NodeJS.Timeout | null = null;
    
    try {
      setIsSubmitting(true);
      console.log("useWineFormActions: Inizio aggiunta del vino", newWine);
      
      submissionTimeout = setupUITimeout(setIsSubmitting, callbacks);
      const wineToAdd = prepareWineData(newWine);
      
      await performWineSubmission(
        wineToAdd,
        submissionTimeout,
        setIsSubmitting,
        callbacks,
        resetForm
      );
    } catch (error) {
      console.error('Errore durante l\'aggiunta del vino:', error);
      
      if (submissionTimeout) {
        clearTimeout(submissionTimeout);
      }
      
      setIsSubmitting(false);
      
      const errorMsg = error instanceof Error ? error.message : "Errore sconosciuto";
      toast({
        title: "Errore",
        description: `Impossibile aggiungere il vino: ${errorMsg}`,
        variant: "destructive"
      });
      
      if (callbacks.onError) {
        callbacks.onError(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }, [
    isSubmitting,
    newWine,
    setIsSubmitting,
    callbacks,
    resetForm
  ]);

  return {
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    handleSubmit,
    resetForm,
  };
};
