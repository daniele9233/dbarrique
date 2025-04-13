
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ImageCanvas from './ImageCanvas';
import ImageControls from './ImageControls';
import ImageUploader from './ImageUploader';

export interface ImageEditorProps {
  imageUrl: string;
  onImageChange: (imageDataUrl: string) => void;
  aspectRatio?: number;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

const ImageEditor = ({ 
  imageUrl, 
  onImageChange, 
  aspectRatio = 1.5, 
  fileInputRef 
}: ImageEditorProps) => {
  // Image transformation state
  const [scale, setScale] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleImageLoad = (img: HTMLImageElement) => {
    setImageLoaded(true);
    // Reset transformation when loading new image
    setScale(1);
    setPositionX(0);
    setPositionY(0);
    setRotation(0);
  };
  
  // Movement handlers
  const moveUp = () => setPositionY(prev => prev - 10);
  const moveDown = () => setPositionY(prev => prev + 10);
  const moveLeft = () => setPositionX(prev => prev - 10);
  const moveRight = () => setPositionX(prev => prev + 10);
  
  // Zoom handlers
  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  
  // Center handler
  const centerImage = () => {
    setPositionX(0);
    setPositionY(0);
    toast({
      title: "Immagine centrata",
      description: "L'immagine è stata riposizionata al centro"
    });
  };
  
  // Rotation handler
  const rotateImage = () => setRotation(prev => (prev + 90) % 360);
  
  // Position and scale change handlers for manual manipulation
  const handlePositionChange = (x: number, y: number) => {
    setPositionX(x);
    setPositionY(y);
  };
  
  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
  };
  
  // Save current canvas state as image
  const saveImage = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      console.log("Non è possibile salvare l'immagine - canvas non disponibile");
      return;
    }
    
    const dataUrl = canvas.toDataURL('image/jpeg');
    console.log("Salvataggio immagine, dimensione:", dataUrl.length);
    onImageChange(dataUrl);
    
    toast({
      title: "Modifiche salvate",
      description: "Le modifiche all'immagine sono state applicate."
    });
  };
  
  return (
    <div className="space-y-4">
      <ImageUploader 
        onImageChange={onImageChange}
        fileInputRef={fileInputRef}
      />
      
      <ImageCanvas
        imageUrl={imageUrl}
        scale={scale}
        positionX={positionX}
        positionY={positionY}
        rotation={rotation}
        aspectRatio={aspectRatio}
        onImageLoad={handleImageLoad}
        onPositionChange={handlePositionChange}
        onScaleChange={handleScaleChange}
      />
      
      {imageLoaded && (
        <>
          <ImageControls 
            scale={scale}
            imageLoaded={imageLoaded}
            onScaleChange={setScale}
            onMoveUp={moveUp}
            onMoveDown={moveDown}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onRotate={rotateImage}
            onCenter={centerImage}
          />
          
          <Button 
            variant="outline" 
            size="sm"
            className="w-full bg-wine text-white hover:bg-wine/80"
            onClick={saveImage}
            type="button"
          >
            Applica modifiche
          </Button>
        </>
      )}
      
      {!imageUrl && (
        <p className="text-sm text-white/60 text-center py-4">
          Nessuna immagine caricata. Carica un'immagine per iniziare.
        </p>
      )}
      
      <p className="text-xs text-white/60 mt-1">
        Formato massimo: 10MB. Supportati: JPG, PNG, WebP.
      </p>
    </div>
  );
};

export default ImageEditor;
