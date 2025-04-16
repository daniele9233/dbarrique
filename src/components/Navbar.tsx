
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {link.text}
            </Link>
          ))}
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
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
