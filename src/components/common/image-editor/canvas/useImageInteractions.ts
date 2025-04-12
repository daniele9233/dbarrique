
import { useState, useRef, RefObject } from 'react';

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
  const [resizeCorner, setResizeCorner] = useState<string | null>(null);
  const [initialScale, setInitialScale] = useState(scale);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const dragTimeoutRef = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Verifica se abbiamo cliccato su una delle maniglie di ridimensionamento
    const target = e.target as HTMLElement;
    const resizeElement = target.closest('.resize-handle');
    
    if (resizeElement) {
      const corner = resizeElement.getAttribute('data-corner');
      if (corner) {
        console.log(`Iniziato ridimensionamento dall'angolo: ${corner}`);
        setResizeCorner(corner);
        setResizing(true);
        setInitialScale(scale);
        setInitialMousePos({ x: e.clientX, y: e.clientY });
      }
      e.preventDefault();
      return;
    }
    
    // Inizia il trascinamento se non stiamo cliccando su un pulsante o altro elemento interattivo
    if (target.tagName.toLowerCase() !== 'button' && 
        !target.closest('button') && 
        !target.classList.contains('resize-handle')) {
      console.log('Iniziato trascinamento immagine con mouse');
      setIsDragging(true);
      setDragStart({
        x: e.clientX - positionX,
        y: e.clientY - positionY
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && onPositionChange) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      console.log(`Spostamento mouse: x=${newX}, y=${newY}`);
      onPositionChange(newX, newY);
    }
    
    if (resizing && resizeCorner && onScaleChange) {
      // Calcola quanto il mouse si è spostato dalla posizione iniziale
      const deltaX = e.clientX - initialMousePos.x;
      const deltaY = e.clientY - initialMousePos.y;
      
      // Calcola la distanza spostata (usa il maggiore tra deltaX o deltaY)
      const distance = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      
      // Determina la direzione in base all'angolo che viene trascinato
      let direction = 1; // Predefinito per aumentare la scala
      
      if (resizeCorner.includes('top') || resizeCorner.includes('left')) {
        // Se si trascina dagli angoli superiore o sinistro, inverti la direzione
        direction = -1;  
      } else {
        // Se si trascina dagli angoli inferiore o destro
        direction = 1;
      }
      
      // Regola la scala in base alla direzione e alla distanza percorsa
      const scaleFactor = 0.007; // Fattore leggermente aumentato per maggiore reattività
      let newScale = initialScale + (direction * distance * scaleFactor);
      
      // Assicura che la scala rimanga entro limiti ragionevoli
      newScale = Math.max(0.5, Math.min(3, newScale));
      
      console.log(`Ridimensionamento: angolo=${resizeCorner}, distanza=${distance}, direzione=${direction}, nuovaScala=${newScale}`);
      
      onScaleChange(newScale);
    }
  };

  const handleMouseUp = () => {
    console.log('Mouse rilasciato');
    setIsDragging(false);
    setResizing(false);
    setResizeCorner(null);
  };

  // Gestori eventi touch migliorati
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      // Ottieni l'elemento sotto il touch point
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!element) return;
      
      // Controlla se stiamo toccando una maniglia di ridimensionamento
      const resizeElement = element.closest('.resize-handle');
      if (resizeElement) {
        const corner = resizeElement.getAttribute('data-corner');
        if (corner) {
          console.log(`Iniziato ridimensionamento touch dall'angolo: ${corner}`);
          setResizeCorner(corner);
          setResizing(true);
          setInitialScale(scale);
          setInitialMousePos({ x: touch.clientX, y: touch.clientY });
        }
        return;
      }
      
      // Altrimenti presupponiamo che stiamo trascinando il canvas
      console.log('Iniziato trascinamento immagine con touch');
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - positionX,
        y: touch.clientY - positionY
      });
      
      // Piccolo ritardo per assicurarsi che sia un trascinamento intenzionale e non un semplice tap
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
      dragTimeoutRef.current = window.setTimeout(() => {
        console.log('Confermato trascinamento con touch dopo delay');
      }, 100);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Previeni lo scrolling della pagina durante il trascinamento
    if (isDragging || resizing) {
      e.preventDefault();
    }
    
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      if (isDragging && onPositionChange) {
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
        console.log(`Spostamento touch: x=${newX}, y=${newY}`);
        onPositionChange(newX, newY);
      }
      
      if (resizing && resizeCorner && onScaleChange) {
        // Calcola quanto il touch si è spostato dalla posizione iniziale
        const deltaX = touch.clientX - initialMousePos.x;
        const deltaY = touch.clientY - initialMousePos.y;
        
        // Calcola la distanza spostata
        const distance = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        
        // Determina la direzione in base all'angolo che viene trascinato
        let direction = 1;
        
        if (resizeCorner.includes('top') || resizeCorner.includes('left')) {
          direction = -1;
        } else {
          direction = 1;
        }
        
        // Regola la scala in base alla direzione e alla distanza percorsa
        const scaleFactor = 0.007; // Aumentato per maggiore reattività
        let newScale = initialScale + (direction * distance * scaleFactor);
        
        // Assicura che la scala rimanga entro limiti ragionevoli
        newScale = Math.max(0.5, Math.min(3, newScale));
        
        console.log(`Ridimensionamento touch: distanza=${distance}, nuovaScala=${newScale}`);
        onScaleChange(newScale);
      }
    }
  };

  const handleTouchEnd = () => {
    console.log('Touch terminato');
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
      dragTimeoutRef.current = null;
    }
    setIsDragging(false);
    setResizing(false);
    setResizeCorner(null);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
