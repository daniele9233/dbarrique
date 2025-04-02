
import { Dispatch, SetStateAction, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { addWine } from "@/data/services/wine/wineOperations";
import { WineFormData, WineFormCallbacks } from './types';

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
    
    // Validate form
    if (!newWine.name || newWine.name.trim() === "") {
      toast({
        title: "Errore",
        description: "Il nome del vino è obbligatorio.",
        variant: "destructive"
      });
      return;
    }
    
    let submissionTimeout: NodeJS.Timeout | null = null;
    
    try {
      setIsSubmitting(true);
      console.log("useWineFormActions: Inizio aggiunta del vino", newWine);
      
      // Set a UI timeout to ensure we don't get stuck in loading state
      submissionTimeout = setTimeout(() => {
        console.log("useWineFormActions: UI timeout triggered");
        setIsSubmitting(false);
        toast({
          title: "Errore",
          description: "L'operazione sta impiegando troppo tempo. Riprova più tardi.",
          variant: "destructive"
        });
        // Call error callback if provided
        if (callbacks.onError) {
          callbacks.onError(new Error("UI timeout"));
        }
        resetForm();
      }, 20000); // 20 seconds UI timeout
      
      // Prepare data
      const wineToAdd = {
        ...newWine,
        type: newWine.type || "red",
        region: newWine.region || "Non specificata",
        winery: newWine.winery || "Non specificata",
        grape: newWine.grape || "Non specificato",
        grapes: newWine.grapes.length > 0 ? newWine.grapes : [],
        description: newWine.description || "",
        pairing: newWine.pairing || "",
        storage: newWine.storage || "",
        image: newWine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      };
      
      console.log("useWineFormActions: Chiamando addWine con", wineToAdd);
      
      // Add wine to Firestore
      const addedWine = await addWine(wineToAdd);
      
      // Clear the UI timeout since operation completed
      if (submissionTimeout) {
        clearTimeout(submissionTimeout);
        submissionTimeout = null;
      }
      
      console.log("useWineFormActions: Vino aggiunto con successo", addedWine);
      
      if (addedWine) {
        toast({
          title: "Successo",
          description: "Vino aggiunto alla collezione con successo."
        });
        
        // Reset form immediately to avoid state issues
        resetForm();
        
        // Reset submitting state
        setIsSubmitting(false);
        
        // Call completion callback if provided
        if (callbacks.onComplete) {
          callbacks.onComplete(addedWine);
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Errore sconosciuto";
      
      // Clear the UI timeout since operation errored
      if (submissionTimeout) {
        clearTimeout(submissionTimeout);
        submissionTimeout = null;
      }
      
      console.error('Errore durante l\'aggiunta del vino:', error);
      toast({
        title: "Errore",
        description: `Impossibile aggiungere il vino: ${errorMsg}`,
        variant: "destructive"
      });
      
      // Reset submitting state
      setIsSubmitting(false);
      
      // Reset form
      resetForm();
      
      // Call error callback if provided
      if (callbacks.onError) {
        callbacks.onError(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }, [newWine, isSubmitting, resetForm, callbacks, setIsSubmitting]);

  return {
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    handleSubmit,
    resetForm,
  };
};
