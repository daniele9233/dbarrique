
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import Dashboard from "./pages/Dashboard";
import WNetwork from "./pages/WNetwork";
import WineBot from "./pages/WineBot";
import NotFound from "./pages/NotFound";
import "./styles/custom-scrollbar.css";

// Initialize QueryClient
const queryClient = new QueryClient();

// Initialize Capacitor plugins
const initCapacitor = async () => {
  try {
    // Dynamically import Capacitor plugins to prevent build errors
    const SplashScreen = await import('@capacitor/splash-screen').then(m => m.SplashScreen);
    const StatusBar = await import('@capacitor/status-bar').then(m => m.StatusBar);
    const { Style } = await import('@capacitor/status-bar');
    
    // Hide the splash screen
    await SplashScreen.hide();
    
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#121212' });
  } catch (error) {
    // Likely running in browser, not on device or plugins not installed
    console.log('Not running on a mobile device or Capacitor plugins are not installed');
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
            <Route path="/winebot" element={<WineBot />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
