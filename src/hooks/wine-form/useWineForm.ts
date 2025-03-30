
import { useState, useRef, useMemo, useCallback } from 'react';
import { WineFormData, WineFormCallbacks } from './types';
import { useWineFormActions } from './useWineFormActions';

export const useWineForm = (onCompleteCallback?: (wine: any) => void, onCloseCallback?: () => void) => {
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
  
  // Create a stable callbacks object that won't change between renders
  const callbacks = useMemo<WineFormCallbacks>(() => ({
    onComplete: onCompleteCallback,
    onClose: onCloseCallback
  }), [onCompleteCallback, onCloseCallback]);
  
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
