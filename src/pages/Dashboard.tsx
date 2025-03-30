
import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "@/hooks/use-toast";
import AddWineDialog from "@/components/collection/AddWineDialog";
import { loadWinesFromFirestore } from "@/data/services/wineService";
import { Wine } from "@/data/models/Wine";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import TopWinesTable from '@/components/dashboard/TopWinesTable';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';

const Dashboard = () => {
  const [localWines, setLocalWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);

  // Estraggo fetchWines in uno useCallback per stabilizzarne il riferimento
  const fetchWines = useCallback(async () => {
    try {
      console.log("Dashboard: Loading wines...");
      setIsLoading(true);
      const winesFromFirestore = await loadWinesFromFirestore();
      console.log("Dashboard: Wines loaded:", winesFromFirestore.length);
      setLocalWines(winesFromFirestore);
    } catch (error) {
      console.error('Errore nel caricamento dei vini:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i vini dal database.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWines();
  }, [fetchWines]);

  // Utilizzo useCallback per stabilizzare la funzione
  const handleAddWineComplete = useCallback((newWine: Wine) => {
    console.log("Dashboard: Wine added to collection:", newWine);
    
    // Verifico che il nuovo vino abbia un ID prima di aggiungerlo allo stato locale
    if (!newWine || !newWine.id) {
      console.error("Dashboard: Cannot add wine without ID to local state");
      return;
    }
    
    // Aggiungo il nuovo vino alla lista locale
    setLocalWines(prev => {
      // Verifico se il vino è già nella lista
      const exists = prev.some(wine => wine.id === newWine.id);
      if (exists) {
        console.log("Dashboard: Wine already in list, not adding duplicate");
        return prev;
      }
      
      const updatedWines = [...prev, newWine];
      console.log("Dashboard: Updated wines list:", updatedWines.length);
      return updatedWines;
    });
    
    // Chiudo il dialog dopo l'aggiunta del vino
    setIsAddWineDialogOpen(false);
  }, []);

  // Utilizzo useCallback per stabilizzare la funzione
  const handleDialogOpenChange = useCallback((open: boolean) => {
    console.log("Dashboard: Dialog openChange triggered", open);
    setIsAddWineDialogOpen(open);
  }, []);

  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <DashboardHeader onAddWine={() => setIsAddWineDialogOpen(true)} />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <StatsCards localWines={localWines} />
            <TopWinesTable wines={localWines} />
          </>
        )}
      </div>
      
      <AddWineDialog 
        isOpen={isAddWineDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onWineAdded={handleAddWineComplete}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
