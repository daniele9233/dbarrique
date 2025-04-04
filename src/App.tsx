
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import Dashboard from "./pages/Dashboard";
import WNetwork from "./pages/WNetwork";
import NotFound from "./pages/NotFound";
import WorldWineSearch from "./pages/WorldWineSearch";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/network" element={<WNetwork />} />
        <Route path="/search" element={<WorldWineSearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
