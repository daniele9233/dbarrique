
import { Link } from 'react-router-dom';
import { Grape, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-noir-dark border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Grape className="h-8 w-8 text-wine" />
              <span className="font-serif text-xl">DBarrique</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              A personal wine cellar management system for the discerning collector. 
              Store, track, and showcase your finest wines.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="font-medium text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-wine transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-white/60 hover:text-wine transition-colors duration-300">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 hover:text-wine transition-colors duration-300">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact and Social */}
          <div>
            <h4 className="font-medium text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-wine flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-wine flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@dbarrique.com" 
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-wine flex items-center justify-center transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white/60 text-sm">
              Contact: <a href="mailto:info@dbarrique.com" className="hover:text-wine">info@dbarrique.com</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © {currentYear} DBarrique. All rights reserved.
          </p>
          <p className="text-white/40 text-sm mt-2 md:mt-0">
            Designed with <span className="text-wine">♥</span> for wine lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
