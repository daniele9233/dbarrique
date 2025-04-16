
import { useState, ChangeEvent } from 'react';
import { Wine, WineType } from '@/data/models/Wine';
import { toast } from "@/hooks/use-toast";
import { updateWine } from "@/data/services/wineService";
import { generateWineDescription } from './wineDescriptions';

// Define max file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export interface EditedWine {
  id: string; // Adding the missing id property
  name: string;
  region: string;
  winery: string;
  year: number;
  rating: number;
  type: WineType;
  image: string;
  grape: string;
  grapes: string[];
  body: string;
  structure: string;
  tannins: string;
  sweetness: string;
  aroma: string;
  description: string;
  pairing: string;
  storage: string;
}

export const useWineCardState = (wine: Wine) => {
  const { id, type, region, grape, grapes = [] } = wine;
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBlend, setIsBlend] = useState(grape === "Blend");
  
  const wineDescriptions = generateWineDescription(type, region);
  
  const [editedWine, setEditedWine] = useState<EditedWine>({
    ...wine,
    id: id, // Explicitly setting the id
    winery: wine.winery || "",
    grapes: grapes || (grape !== "Blend" ? [grape] : []),
    description: wine.description || wineDescriptions.description,
    pairing: wine.pairing || wineDescriptions.pairing,
    storage: wine.storage || wineDescriptions.storage
  });
  
  const handleSaveChanges = async () => {
    try {
      const grapeValue = isBlend ? "Blend" : editedWine.grape;
      const grapesArray = isBlend ? editedWine.grapes : editedWine.grape ? [editedWine.grape] : [];
      
      await updateWine(id, {
        name: editedWine.name,
        region: editedWine.region,
        winery: editedWine.winery,
        year: editedWine.year,
        rating: editedWine.rating,
        type: editedWine.type,
        image: editedWine.image,
        grape: grapeValue,
        grapes: grapesArray,
        body: editedWine.body,
        structure: editedWine.structure,
        tannins: editedWine.tannins,
        sweetness: editedWine.sweetness,
        aroma: editedWine.aroma
      });
      
      toast({
        title: "Modifiche salvate",
        description: `${editedWine.name} è stato aggiornato.`,
      });
      
      setIsEditMode(false);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del vino:', error);
      toast({
        title: "Errore",
        description: "Impossibile salvare le modifiche. Riprova più tardi.",
        variant: "destructive"
      });
    }
  };
  
  const handleEditField = (field: string, value: string | number | string[]) => {
    setEditedWine({
      ...editedWine,
      [field]: value
    });
  };
  
  const handleGrapeToggle = (grape: string) => {
    const updatedGrapes = editedWine.grapes.includes(grape)
      ? editedWine.grapes.filter(g => g !== grape)
      : [...editedWine.grapes, grape];
    
    handleEditField('grapes', updatedGrapes);
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File troppo grande",
        description: "L'immagine non deve superare i 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleEditField('image', e.target.result as string);
        toast({
          title: "Immagine caricata",
          description: "L'immagine del vino è stata caricata con successo.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleCancelEdit = () => {
    setIsEditMode(false);
    
    // Reset the edited wine to the original values
    const resetDescriptions = generateWineDescription(type, region);
    
    setEditedWine({ 
      ...wine,
      winery: wine.winery || "",
      grapes: grapes || (grape !== "Blend" ? [grape] : []),
      description: wine.description || resetDescriptions.description,
      pairing: wine.pairing || resetDescriptions.pairing,
      storage: wine.storage || resetDescriptions.storage
    });
    
    setIsBlend(grape === "Blend");
  };
  
  return {
    isEditMode,
    editedWine,
    isBlend,
    setIsEditMode,
    setIsBlend,
    handleEditField,
    handleGrapeToggle,
    handleSaveChanges,
    handleCancelEdit,
    handleFileUpload
  };
};
