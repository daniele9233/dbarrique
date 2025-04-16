
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WineBotAI from '@/components/wine-bot/WineBotAI';

const WineBot = () => {
  return (
    <div className="min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-2">Wine Sommelier AI</h1>
        <p className="text-center text-gray-400 mb-12">Suggerimenti di abbinamenti cibo-vino dalla tua cantina personale</p>
        
        <WineBotAI />
      </main>
      
      <Footer />
    </div>
  );
};

export default WineBot;
