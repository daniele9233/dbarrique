
import { useState, useRef } from 'react';

interface UseImageInteractionsProps {
  onPositionChange?: (x: number, y: number) => void;
  onScaleChange?: (scale: number) => void;
  scale: number;
  positionX: number;
  positionY: number;
}

export const useImageInteractions = ({
  onPositionChange,
  onScaleChange,
  scale,
  positionX,
  positionY
}: UseImageInteractionsProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [resizeStartScale] = useState(scale);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(scale);
  const lastTapRef = useRef<number>(0);
  
  // Funzione per centrare l'immagine
  const centerImage = () => {
    console.log('Centrando l\'immagine');
    if (onPositionChange) {
      onPositionChange(0, 0);
    }
    if (onScaleChange) {
      onScaleChange(1);
    }
  };

  // Controlla se è un doppio tap per centrare l'immagine
  const checkDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      centerImage();
      return true;
    }
    lastTapRef.current = now;
    return false;
  };

  // Calcola la distanza tra due punti (per il pinch zoom)
  const getDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default del browser
    e.preventDefault();
    
    const target = e.target as HTMLElement;
    
    // Gestisci il controllo di resize
    if (target.closest('.resize-control')) {
      console.log('Iniziato il ridimensionamento con il mouse');
      setResizing(true);
      setInitialScale(scale);
      return;
    }
    
    // Controlla se è un doppio clic per centrare
    if (checkDoubleTap()) {
      return;
    }
    
    // Inizia il trascinamento
    if (!target.closest('button')) {
      console.log('Iniziato spostamento immagine');
      setIsDragging(true);
      setDragStart({
        x: e.clientX - positionX,
        y: e.clientY - positionY
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default
    e.preventDefault();
    
    if (isDragging && onPositionChange) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      console.log(`Spostamento: x=${newX}, y=${newY}`);
      onPositionChange(newX, newY);
    }
    
    if (resizing && onScaleChange) {
      // Utilizziamo la distanza dal centro per determinare lo scale
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calcoliamo la distanza dal centro
      const distanceX = e.clientX - rect.left - centerX;
      const distanceY = e.clientY - rect.top - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Usiamo la distanza per calcolare il nuovo scale
      // Maggiore è la distanza, maggiore sarà lo scale
      const maxDistance = Math.max(rect.width, rect.height) / 2;
      const scaleRatio = Math.max(0.2, Math.min(distance / maxDistance, 1.5));
      const newScale = Math.max(0.5, Math.min(3, initialScale * scaleRatio));
      
      console.log(`Ridimensionamento: distance=${distance.toFixed(2)}, scale=${newScale.toFixed(2)}`);
      onScaleChange(newScale);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default come lo zoom del browser
    e.preventDefault();
    
    // Gestisci il pinch zoom
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const distance = getDistance(touch1, touch2);
      setInitialDistance(distance);
      setInitialScale(scale);
      setResizing(true);
      console.log(`Pinch zoom iniziato, distanza iniziale: ${distance.toFixed(2)}`);
      return;
    }
    
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    
    if (!target) return;
    
    // Gestisci il controllo di resize
    if (target.closest('.resize-control')) {
      console.log('Iniziato il ridimensionamento con touch');
      setResizing(true);
      setInitialScale(scale);
      return;
    }
    
    // Controlla se è un doppio tap per centrare
    if (checkDoubleTap()) return;
    
    // Inizia il trascinamento
    if (!target.closest('button')) {
      console.log('Iniziato spostamento immagine con touch');
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - positionX,
        y: touch.clientY - positionY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Previeni comportamenti di default
    e.preventDefault();
    
    // Gestisci il pinch zoom
    if (e.touches.length === 2 && initialDistance > 0) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const currentDistance = getDistance(touch1, touch2);
      const scaleFactor = currentDistance / initialDistance;
      const newScale = Math.max(0.5, Math.min(3, initialScale * scaleFactor));
      
      console.log(`Pinch zoom: factor=${scaleFactor.toFixed(2)}, scale=${newScale.toFixed(2)}`);
      
      if (onScaleChange) {
        onScaleChange(newScale);
      }
      return;
    }
    
    const touch = e.touches[0];
    
    if (isDragging && onPositionChange) {
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      console.log(`Spostamento touch: x=${newX}, y=${newY}`);
      onPositionChange(newX, newY);
    }
    
    if (resizing && e.touches.length === 1 && onScaleChange) {
      // Utilizziamo logica simile al mouse per il touch singolo
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const distanceX = touch.clientX - rect.left - centerX;
      const distanceY = touch.clientY - rect.top - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      const maxDistance = Math.max(rect.width, rect.height) / 2;
      const scaleRatio = Math.max(0.2, Math.min(distance / maxDistance, 1.5));
      const newScale = Math.max(0.5, Math.min(3, initialScale * scaleRatio));
      
      console.log(`Ridimensionamento touch: distance=${distance.toFixed(2)}, scale=${newScale.toFixed(2)}`);
      onScaleChange(newScale);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      setInitialDistance(0);
    }
    
    if (e.touches.length === 0) {
      setIsDragging(false);
      setResizing(false);
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    centerImage,
  };
};
