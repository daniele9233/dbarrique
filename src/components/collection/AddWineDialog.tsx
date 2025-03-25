
import { useState, useRef, ChangeEvent } from 'react';
import { Grape, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { grapes, bodyOptions, structureOptions, tanninOptions, sweetnessOptions, aromaOptions, addWine } from "@/data/WineData";
import { Checkbox } from "@/components/ui/checkbox";

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWineAdded?: (wine: any) => void;
}

const AddWineDialog: React.FC<AddWineDialogProps> = ({ isOpen, onOpenChange, onWineAdded }) => {
  const [newWine, setNewWine] = useState({
    name: "",
    region: "",
    winery: "",
    year: new Date().getFullYear(),
    rating: 5,
    type: "red" as const,
    image: "",
    grape: "",
    grapes: [] as string[],
    body: "Medio",
    structure: "Equilibrato",
    tannins: "Equilibrato",
    sweetness: "Secco",
    aroma: "Fruttato"
  });
  
  const [isBlend, setIsBlend] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleAddWine = async () => {
    try {
      // Check for required fields
      if (!newWine.name) {
        toast({
          title: "Errore",
          description: "Il nome del vino è obbligatorio.",
          variant: "destructive"
        });
        return;
      }
      
      if (isBlend && newWine.grapes.length === 0) {
        toast({
          title: "Errore",
          description: "Seleziona almeno un vitigno per il blend.",
          variant: "destructive"
        });
        return;
      }

      if (!isBlend && !newWine.grape) {
        toast({
          title: "Errore",
          description: "Seleziona un vitigno.",
          variant: "destructive"
        });
        return;
      }
      
      const grapeValue = isBlend ? "Blend" : newWine.grape;
      const grapesArray = isBlend ? newWine.grapes : newWine.grape ? [newWine.grape] : [];
      
      const wineToAdd = {
        ...newWine,
        region: newWine.region || "Non specificata",
        winery: newWine.winery || "Non specificata",
        grape: grapeValue || "Non specificato",
        grapes: grapesArray,
        image: newWine.image || "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      };
      
      console.log("Adding wine:", wineToAdd);
      const addedWine = await addWine(wineToAdd);
      console.log("Wine added:", addedWine);
      
      // Clear form
      setNewWine({
        name: "",
        region: "",
        winery: "",
        year: new Date().getFullYear(),
        rating: 5,
        type: "red" as const,
        image: "",
        grape: "",
        grapes: [],
        body: "Medio",
        structure: "Equilibrato",
        tannins: "Equilibrato",
        sweetness: "Secco",
        aroma: "Fruttato"
      });
      setIsBlend(false);
      
      toast({
        title: "Successo",
        description: "Il nuovo vino è stato aggiunto alla tua collezione.",
      });
      
      if (onWineAdded) {
        onWineAdded(addedWine);
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Errore nell\'aggiunta del vino:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiungere il vino. Riprova più tardi.",
        variant: "destructive"
      });
    }
  };
  
  const handleChange = (field: string, value: string | number | string[]) => {
    setNewWine({
      ...newWine,
      [field]: value
    });
  };
  
  const handleGrapeToggle = (grape: string) => {
    const updatedGrapes = newWine.grapes.includes(grape)
      ? newWine.grapes.filter(g => g !== grape)
      : [...newWine.grapes, grape];
    
    handleChange('grapes', updatedGrapes);
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleChange('image', e.target.result as string);
        toast({
          title: "Immagine caricata",
          description: "L'immagine del vino è stata caricata con successo.",
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const renderRatingInput = () => {
    return (
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="1"
          max="10"
          value={newWine.rating}
          onChange={(e) => handleChange('rating', parseInt(e.target.value))}
          className="w-full h-2 bg-noir rounded-lg appearance-none cursor-pointer accent-wine"
        />
        <span className="text-white font-medium">{newWine.rating}/10</span>
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-noir-light border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Grape className="h-6 w-6 text-wine" />
            <span>Aggiungi Nuovo Vino</span>
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Inserisci i dettagli del vino che desideri aggiungere alla tua collezione. I campi contrassegnati con * sono obbligatori.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>
              Nome del Vino *
            </Label>
            <Input
              className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
              placeholder="es. Brunello di Montalcino"
              value={newWine.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              Cantina
            </Label>
            <Input
              className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
              placeholder="es. Biondi-Santi"
              value={newWine.winery}
              onChange={(e) => handleChange('winery', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>
              Regione
            </Label>
            <Input
              className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
              placeholder="es. Toscana, Italia"
              value={newWine.region}
              onChange={(e) => handleChange('region', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label>
                Vitigno
              </Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is-blend"
                  checked={isBlend}
                  onCheckedChange={() => {
                    setIsBlend(!isBlend);
                    if (!isBlend) {
                      handleChange('grape', ''); // Clear single grape selection when switching to blend
                    } else {
                      handleChange('grapes', []); // Clear blend selections when switching to single
                    }
                  }}
                  className="border-wine data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                />
                <Label
                  htmlFor="is-blend"
                  className="text-sm cursor-pointer"
                >
                  Blend (seleziona più vitigni)
                </Label>
              </div>
            </div>
            
            {isBlend ? (
              <div className="max-h-40 overflow-y-auto pr-2 border border-white/10 rounded-md p-2 bg-noir custom-scrollbar">
                <div className="grid grid-cols-2 gap-2">
                  {grapes.filter(g => g !== "Blend").map(grape => (
                    <div key={grape} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`grape-${grape}`}
                        checked={newWine.grapes.includes(grape)}
                        onCheckedChange={() => handleGrapeToggle(grape)}
                        className="border-wine data-[state=checked]:bg-wine data-[state=checked]:border-wine"
                      />
                      <Label 
                        htmlFor={`grape-${grape}`}
                        className="text-sm cursor-pointer"
                      >
                        {grape}
                      </Label>
                    </div>
                  ))}
                </div>
                {newWine.grapes.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <p className="text-xs text-white/70">Vitigni selezionati: {newWine.grapes.join(', ')}</p>
                  </div>
                )}
              </div>
            ) : (
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.grape}
                onChange={(e) => handleChange('grape', e.target.value)}
              >
                <option value="">Seleziona un vitigno</option>
                {grapes.filter(g => g !== "Blend").map(grape => (
                  <option key={grape} value={grape}>{grape}</option>
                ))}
              </select>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Anno
              </Label>
              <Input
                type="number"
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="es. 2015"
                value={newWine.year || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? '' : parseInt(e.target.value);
                  handleChange('year', value || new Date().getFullYear());
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label>
                Valutazione (1-10)
              </Label>
              {renderRatingInput()}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Corpo
              </Label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.body}
                onChange={(e) => handleChange('body', e.target.value)}
              >
                {bodyOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>
                Struttura
              </Label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.structure}
                onChange={(e) => handleChange('structure', e.target.value)}
              >
                {structureOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>
                Tannini
              </Label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.tannins}
                onChange={(e) => handleChange('tannins', e.target.value)}
              >
                {tanninOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>
                Dolcezza
              </Label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.sweetness}
                onChange={(e) => handleChange('sweetness', e.target.value)}
              >
                {sweetnessOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>
                Aromi principali
              </Label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                value={newWine.aroma}
                onChange={(e) => handleChange('aroma', e.target.value)}
              >
                {aromaOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>
              Immagine del Vino
            </Label>
            <div className="flex gap-2">
              <Input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none text-white"
                placeholder="Inserisci URL immagine o carica un'immagine"
                value={typeof newWine.image === 'string' ? newWine.image : ''}
                onChange={(e) => handleChange('image', e.target.value)}
              />
              <Button 
                variant="outline"
                className="border-white/10 hover:bg-wine hover:text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Carica
              </Button>
              <input 
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            
            {newWine.image && (
              <div className="mt-2 h-40 rounded-md overflow-hidden bg-noir-dark">
                <img 
                  src={newWine.image.toString()} 
                  alt="Anteprima vino" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/10 hover:bg-noir hover:text-white"
          >
            Annulla
          </Button>
          <Button
            onClick={handleAddWine}
            className="bg-wine hover:bg-wine-light"
            disabled={!newWine.name || (isBlend && newWine.grapes.length === 0) || (!isBlend && !newWine.grape)}
          >
            Aggiungi alla Collezione
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWineDialog;
