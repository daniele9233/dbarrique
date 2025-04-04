
import { Wine } from 'lucide-react';

const WorldWineSearchHeader = () => {
  return (
    <div className="px-4 pt-6 pb-12 bg-noir-light border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="bg-wine p-3 rounded-full">
            <Wine className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center font-serif mb-3">Vini del Mondo</h1>
        
        <p className="text-center text-white/60 max-w-2xl mx-auto mb-6">
          Esplora vini da tutto il mondo e scopri bottiglie uniche da aggiungere alla tua collezione. 
          Cerca per nome, regione, annata o vitigno.
        </p>
        
        <div className="flex justify-center space-x-6 text-white/60">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-wine rounded-full"></div>
            <span>Oltre 10 milioni di vini</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            <span>Recensioni autentiche</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            <span>Dati aggiornati</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldWineSearchHeader;
