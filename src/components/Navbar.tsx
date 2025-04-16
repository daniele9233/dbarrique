
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { text: "Home", href: "/" },
    { text: "Collection", href: "/collection" },
    { text: "Dashboard", href: "/dashboard" },
    { text: "Wine Network", href: "/wnetwork" },
    { text: "Wine Bot", href: "/winebot" },
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-30 bg-noir/60 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center text-white">
          <span className="font-serif text-xl">d</span>
          <span className="font-script text-2xl text-wine">Barrique</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-colors relative ${
                  isActive 
                    ? "text-white font-medium" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.text}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-wine rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-noir border-b border-white/5 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-colors relative ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.text}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-1/4 h-0.5 bg-wine rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
