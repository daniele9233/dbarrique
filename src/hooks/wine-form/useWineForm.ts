
import { useState, useRef } from 'react';
import { WineFormData, WineFormCallbacks } from './types';
import { useWineFormActions } from './useWineFormActions';

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
  
  const callbacks: WineFormCallbacks = { onComplete, onClose };
  
  const {
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    handleSubmit,
  } = useWineFormActions(
    newWine,
    isSubmitting,
    setNewWine,
    setIsSubmitting,
    setIsBlend,
    fileInputRef,
    callbacks
  );
  
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
