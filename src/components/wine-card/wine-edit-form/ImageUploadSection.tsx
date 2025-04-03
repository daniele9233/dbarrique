
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { RefObject } from "react";

interface ImageUploadSectionProps {
  imageUrl: string;
  fileInputRef: RefObject<HTMLInputElement>;
  onImageUrlChange: (url: string) => void;
  onFileUploadClick: () => void;
}

const ImageUploadSection = ({ 
  imageUrl, 
  fileInputRef, 
  onImageUrlChange, 
  onFileUploadClick 
}: ImageUploadSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>
        Immagine del Vino
      </Label>
      <div className="flex gap-2">
        <Input 
          value={imageUrl} 
          onChange={(e) => onImageUrlChange(e.target.value)}
          className="bg-noir border-white/20 text-white pr-12"
          placeholder="Enter image URL or upload"
        />
        <Button 
          onClick={onFileUploadClick}
          variant="outline" 
          size="icon"
          className="bg-noir border-white/20 hover:bg-wine/20"
          type="button"
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-2">
        <div className="bg-noir-dark h-40 rounded-lg overflow-hidden">
          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
        </div>
        {imageUrl && (
          <p className="text-xs text-white/60 mt-1">Immagine caricata. Per salvare le modifiche, clicca sul pulsante "Salva Modifiche".</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploadSection;
