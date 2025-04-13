
import { useRef } from 'react';
import ImageRenderer from './canvas/ImageRenderer';
import ResizeHandles from './canvas/ResizeHandles';
import { useCanvasSize } from './canvas/useCanvasSize';
import { useImageInteractions } from './canvas/useImageInteractions';
import { useGlobalEvents } from './canvas/useGlobalEvents';

interface ImageCanvasProps {
  imageUrl: string;
  scale: number;
  positionX: number;
  positionY: number;
  rotation: number;
  aspectRatio: number;
  onImageLoad: (img: HTMLImageElement) => void;
  onPositionChange?: (x: number, y: number) => void;
  onScaleChange?: (scale: number) => void;
}

const ImageCanvas = ({
  imageUrl,
  scale,
  positionX,
  positionY,
  rotation,
  aspectRatio,
  onImageLoad,
  onPositionChange,
  onScaleChange
}: ImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Imposta le dimensioni del canvas in base al container e all'aspect ratio
  const containerSize = useCanvasSize({ 
    containerRef, 
    canvasRef, 
    aspectRatio,
    onSizeChange: () => {
      // Renderizza nuovamente l'immagine quando cambia la dimensione del canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    }
  });
  
  // Gestisce le interazioni dell'immagine (trascinamento e ridimensionamento)
  const { 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    handleTouchStart, 
    handleTouchMove, 
    handleTouchEnd,
    centerImage
  } = useImageInteractions({
    onPositionChange,
    onScaleChange,
    scale,
    positionX,
    positionY
  });
  
  // Aggiunge il gestore globale per il mouse up
  useGlobalEvents(handleMouseUp);

  return (
    <div 
      ref={containerRef}
      className="bg-noir-dark rounded-lg overflow-hidden relative touch-manipulation"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }} // Previene il comportamento di scroll/zoom predefinito
    >
      <ImageRenderer 
        imageUrl={imageUrl}
        scale={scale}
        positionX={positionX}
        positionY={positionY}
        rotation={rotation}
        onImageLoad={onImageLoad}
      />
      
      <ResizeHandles imageUrl={imageUrl} />
      
      {/* Pulsante per centrare l'immagine */}
      {imageUrl && (
        <button
          className="absolute top-4 left-4 z-20 bg-wine/90 text-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-white/50"
          onClick={centerImage}
          type="button"
          aria-label="Centra immagine"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12H3M12 3v18M12 8l-4 4 4 4M8 12h8"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageCanvas;
