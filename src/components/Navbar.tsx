
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wine, BarChart3, Grid3X3, Network, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMobile } from '@/hooks/use-mobile';

const navItems = [
  { name: 'Home', href: '/', icon: Wine },
  { name: 'Collection', href: '/collection', icon: Grid3X3 },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Network', href: '/network', icon: Network },
  { name: 'Global Search', href: '/search', icon: Search }
];

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define navigation items with active state
  const NavItems = () => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        const ItemIcon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "text-white bg-noir-light"
                : "text-white/60 hover:text-white hover:bg-noir-light/50"
            )}
          >
            <ItemIcon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-200",
        isScrolled ? "bg-noir shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-wine text-2xl font-bold">D</span>
          <span className="text-white font-light">Barrique</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-noir border-white/10 p-0">
              <div className="flex flex-col space-y-3 py-4 px-6">
                <div className="flex items-center justify-between mb-4">
                  <Link to="/" className="flex items-center">
                    <span className="text-wine text-2xl font-bold">D</span>
                    <span className="text-white font-light">Barrique</span>
                  </Link>
                </div>
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-1">
            <NavItems />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
