
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ImageCanvas from './ImageCanvas';
import ImageControls from './ImageControls';
import ImageUploader from './ImageUploader';

interface ImageEditorProps {
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
  const moveUp = () => {
    setPositionY(prev => prev - 10);
    console.log("Moving up, new Y:", positionY - 10);
  };
  
  const moveDown = () => {
    setPositionY(prev => prev + 10);
    console.log("Moving down, new Y:", positionY + 10);
  };
  
  const moveLeft = () => {
    setPositionX(prev => prev - 10);
    console.log("Moving left, new X:", positionX - 10);
  };
  
  const moveRight = () => {
    setPositionX(prev => prev + 10);
    console.log("Moving right, new X:", positionX + 10);
  };
  
  // Zoom handlers
  const zoomIn = () => {
    setScale(prev => {
      const newScale = Math.min(prev + 0.1, 3);
      console.log("Zooming in, new scale:", newScale);
      return newScale;
    });
  };
  
  const zoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.1, 0.5);
      console.log("Zooming out, new scale:", newScale);
      return newScale;
    });
  };
  
  // Rotation handler
  const rotateImage = () => {
    setRotation(prev => {
      const newRotation = (prev + 90) % 360;
      console.log("Rotating, new angle:", newRotation);
      return newRotation;
    });
  };
  
  // Save current canvas state as image
  const saveImage = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      console.log("Cannot save image - canvas not available");
      return;
    }
    
    const dataUrl = canvas.toDataURL('image/jpeg');
    console.log("Saving image, size:", dataUrl.length);
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
          />
          
          {/* Save Button - Separate from other controls for prominence */}
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
