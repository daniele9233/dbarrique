
import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

interface ImageUploaderProps {
  onImageChange: (imageDataUrl: string) => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

const ImageUploader = ({ onImageChange, fileInputRef: externalFileInputRef }: ImageUploaderProps) => {
  const internalFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = externalFileInputRef || internalFileInputRef;
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File troppo grande",
        description: "L'immagine non deve superare i 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        console.log("File loaded, updating image");
        onImageChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="flex justify-between items-center">
      <Label>Immagine</Label>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-noir border-white/20 hover:bg-wine/20"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          <Upload className="h-4 w-4" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
