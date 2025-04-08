
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import Dashboard from "./pages/Dashboard";
import WNetwork from "./pages/WNetwork";
import NotFound from "./pages/NotFound";
import "./styles/custom-scrollbar.css";

// Initialize QueryClient
const queryClient = new QueryClient();

// Initialize Capacitor plugins
const initCapacitor = async () => {
  try {
    // Hide the splash screen
    await SplashScreen.hide();
    
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#121212' });
  } catch (error) {
    // Likely running in browser, not on device
    console.log('Not running on a mobile device');
  }
};

const App = () => {
  useEffect(() => {
    initCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wnetwork" element={<WNetwork />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
