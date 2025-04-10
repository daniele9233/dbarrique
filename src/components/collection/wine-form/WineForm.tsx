
import { WineFormData } from "@/hooks/useWineForm";
import BasicInfoSection from './BasicInfoSection';
import GrapeSection from './GrapeSection';
import YearRatingSection from './YearRatingSection';
import CharacteristicsSection from './CharacteristicsSection';
import DescriptionSection from '@/components/wine-card/wine-edit-form/DescriptionSection';
import EnhancedImageUploadSection from './EnhancedImageUploadSection';
import FormSubmitButtons from './FormSubmitButtons';

interface WineFormProps {
  wineData: WineFormData;
  isBlend: boolean;
  isSubmitting: boolean;
  isDisabled: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setIsBlend: (isBlend: boolean) => void;
  handleChange: (field: string, value: string | number | string[]) => void;
  handleGrapeToggle: (grape: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

const WineForm: React.FC<WineFormProps> = ({
  wineData,
  isBlend,
  isSubmitting,
  isDisabled,
  fileInputRef,
  setIsBlend,
  handleChange,
  handleGrapeToggle,
  handleFileUpload,
  handleSubmit,
  handleCancel
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <BasicInfoSection wineData={wineData} handleChange={handleChange} />
      
      <GrapeSection 
        wineData={wineData} 
        isBlend={isBlend} 
        setIsBlend={setIsBlend} 
        handleChange={handleChange} 
        handleGrapeToggle={handleGrapeToggle} 
      />
      
      <YearRatingSection wineData={wineData} handleChange={handleChange} />
      
      <CharacteristicsSection wineData={wineData} handleChange={handleChange} />
      
      <DescriptionSection 
        description={wineData.description || ''}
        onChange={(value) => handleChange('description', value)}
        placeholder="Descrivi le caratteristiche del vino..."
      />
      
      <EnhancedImageUploadSection 
        wineData={wineData} 
        fileInputRef={fileInputRef} 
        handleChange={handleChange} 
      />
      
      <FormSubmitButtons 
        isSubmitting={isSubmitting}
        isDisabled={isDisabled}
        onCancel={handleCancel}
      />
    </form>
  );
};

export default WineForm;
