
import { useState, useEffect } from 'react';

interface FirestoreStatus {
  isOnline: boolean;
  lastSync: Date | null;
  retryCount: number;
  isLoading: boolean;
}

/**
 * Hook to track Firestore connection status
 */
const useFirestoreStatus = (): FirestoreStatus => {
  const [status, setStatus] = useState<FirestoreStatus>({
    isOnline: navigator.onLine,
    lastSync: null,
    retryCount: 0,
    isLoading: false
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: true
      }));
    };

    const handleOffline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: false
      }));
    };

    // Listen for console logs from wineService to track retries
    const originalConsoleWarn = console.warn;
    console.warn = function(message, ...args) {
      originalConsoleWarn.apply(console, [message, ...args]);
      
      if (typeof message === 'string' && message.includes('Operation failed, retrying')) {
        const retryMatch = message.match(/\((\d+)\/\d+\)/);
        if (retryMatch && retryMatch[1]) {
          const retryCount = parseInt(retryMatch[1], 10);
          setStatus(prev => ({
            ...prev,
            retryCount
          }));
        }
      }
    };

    // Listen for console logs from wineService to track sync
    const originalConsoleLog = console.log;
    console.log = function(message, ...args) {
      originalConsoleLog.apply(console, [message, ...args]);
      
      if (typeof message === 'string') {
        if (message.includes('Found') && message.includes('wines in Firestore')) {
          setStatus(prev => ({
            ...prev,
            lastSync: new Date(),
            isLoading: false
          }));
        } else if (message.includes('Loading wines from Firestore')) {
          setStatus(prev => ({
            ...prev,
            isLoading: true
          }));
        }
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      console.warn = originalConsoleWarn;
      console.log = originalConsoleLog;
    };
  }, []);

  return status;
};

export default useFirestoreStatus;
