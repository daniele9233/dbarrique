
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.285a4ef4e63b4322845ddac63d747e2b',
  appName: 'dbarrique',
  webDir: 'dist',
  server: {
    url: 'https://285a4ef4-e63b-4322-845d-dac63d747e2b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000
    }
  }
};

export default config;
