import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "@/hooks/use-toast";
import AddWineDialog from "@/components/collection/AddWineDialog";
import { loadWinesFromFirestore, wines as cachedWines } from "@/data/services/wineService";
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
      // If we have wines in the cache, show them immediately
      if (cachedWines.length > 0) {
        setLocalWines(cachedWines);
        setIsLoading(false);
        
        // Then update in the background
        loadWinesFromFirestore(false).then(freshWines => {
          setLocalWines(freshWines);
        }).catch(error => {
          console.error("Dashboard: Error loading wines in background:", error);
        });
        return;
      }
      
      // Otherwise do a normal load
      setIsLoading(true);
      const winesFromFirestore = await loadWinesFromFirestore();
      setLocalWines(winesFromFirestore);
      setIsLoading(false);
    } catch (error) {
      console.error('Dashboard: Error loading wines:', error);
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
    // Add new wine to local list
    setLocalWines(prev => {
      // Check if wine already exists
      if (prev.some(wine => wine.id === newWine.id)) {
        return prev;
      }
      return [...prev, newWine];
    });
    
    // Show success message
    toast({
      title: "Vino aggiunto",
      description: `${newWine.name} è stato aggiunto alla collezione.`
    });
    
    // Close dialog
    setIsAddWineDialogOpen(false);
    
    // Refresh list from Firestore
    loadWinesFromFirestore(true)
      .then(setLocalWines)
      .catch(console.error);
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
        onOpenChange={setIsAddWineDialogOpen}
        onWineAdded={handleAddWineComplete}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
