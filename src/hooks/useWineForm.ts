
import { useState, useRef, ChangeEvent } from 'react';
import { toast } from "@/hooks/use-toast";
import { addWine } from "@/data/services/wineService";

export type WineFormData = {
  name: string;
  region: string;
  winery: string;
  year: number;
  rating: number;
  type: "red" | "white" | "rosé" | "sparkling";
  image: string;
  grape: string;
  grapes: string[];
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
};

export const useWineForm = (onComplete?: (wine: any) => void, onClose?: () => void) => {
  const [newWine, setNewWine] = useState<WineFormData>({
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBlend, setIsBlend] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (field: string, value: string | number | string[]) => {
    console.log(`useWineForm: Updating field ${field} to`, value);
    setNewWine({
      ...newWine,
      [field]: value
    });
  };
  
  const handleGrapeToggle = (grape: string) => {
    const updatedGrapes = newWine.grapes.includes(grape)
      ? newWine.grapes.filter(g => g !== grape)
      : [...newWine.grapes, grape];
    
    handleChange('grapes', updatedGrapes);
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
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
  };
  
  const resetForm = () => {
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
  };
  
  const validateForm = (): { isValid: boolean; message?: string } => {
    if (!newWine.name || newWine.name.trim() === "") {
      return { 
        isValid: false, 
        message: "Il nome del vino è obbligatorio." 
      };
    }
    
    return { isValid: true };
  };
  
  const handleSubmit = async () => {
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
      const grapeValue = isBlend ? "Blend" : newWine.grape || "Non specificato";
      const grapesArray = isBlend ? newWine.grapes : newWine.grape ? [newWine.grape] : [];
      
      const wineToAdd = {
        ...newWine,
        type: newWine.type || "red", // Ensure type is set
        region: newWine.region || "Non specificata",
        winery: newWine.winery || "Non specificata",
        grape: grapeValue,
        grapes: grapesArray,
        image: newWine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      };
      
      console.log("useWineForm: Adding wine to Firestore:", wineToAdd);
      const addedWine = await addWine(wineToAdd);
      console.log("useWineForm: Wine added to Firestore:", addedWine);
      
      // Reset form first
      resetForm();
      
      // Show success message
      toast({
        title: "Successo",
        description: "Il nuovo vino è stato aggiunto alla tua collezione.",
      });
      
      // Call onComplete callback if provided
      if (onComplete && addedWine) {
        console.log("useWineForm: Calling onComplete callback with wine:", addedWine);
        onComplete(addedWine);
      }
      
      // Call onClose callback if provided
      if (onClose) {
        console.log("useWineForm: Calling onClose callback");
        onClose();
      }
    } catch (error) {
      console.error('useWineForm: Error adding wine:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiungere il vino. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      // Always reset submission state
      console.log("useWineForm: Resetting submission state");
      setIsSubmitting(false);
    }
  };
  
  return {
    newWine,
    isBlend,
    isSubmitting,
    fileInputRef,
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    setIsBlend,
    handleSubmit,
    isDisabled: !newWine.name || newWine.name.trim() === "" || isSubmitting,
  };
};
