
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
  // Stato delle trasformazioni dell'immagine
  const [scale, setScale] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleImageLoad = (img: HTMLImageElement) => {
    console.log("Immagine caricata in ImageEditor:", img.width, img.height);
    setImageLoaded(true);
    // Reset delle trasformazioni quando si carica una nuova immagine
    setScale(1);
    setPositionX(0);
    setPositionY(0);
    setRotation(0);
  };
  
  // Gestori di movimento
  const moveUp = () => {
    console.log("Movimento verso l'alto");
    setPositionY(prev => prev - 20);
  };
  
  const moveDown = () => {
    console.log("Movimento verso il basso");
    setPositionY(prev => prev + 20);
  };
  
  const moveLeft = () => {
    console.log("Movimento verso sinistra");
    setPositionX(prev => prev - 20);
  };
  
  const moveRight = () => {
    console.log("Movimento verso destra");
    setPositionX(prev => prev + 20);
  };
  
  // Gestori di zoom
  const zoomIn = () => {
    const newScale = Math.min(scale + 0.2, 3);
    console.log(`Zoom in: ${newScale.toFixed(2)}`);
    setScale(newScale);
  };
  
  const zoomOut = () => {
    const newScale = Math.max(scale - 0.2, 0.5);
    console.log(`Zoom out: ${newScale.toFixed(2)}`);
    setScale(newScale);
  };
  
  // Gestore di centratura
  const centerImage = () => {
    console.log("Centrando l'immagine");
    setPositionX(0);
    setPositionY(0);
    setScale(1);
    toast({
      title: "Immagine centrata",
      description: "L'immagine è stata riposizionata al centro"
    });
  };
  
  // Gestore di rotazione
  const rotateImage = () => {
    const newRotation = (rotation + 90) % 360;
    console.log(`Rotazione: ${newRotation}°`);
    setRotation(newRotation);
  };
  
  // Gestori di cambiamento posizione e scala per manipolazione manuale
  const handlePositionChange = (x: number, y: number) => {
    setPositionX(x);
    setPositionY(y);
  };
  
  const handleScaleChange = (newScale: number) => {
    console.log(`Cambio scala: ${newScale.toFixed(2)}`);
    setScale(newScale);
  };
  
  // Salva lo stato attuale del canvas come immagine
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
