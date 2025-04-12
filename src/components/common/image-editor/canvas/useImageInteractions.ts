
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Verifica se abbiamo cliccato su una delle maniglie di ridimensionamento
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle') || target.parentElement?.classList.contains('resize-handle')) {
      // Corretto per gestire anche il click sul div interno
      const corner = target.dataset.corner || target.parentElement?.dataset.corner;
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
    
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'canvas') {
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
      // Fattore di scala ridotto per un controllo più preciso
      const scaleFactor = 0.006; // Aumentato per rendere più reattivo il ridimensionamento
      let newScale = initialScale + (direction * distance * scaleFactor);
      
      // Assicura che la scala rimanga entro limiti ragionevoli
      newScale = Math.max(0.5, Math.min(3, newScale));
      
      console.log(`Ridimensionamento: angolo=${resizeCorner}, distanza=${distance}, direzione=${direction}, nuovaScala=${newScale}`);
      
      onScaleChange(newScale);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
    setResizeCorner(null);
  };

  // Gestori eventi touch
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      // Controlla se stiamo toccando una maniglia di ridimensionamento
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element?.classList.contains('resize-handle') || element?.parentElement?.classList.contains('resize-handle')) {
        // Ottiene l'elemento corretto che contiene l'attributo data-corner
        const resizeElement = element.classList.contains('resize-handle') ? element : element.parentElement;
        const corner = resizeElement?.getAttribute('data-corner');
        if (corner) {
          console.log(`Iniziato ridimensionamento touch dall'angolo: ${corner}`);
          setResizeCorner(corner);
          setResizing(true);
          setInitialScale(scale);
          setInitialMousePos({ x: touch.clientX, y: touch.clientY });
        }
        e.preventDefault();
        return;
      }
      
      // Altrimenti presupponiamo che stiamo trascinando il canvas
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - positionX,
        y: touch.clientY - positionY
      });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      if (isDragging && onPositionChange) {
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
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
        const scaleFactor = 0.006; // Aumentato per maggiore reattività
        let newScale = initialScale + (direction * distance * scaleFactor);
        
        // Assicura che la scala rimanga entro limiti ragionevoli
        newScale = Math.max(0.5, Math.min(3, newScale));
        
        console.log(`Ridimensionamento touch: distanza=${distance}, nuovaScala=${newScale}`);
        onScaleChange(newScale);
      }
    }
  };

  const handleTouchEnd = () => {
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
