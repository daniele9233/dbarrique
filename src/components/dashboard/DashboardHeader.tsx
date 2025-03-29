
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onAddWine: () => void;
}

const DashboardHeader = ({ onAddWine }: DashboardHeaderProps) => {
  return (
    <header className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-3xl md:text-4xl font-serif">
          La Tua <span className="text-wine">Collezione</span>
        </h1>
        <Button 
          className="bg-wine hover:bg-wine-light"
          onClick={onAddWine}
        >
          <Plus size={16} className="mr-1" /> Aggiungi Vino
        </Button>
      </div>
      <p className="text-white/60 italic">
        "Una bottiglia di vino contiene più filosofia che tutti i libri del mondo." – Louis Pasteur
      </p>
    </header>
  );
};

export default DashboardHeader;
