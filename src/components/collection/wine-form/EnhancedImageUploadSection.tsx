
import { RefObject, ChangeEvent } from "react";
import { WineFormData } from "@/hooks/useWineForm";
import ImageEditor from "@/components/common/ImageEditor";

interface EnhancedImageUploadSectionProps {
  wineData: WineFormData;
  fileInputRef: RefObject<HTMLInputElement>;
  handleChange: (field: string, value: string | number | string[]) => void;
}

const EnhancedImageUploadSection = ({
  wineData,
  fileInputRef,
  handleChange
}: EnhancedImageUploadSectionProps) => {
  const handleImageChange = (imageDataUrl: string) => {
    handleChange('image', imageDataUrl);
  };
  
  return (
    <div className="space-y-2">
      <ImageEditor
        imageUrl={typeof wineData.image === 'string' ? wineData.image : ''}
        onImageChange={handleImageChange}
        aspectRatio={1.5}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default EnhancedImageUploadSection;
