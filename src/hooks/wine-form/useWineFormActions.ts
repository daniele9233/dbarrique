
import { Dispatch, SetStateAction, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { addWine } from "@/data/services/wine/wineOperations";
import { WineFormData, WineFormCallbacks } from './types';

// Small utility function to handle UI toasts for form errors
const showErrorToast = (message: string): void => {
  toast({
    title: "Errore",
    description: message,
    variant: "destructive"
  });
};

// Small utility function to handle success toasts
const showSuccessToast = (wineName: string): void => {
  toast({
    title: "Successo",
    description: `${wineName} è stato aggiunto alla collezione con successo.`
  });
};

export const useWineFormActions = (
  newWine: WineFormData,
  isSubmitting: boolean,
  setNewWine: Dispatch<SetStateAction<WineFormData>>,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  setIsBlend: Dispatch<SetStateAction<boolean>>,
  fileInputRef: React.RefObject<HTMLInputElement>,
  callbacks: WineFormCallbacks
) => {
  // Handle form field changes
  const handleChange = useCallback((field: string, value: string | number | string[]) => {
    setNewWine(prev => ({
      ...prev,
      [field]: value
    }));
  }, [setNewWine]);
  
  // Handle toggling grapes in the multi-select
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
  
  // Handle file upload for wine images
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
  
  // Reset form to initial state
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
  
  // Validate the wine form before submission
  const validateWineForm = useCallback((): boolean => {
    if (!newWine.name || newWine.name.trim() === "") {
      showErrorToast("Il nome del vino è obbligatorio.");
      return false;
    }
    return true;
  }, [newWine.name]);
  
  // Prepare wine data with defaults for missing fields
  const prepareWineData = useCallback((): WineFormData => {
    return {
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
  }, [newWine]);
  
  // Set up UI timeout to prevent getting stuck in loading state
  const setupUITimeout = useCallback((
    setIsSubmitting: Dispatch<SetStateAction<boolean>>,
    callbacks: WineFormCallbacks
  ): NodeJS.Timeout => {
    return setTimeout(() => {
      console.log("useWineFormActions: UI timeout triggered");
      setIsSubmitting(false);
      showErrorToast("L'operazione sta impiegando troppo tempo. Riprova più tardi.");
      
      // Call error callback if provided
      if (callbacks.onError) {
        callbacks.onError(new Error("UI timeout"));
      }
    }, 15000); // 15 seconds UI timeout
  }, []);
  
  // Handle the actual wine submission
  const performWineSubmission = useCallback(async (
    wineToAdd: WineFormData,
    uiTimeoutId: NodeJS.Timeout,
    setIsSubmitting: Dispatch<SetStateAction<boolean>>,
    callbacks: WineFormCallbacks,
    resetFormFn: () => void
  ): Promise<void> => {
    try {
      console.log("useWineFormActions: Chiamando addWine con", wineToAdd);
      
      // Add wine to Firestore
      const addedWine = await addWine(wineToAdd);
      
      // Clear the UI timeout since operation completed
      clearTimeout(uiTimeoutId);
      
      console.log("useWineFormActions: Vino aggiunto con successo", addedWine);
      
      // Update UI state
      setIsSubmitting(false);
      
      if (addedWine) {
        showSuccessToast(addedWine.name);
        
        // Reset form
        resetFormFn();
        
        // Call completion callback if provided
        if (callbacks.onComplete) {
          callbacks.onComplete(addedWine);
        }
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del vino:', error);
      
      // Clear the UI timeout
      clearTimeout(uiTimeoutId);
      
      // Always ensure we reset the submitting state
      setIsSubmitting(false);
      
      const errorMsg = error instanceof Error ? error.message : "Errore sconosciuto";
      showErrorToast(`Impossibile aggiungere il vino: ${errorMsg}`);
      
      // Call error callback if provided
      if (callbacks.onError) {
        callbacks.onError(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }, []);
  
  // Main submit handler that orchestrates the submission process
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) {
      console.log("useWineFormActions: Already submitting, ignoring additional submit request");
      return;
    }
    
    // Validate form
    if (!validateWineForm()) {
      return;
    }
    
    let submissionTimeout: NodeJS.Timeout | null = null;
    
    try {
      setIsSubmitting(true);
      console.log("useWineFormActions: Inizio aggiunta del vino", newWine);
      
      // Set a UI timeout to ensure we don't get stuck in loading state
      submissionTimeout = setupUITimeout(setIsSubmitting, callbacks);
      
      // Prepare data
      const wineToAdd = prepareWineData();
      
      // Perform the actual submission
      await performWineSubmission(
        wineToAdd, 
        submissionTimeout, 
        setIsSubmitting, 
        callbacks,
        resetForm
      );
    } catch (error) {
      console.error('Errore durante l\'aggiunta del vino:', error);
      
      // Clear the UI timeout if it exists
      if (submissionTimeout) {
        clearTimeout(submissionTimeout);
      }
      
      // Always ensure we reset the submitting state
      setIsSubmitting(false);
      
      const errorMsg = error instanceof Error ? error.message : "Errore sconosciuto";
      showErrorToast(`Impossibile aggiungere il vino: ${errorMsg}`);
      
      // Call error callback if provided
      if (callbacks.onError) {
        callbacks.onError(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }, [
    isSubmitting, 
    newWine, 
    validateWineForm, 
    setupUITimeout, 
    prepareWineData, 
    performWineSubmission, 
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
