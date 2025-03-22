
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WineCard from '@/components/WineCard';
import { Filter, Search, Plus, Grape } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Sample wine data (extended from WineCollection)
const wines = [
  {
    id: 1,
    name: "Château Margaux",
    region: "Bordeaux, France",
    year: 2015,
    rating: 5,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1586370434639-0fe27519d3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Barolo Riserva",
    region: "Piedmont, Italy",
    year: 2016,
    rating: 4,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 3,
    name: "Dom Pérignon",
    region: "Champagne, France",
    year: 2010,
    rating: 5,
    type: "sparkling" as const,
    image: "https://images.unsplash.com/photo-1594372425423-ba65d6e1e226?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 4,
    name: "Opus One",
    region: "Napa Valley, USA",
    year: 2017,
    rating: 4,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1566452348683-79f9cf5c3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 5,
    name: "Chablis Grand Cru",
    region: "Burgundy, France",
    year: 2018,
    rating: 4,
    type: "white" as const,
    image: "https://images.unsplash.com/photo-1556340346-5e30da977c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=994&q=80"
  },
  {
    id: 6,
    name: "Whispering Angel",
    region: "Provence, France",
    year: 2021,
    rating: 3,
    type: "rosé" as const,
    image: "https://images.unsplash.com/photo-1588982637125-d704a8901dce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=991&q=80"
  },
  {
    id: 7,
    name: "Sassicaia",
    region: "Tuscany, Italy",
    year: 2016,
    rating: 5,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1553361371-9fe24fca9c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: 8,
    name: "Penfolds Grange",
    region: "South Australia",
    year: 2014,
    rating: 5,
    type: "red" as const,
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 9,
    name: "Cloudy Bay",
    region: "Marlborough, New Zealand",
    year: 2021,
    rating: 4,
    type: "white" as const,
    image: "https://images.unsplash.com/photo-1560148218-1a83060f7b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
  }
];

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isAddWineDialogOpen, setIsAddWineDialogOpen] = useState(false);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const filteredWines = wines.filter((wine) => {
    const matchesSearch = 
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.year.toString().includes(searchTerm);
    
    const matchesType = selectedType ? wine.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });
  
  const handleAddWine = () => {
    // This would normally submit the form data to a database
    toast({
      title: "Success",
      description: "New wine has been added to your collection.",
    });
    setIsAddWineDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="section">
          <div className="max-w-5xl mx-auto mb-12 text-center">
            <h4 className="text-wine uppercase tracking-[0.2em] text-sm mb-3 opacity-0 animate-fade-in">Premium Selection</h4>
            <h1 className="font-serif text-4xl md:text-5xl mb-5 opacity-0 animate-fade-in animate-delay-100">Wine Collection</h1>
            <p className="text-white/70 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-200">
              Browse our carefully curated selection of exceptional wines from around the world.
              Each bottle tells a unique story of terroir, tradition, and craftsmanship.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  placeholder="Search wines by name, region, or year..."
                  className="w-full pl-10 pr-4 py-3 rounded-md bg-noir-light border border-white/10 focus:border-wine focus:ring-1 focus:ring-wine outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={toggleFilters}
                className="px-5 py-3 rounded-md bg-noir-light border border-white/10 hover:bg-wine transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              
              {/* Add Wine Button */}
              <button
                onClick={() => setIsAddWineDialogOpen(true)}
                className="px-5 py-3 rounded-md bg-wine border border-wine hover:bg-wine-light transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                <span>Add Wine</span>
              </button>
            </div>
            
            {/* Expandable filters */}
            <div className={`mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-300 ease-wine-bounce ${
              showFilters ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              {["red", "white", "rosé", "sparkling"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
                    selectedType === type
                      ? 'bg-wine border-wine text-white'
                      : 'bg-transparent border-white/10 text-white hover:border-wine/50'
                  }`}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Wine grid */}
          <div className="max-w-7xl mx-auto">
            {filteredWines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWines.map((wine, index) => (
                  <div
                    key={wine.id}
                    className="opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 100 + 300}ms` }}
                  >
                    <WineCard {...wine} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg mb-4">No wines found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType(null);
                  }}
                  className="text-wine hover:text-wine-light transition-colors duration-300"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add Wine Dialog */}
      <Dialog open={isAddWineDialogOpen} onOpenChange={setIsAddWineDialogOpen}>
        <DialogContent className="bg-noir-light border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl flex items-center gap-2">
              <Grape className="h-6 w-6 text-wine" />
              <span>Add New Wine</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Wine Name
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                placeholder="e.g. Château Margaux"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Region
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                placeholder="e.g. Bordeaux, France"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Year
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                  placeholder="e.g. 2015"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                  placeholder="e.g. 4"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Wine Type
              </label>
              <select className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none">
                <option value="">Select wine type</option>
                <option value="red">Red</option>
                <option value="white">White</option>
                <option value="rosé">Rosé</option>
                <option value="sparkling">Sparkling</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Image URL
              </label>
              <input
                className="w-full px-3 py-2 rounded-md bg-noir border border-white/10 focus:border-wine focus:outline-none"
                placeholder="Enter image URL or upload an image"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsAddWineDialogOpen(false)}
              className="border-white/10 hover:bg-noir hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddWine}
              className="bg-wine hover:bg-wine-light"
            >
              Add to Collection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Collection;
