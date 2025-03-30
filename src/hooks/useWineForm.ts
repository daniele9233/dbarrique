
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
  };
  
  const validateForm = (): { isValid: boolean; message?: string } => {
    if (!newWine.name || newWine.name.trim() === "") {
      return { 
        isValid: false, 
        message: "Il nome del vino è obbligatorio." 
      };
    }
    
    // Il vitigno non è più obbligatorio
    return { isValid: true };
  };
  
  const handleSubmit = async () => {
    console.log("useWineForm: handleSubmit called with wine data:", newWine);
    
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
      // Definisci i valori predefiniti per i campi non obbligatori
      const grapeValue = isBlend ? "Blend" : newWine.grape || "Non specificato";
      const grapesArray = isBlend ? newWine.grapes : newWine.grape ? [newWine.grape] : [];
      
      const wineToAdd = {
        ...newWine,
        region: newWine.region || "Non specificata",
        winery: newWine.winery || "Non specificata",
        grape: grapeValue,
        grapes: grapesArray,
        image: newWine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      };
      
      console.log("useWineForm: Adding wine to Firestore:", wineToAdd);
      const addedWine = await addWine(wineToAdd);
      console.log("useWineForm: Wine added to Firestore:", addedWine);
      
      // Clear form
      resetForm();
      
      toast({
        title: "Successo",
        description: "Il nuovo vino è stato aggiunto alla tua collezione.",
      });
      
      if (onComplete) {
        console.log("useWineForm: Calling onComplete callback");
        onComplete(addedWine);
      }
      
      if (onClose) {
        console.log("useWineForm: Calling onClose callback");
        onClose();
      }
    } catch (error) {
      console.error('useWineForm: Errore nell\'aggiunta del vino:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiungere il vino. Riprova più tardi.",
        variant: "destructive"
      });
    }
  };
  
  return {
    newWine,
    isBlend,
    fileInputRef,
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    setIsBlend,
    handleSubmit,
    isDisabled: !newWine.name || newWine.name.trim() === "",
  };
};
