
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grape, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Collection', path: '/collection' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-noir-dark/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-white"
          onClick={() => setIsOpen(false)}
        >
          <Grape className="h-8 w-8 text-wine" />
          <div className="relative">
            <span className="font-serif text-xl flex items-center gap-1">
              <span className="text-white font-medium tracking-wider">D</span>
              <span className="text-wine font-gothic relative" style={{ letterSpacing: '0.08em' }}>
                Barrique
                <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-wine/30 to-transparent rounded-full"></span>
              </span>
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-wine'
                      : 'text-white hover:text-wine'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-noir-dark z-40 md:hidden transition-transform duration-500 ease-wine-bounce ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-serif tracking-wider ${
                isActive(link.path)
                  ? 'text-wine'
                  : 'text-white hover:text-wine'
              } transition-colors duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
