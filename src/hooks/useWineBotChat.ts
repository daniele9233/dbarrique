
import { useState, useEffect } from 'react';
import { loadWinesFromFirestore } from '@/data/services/wineService';
import { Wine } from '@/data/models/Wine';
import { findWinePairings } from '@/services/winePairingService';
import { toast } from "@/hooks/use-toast";

interface ChatMessage {
  text: string;
  isBot: boolean;
}

export const useWineBotChat = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [recommendations, setRecommendations] = useState<(Wine & { matchScore: number })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Carica i vini all'avvio
  useEffect(() => {
    const loadWines = async () => {
      try {
        const loadedWines = await loadWinesFromFirestore();
        setWines(loadedWines);
      } catch (error) {
        console.error('Errore nel caricamento dei vini:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare i vini dalla cantina",
          variant: "destructive"
        });
      }
    };
    
    loadWines();
  }, []);
  
  const analyzeFood = (food: string): string => {
    const foodLower = food.toLowerCase();
    
    if (foodLower.includes('carne rossa') || foodLower.includes('manzo') || 
        foodLower.includes('bistecca') || foodLower.includes('agnello')) {
      return `Per un piatto a base di ${food}, consiglio generalmente un vino rosso corposo con buona struttura. Ideali sono i vini con tannini evidenti che bilanciano la grassezza della carne.`;
    }
    
    if (foodLower.includes('pesce') || foodLower.includes('frutti di mare') ||
        foodLower.includes('crostacei')) {
      return `Con ${food}, si abbinano perfettamente vini bianchi freschi e minerali o spumanti. La loro acidità e leggerezza complementano il sapore delicato dei piatti di mare.`;
    }
    
    if (foodLower.includes('pollo') || foodLower.includes('tacchino') || 
        foodLower.includes('maiale')) {
      return `Per ${food}, suggerisco vini di medio corpo, che possono essere sia rossi leggeri che bianchi strutturati, a seconda della preparazione e dei condimenti.`;
    }
    
    if (foodLower.includes('pasta') || foodLower.includes('pizza') || 
        foodLower.includes('risotto')) {
      return `Per ${food}, la scelta dipende molto dal condimento. In generale, un vino di medio corpo con buona acidità si abbina bene con molti piatti italiani.`;
    }
    
    if (foodLower.includes('formaggio') || foodLower.includes('formaggi')) {
      return `Per i ${food}, l'abbinamento varia molto in base al tipo e alla stagionatura. I formaggi freschi prediligono vini bianchi o spumanti, mentre quelli stagionati si abbinano meglio con rossi strutturati.`;
    }
    
    if (foodLower.includes('dessert') || foodLower.includes('dolce')) {
      return `Per i ${food}, consiglio vini dolci o spumanti dolci che possono bilanciare la dolcezza del piatto creando un'armonia di sapori.`;
    }
    
    // Risposta generica
    return `Ho analizzato il tuo piatto "${food}" e cercherò di trovare il miglior abbinamento dalla tua cantina personale.`;
  };
  
  const sendMessage = async (text: string) => {
    if (text.trim() === '') return;
    
    // Aggiungi il messaggio dell'utente
    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsLoading(true);
    
    try {
      // Simula un ritardo per l'elaborazione dell'AI (per UX più naturale)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Genera l'analisi del cibo
      const foodAnalysis = analyzeFood(text);
      
      // Cerca abbinamenti nei vini disponibili
      const winePairings = findWinePairings(wines, text);
      
      // Crea la risposta del bot
      let botResponse = foodAnalysis + '\n\n';
      
      if (winePairings.length > 0) {
        botResponse += `Ho trovato ${winePairings.length} vini nella tua cantina che si abbinano perfettamente a questo piatto.`;
        setRecommendations(winePairings);
      } else {
        botResponse += "Purtroppo non ho trovato vini nella tua cantina che si abbinino particolarmente bene con questo piatto. Prova a descrivere un altro piatto o aggiungi nuovi vini alla tua collezione.";
        setRecommendations([]);
      }
      
      // Aggiungi la risposta del bot
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      console.error('Errore nell\'elaborazione della richiesta:', error);
      setMessages(prev => [...prev, { 
        text: "Mi dispiace, si è verificato un errore nell'elaborazione della tua richiesta. Riprova più tardi.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    recommendations,
    sendMessage,
    isLoading
  };
};
