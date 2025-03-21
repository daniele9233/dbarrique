
import Hero from '@/components/Hero';
import WineCollection from '@/components/WineCollection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wine, Award, Calendar, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Feature section */}
        <section className="section bg-noir-light">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Wine className="h-8 w-8 text-wine" />, 
                title: "Curated Selection", 
                description: "Each bottle carefully selected for quality and character." 
              },
              { 
                icon: <Award className="h-8 w-8 text-wine" />, 
                title: "Premium Quality", 
                description: "Only the finest vintages make it to our collection." 
              },
              { 
                icon: <Calendar className="h-8 w-8 text-wine" />, 
                title: "Perfect Aging", 
                description: "Stored in optimal conditions for the perfect maturation." 
              },
              { 
                icon: <Star className="h-8 w-8 text-wine" />, 
                title: "Expert Ratings", 
                description: "Wines scored by industry leading sommeliers." 
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-noir-dark p-8 rounded-lg border border-white/5 group hover:border-wine/30 transition-colors duration-300 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-5 w-16 h-16 rounded-full bg-wine/10 flex items-center justify-center group-hover:bg-wine/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Featured wines section */}
        <WineCollection limit={3} />
        
        {/* Quote section */}
        <section className="section bg-noir-light relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="font-serif text-6xl text-wine opacity-20 mb-4">"</div>
            <blockquote className="font-serif text-2xl md:text-3xl italic mb-6 opacity-0 animate-fade-in">
              Wine is one of the most civilized things in the world and one of the most natural things of the world that has been brought to the greatest perfection.
            </blockquote>
            <cite className="block text-wine not-italic font-medium opacity-0 animate-fade-in animate-delay-200">
              Ernest Hemingway
            </cite>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
