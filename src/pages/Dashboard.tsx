
import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "@/hooks/use-toast";
import AddWineDialog from "@/components/collection/AddWineDialog";
import { loadWinesFromFirestore, wines as cachedWines, addWine } from "@/data/services/wineService";
import { Wine } from "@/data/models/Wine";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import TopWinesTable from '@/components/dashboard/TopWinesTable';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';

const Dashboard = () => {
  const [localWines, setLocalWines] = useState<Wine[]>(cachedWines);
  const [isLoading, setIsLoading] = useState(cachedWines.length === 0);
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);

  const fetchWines = useCallback(async () => {
    try {
      // Se abbiamo vini nella cache, li mostriamo subito
      if (cachedWines.length > 0) {
        setLocalWines(cachedWines);
        setIsLoading(false);
        
        // Poi aggiorniamo in background
        loadWinesFromFirestore(false).then(freshWines => {
          setLocalWines(freshWines);
        }).catch(console.error);
        return;
      }
      
      // Altrimenti facciamo il caricamento normale
      console.log("Dashboard: Loading wines...");
      setIsLoading(true);
      const winesFromFirestore = await loadWinesFromFirestore();
      console.log("Dashboard: Wines loaded successfully:", winesFromFirestore.length);
      setLocalWines(winesFromFirestore);
      setIsLoading(false);
    } catch (error) {
      console.error('Dashboard: Errore nel caricamento dei vini:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i vini dal database.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWines();
  }, [fetchWines]);

  const handleAddWineComplete = useCallback((newWine: Wine) => {
    console.log("Dashboard: Wine added to collection:", newWine);
    
    if (!newWine || !newWine.id) {
      console.error("Dashboard: Cannot add wine without ID to local state");
      return;
    }
    
    // Add new wine to local list
    setLocalWines(prev => {
      // Check if wine already exists
      const exists = prev.some(wine => wine.id === newWine.id);
      if (exists) {
        console.log("Dashboard: Wine already in list, not adding duplicate");
        return prev;
      }
      
      const updatedWines = [...prev, newWine];
      console.log("Dashboard: Updated wines list:", updatedWines.length);
      return updatedWines;
    });
    
    // Chiude esplicitamente il dialog dopo l'aggiunta del vino
    setIsAddWineDialogOpen(false);
  }, []);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    console.log("Dashboard: Dialog openChange triggered", open);
    setIsAddWineDialogOpen(open);
  }, []);

  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <DashboardHeader onAddWine={() => setIsAddWineDialogOpen(true)} />
        
        {isLoading && localWines.length === 0 ? (
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
