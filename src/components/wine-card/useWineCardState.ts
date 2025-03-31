
import { useState, ChangeEvent } from 'react';
import { Wine } from '@/data/models/Wine';
import { toast } from "@/hooks/use-toast";
import { updateWine } from "@/data/services/wineService";
import { generateWineDescription } from './wineDescriptions';

export const useWineCardState = (wine: Wine) => {
  const { id, type, region, grape, grapes = [] } = wine;
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBlend, setIsBlend] = useState(grape === "Blend");
  
  const wineDescriptions = generateWineDescription(type, region);
  
  const [editedWine, setEditedWine] = useState({
    ...wine,
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
