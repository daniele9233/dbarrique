
import { Grape } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const WineFormDialogHeader: React.FC = () => {
  return (
    <DialogHeader>
      <DialogTitle className="font-serif text-2xl flex items-center gap-2">
        <Grape className="h-6 w-6 text-wine" />
        <span>Aggiungi Nuovo Vino</span>
      </DialogTitle>
      <DialogDescription className="text-white/60">
        Inserisci i dettagli del vino che desideri aggiungere alla tua collezione. Solo il nome del vino è obbligatorio.
      </DialogDescription>
    </DialogHeader>
  );
};

export default WineFormDialogHeader;
