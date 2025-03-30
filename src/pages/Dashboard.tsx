
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchWines = async () => {
      try {
        console.log("Dashboard: Loading wines...");
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
    };

    fetchWines();
  }, []);

  const handleAddWineComplete = (newWine: Wine) => {
    console.log("Dashboard: Wine added to collection:", newWine);
    setLocalWines(prev => [...prev, newWine]);
    setIsAddWineDialogOpen(false);
    toast({
      title: "Vino Aggiunto",
      description: `${newWine.name} è stato aggiunto alla tua collezione.`
    });
  };

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
        onOpenChange={setIsAddWineDialogOpen}
        onWineAdded={handleAddWineComplete}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
