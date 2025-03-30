import { Dispatch, SetStateAction, useCallback, useRef } from 'react';
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
  // Keep a reference to callbacks to avoid stale closures
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  const handleChange = useCallback((field: string, value: string | number | string[]) => {
    console.log(`useWineForm: Updating field ${field} to`, value);
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
    console.log("useWineForm: Resetting form");
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
      aroma: "Fruttato"
    });
    setIsBlend(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setNewWine, setIsBlend, fileInputRef]);
  
  const validateForm = useCallback((): { isValid: boolean; message?: string } => {
    if (!newWine.name || newWine.name.trim() === "") {
      return { 
        isValid: false, 
        message: "Il nome del vino è obbligatorio." 
      };
    }
    
    return { isValid: true };
  }, [newWine.name]);
  
  const handleSubmit = useCallback(async () => {
    console.log("useWineForm: handleSubmit called with wine data:", newWine);
    
    // Prevent multiple submits
    if (isSubmitting) {
      console.log("useWineForm: Already submitting, ignoring request");
      return;
    }
    
    const validation = validateForm();
    
    if (!validation.isValid) {
      console.error("useWineForm: Validation failed:", validation.message);
      toast({
        title: "Errore",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("useWineForm: Submitting form...");
      
      // Define default values for optional fields
      const grapeValue = newWine.grape || "Non specificato";
      const grapesArray = newWine.grapes.length > 0 ? newWine.grapes : [];
      
      const wineToAdd = {
        ...newWine,
        type: newWine.type || "red",
        region: newWine.region || "Non specificata",
        winery: newWine.winery || "Non specificata",
        grape: grapeValue,
        grapes: grapesArray,
        image: newWine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      };
      
      console.log("useWineForm: Adding wine to Firestore:", wineToAdd);
      const addedWine = await addWine(wineToAdd);
      console.log("useWineForm: Wine added to Firestore:", addedWine);
      
      // Reset form
      resetForm();
      
      // Show success message
      toast({
        title: "Successo",
        description: "Il nuovo vino è stato aggiunto alla tua collezione.",
      });
      
      // Execute callbacks DIRECTLY - no setTimeout that can cause issues
      if (callbacksRef.current.onComplete && addedWine) {
        console.log("useWineForm: Executing onComplete callback with wine:", addedWine);
        callbacksRef.current.onComplete(addedWine);
      }
      
      if (callbacksRef.current.onClose) {
        console.log("useWineForm: Executing onClose callback");
        callbacksRef.current.onClose();
      }
      
      // IMPORTANT: Reset submission state AFTER calling callbacks
      setIsSubmitting(false);
      
    } catch (error) {
      console.error('useWineForm: Error adding wine:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiungere il vino. Riprova più tardi.",
        variant: "destructive"
      });
      
      // Reset submission state on error
      setIsSubmitting(false);
    }
  }, [newWine, isSubmitting, validateForm, resetForm, setIsSubmitting]);

  return {
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    handleSubmit,
  };
};
