
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero section */}
        <section className="section relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-noir-dark via-noir-dark/80 to-noir-dark"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h4 className="text-wine uppercase tracking-[0.2em] text-sm mb-3 opacity-0 animate-fade-in">Our Story</h4>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 opacity-0 animate-fade-in animate-delay-100">About Vino Nero</h2>
              <p className="text-white/80 mb-6 leading-relaxed opacity-0 animate-fade-in animate-delay-200">
                Vino Nero began as a passion project, born from a love of exceptional wines and the stories they tell. What started as a small personal collection has grown into a carefully curated showcase of the world's finest vineyards.
              </p>
              <p className="text-white/80 mb-8 leading-relaxed opacity-0 animate-fade-in animate-delay-300">
                Each bottle in our cellar has been selected with care, representing the pinnacle of its region and vintage. We believe that great wine is not just a beverage, but an experience that connects us to the land, the culture, and the artisans who craft it.
              </p>
              <Link to="/collection" className="inline-flex items-center text-wine hover:text-wine-light transition-colors duration-300 group opacity-0 animate-fade-in animate-delay-400">
                <span>Explore the collection</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="md:w-1/2 relative opacity-0 animate-fade-in animate-delay-300">
              <div className="aspect-square max-w-md mx-auto relative wine-glass rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1651143814186-1ad52f0c3362?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="Wine cellar"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Philosophy section */}
        <section className="section bg-noir-light">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl mb-8 opacity-0 animate-fade-in">Our Philosophy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality",
                  description: "We believe in quality over quantity, selecting only the most exceptional wines for our collection."
                },
                {
                  title: "Preservation",
                  description: "Our cellar is maintained at the perfect temperature and humidity to ensure each wine ages gracefully."
                },
                {
                  title: "Appreciation",
                  description: "We celebrate the artistry of winemaking and the unique character each bottle brings to the table."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-lg border border-white/5 opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <h3 className="text-xl font-medium mb-4 text-wine">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats section */}
        <section className="section">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "250+", label: "Bottles" },
              { value: "12", label: "Countries" },
              { value: "45", label: "Regions" },
              { value: "25", label: "Years of Experience" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-serif text-wine mb-2">{stat.value}</div>
                <div className="text-white/60 uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
