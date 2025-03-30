
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Save } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface WineDialogHeaderProps {
  name: string;
  region: string;
  year: number;
  isEditMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  handleEditField: (field: string, value: string | number | string[]) => void;
}

const WineDialogHeader = ({ 
  name, 
  region, 
  year, 
  isEditMode, 
  onEdit, 
  onSave,
  handleEditField 
}: WineDialogHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle className="font-serif text-3xl flex justify-between items-center">
        {isEditMode ? (
          <Input 
            value={name} 
            onChange={(e) => handleEditField('name', e.target.value)}
            className="bg-noir border-white/20 text-white text-3xl font-serif"
          />
        ) : (
          <span>{name}</span>
        )}
        <Button 
          onClick={() => isEditMode ? onSave() : onEdit()}
          variant="outline"
          size="icon"
          className="rounded-full bg-transparent border-wine hover:bg-wine/20"
        >
          {isEditMode ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
        </Button>
      </DialogTitle>
      <DialogDescription className="text-white/70">
        {isEditMode ? (
          <div className="flex gap-4 mt-2">
            <Input 
              value={region} 
              onChange={(e) => handleEditField('region', e.target.value)}
              className="bg-noir border-white/20 text-white flex-grow"
              placeholder="Regione"
            />
            <Input 
              value={year} 
              onChange={(e) => handleEditField('year', parseInt(e.target.value))}
              className="bg-noir border-white/20 text-white w-24"
              type="number"
            />
          </div>
        ) : (
          <span>{region}, {year}</span>
        )}
      </DialogDescription>
    </DialogHeader>
  );
};

export default WineDialogHeader;
