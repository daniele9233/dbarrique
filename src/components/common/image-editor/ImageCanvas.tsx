
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
    handleTouchEnd 
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
    </div>
  );
};

export default ImageCanvas;
