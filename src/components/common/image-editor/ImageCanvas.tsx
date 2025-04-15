
import { useRef } from 'react';
import ImageRenderer from './canvas/ImageRenderer';
import ResizeHandles from './canvas/ResizeHandles';
import { useCanvasSize } from './canvas/useCanvasSize';
import { useImageInteractions } from './canvas/useImageInteractions';
import { useGlobalEvents } from './canvas/useGlobalEvents';
import { Maximize2 } from 'lucide-react';

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
      window.dispatchEvent(new Event('resize'));
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
    centerImage,
    zoomIn,
    zoomOut
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
      style={{ 
        touchAction: 'none', // Previene il comportamento di scroll/zoom predefinito
        WebkitUserSelect: 'none', // Impedisce la selezione del testo
        userSelect: 'none',
        minHeight: '200px' // Altezza minima per garantire che il canvas sia visibile
      }}
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
          className="absolute top-4 left-4 z-20 bg-wine/90 text-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-white/50 hover:bg-wine"
          onClick={centerImage}
          type="button"
          aria-label="Centra immagine"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ImageCanvas;
