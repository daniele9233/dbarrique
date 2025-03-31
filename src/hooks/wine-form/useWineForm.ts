
import { useState, useRef, useMemo } from 'react';
import { WineFormData, WineFormCallbacks } from './types';
import { useWineFormActions } from './useWineFormActions';

export const useWineForm = (callbacks?: WineFormCallbacks) => {
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
    aroma: "Fruttato",
    description: "",
    pairing: "",
    storage: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBlend, setIsBlend] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Create a stable callbacks object that won't change between renders
  const stableCallbacks = useMemo<WineFormCallbacks>(() => ({
    onComplete: callbacks?.onComplete,
    onError: callbacks?.onError
  }), [callbacks?.onComplete, callbacks?.onError]);
  
  const {
    handleChange,
    handleGrapeToggle,
    handleFileUpload,
    handleSubmit,
    resetForm,
  } = useWineFormActions(
    newWine,
    isSubmitting,
    setNewWine,
    setIsSubmitting,
    setIsBlend,
    fileInputRef,
    stableCallbacks
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
    resetForm,
    isDisabled: !newWine.name || newWine.name.trim() === "" || isSubmitting,
  };
};
