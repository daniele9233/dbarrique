
import { Button } from "@/components/ui/button";
import { 
  RotateCw, ZoomIn, ZoomOut, 
  Maximize2
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ImageControlsProps {
  scale: number;
  imageLoaded: boolean;
  onScaleChange: (value: number) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onCenter: () => void;
}

const ImageControls = ({
  scale,
  imageLoaded,
  onScaleChange,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onZoomIn,
  onZoomOut,
  onRotate,
  onCenter
}: ImageControlsProps) => {
  if (!imageLoaded) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20 flex-1"
          onClick={onZoomIn}
          type="button"
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20 flex-1"
          onClick={onZoomOut}
          type="button"
        >
          <ZoomOut className="h-4 w-4 mr-1" />
          Zoom Out
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20 flex-1"
          onClick={onRotate}
          type="button"
        >
          <RotateCw className="h-4 w-4 mr-1" />
          Ruota
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-noir border-white/20 hover:bg-wine/20 flex-1"
          onClick={onCenter}
          type="button"
        >
          <Maximize2 className="h-4 w-4 mr-1" />
          Centra
        </Button>
      </div>
      
      <div>
        <Label className="mb-2 block text-sm">Zoom: {Math.round(scale * 100)}%</Label>
        <Slider
          className="bg-noir-dark"
          value={[scale * 100]}
          min={50}
          max={300}
          step={5}
          onValueChange={(value) => onScaleChange(value[0] / 100)}
        />
      </div>
      
      <div className="bg-noir-dark rounded p-3 text-sm">
        <p className="text-center text-white/80 mb-2">Suggerimenti per l'uso</p>
        <ul className="text-white/60 list-disc pl-5 space-y-1">
          <li>Doppio tap/click per centrare l'immagine</li>
          <li>Trascina l'immagine per spostarla</li>
          <li>Usa il cursore in basso a destra per ridimensionare</li>
          <li>Usa i comandi sopra per un controllo preciso</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageControls;
