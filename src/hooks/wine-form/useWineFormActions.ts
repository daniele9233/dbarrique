
import { Dispatch, SetStateAction, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { addWine } from "@/data/services/wineService";
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
    if (isSubmitting) return;
    
    // Validate form
    if (!newWine.name || newWine.name.trim() === "") {
      toast({
        title: "Errore",
        description: "Il nome del vino è obbligatorio.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
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
      
      // Add wine to Firestore
      const addedWine = await addWine(wineToAdd);
      
      if (addedWine) {
        toast({
          title: "Successo",
          description: "Vino aggiunto alla collezione con successo."
        });
        
        // Call completion callback if provided
        if (callbacks.onComplete) {
          callbacks.onComplete(addedWine);
        }
        
        // Reset the form
        resetForm();
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Errore sconosciuto";
      
      console.error('Errore durante l\'aggiunta del vino:', error);
      toast({
        title: "Errore",
        description: `Impossibile aggiungere il vino: ${errorMsg}`,
        variant: "destructive"
      });
      
      // Call error callback if provided
      if (callbacks.onError) {
        callbacks.onError(error instanceof Error ? error : new Error(String(error)));
      }
    } finally {
      setIsSubmitting(false);
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
