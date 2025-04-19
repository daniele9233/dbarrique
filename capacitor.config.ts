
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
      launchShowDuration: 2000,
      backgroundColor: "#121212",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#8C1C13",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#121212"
    }
  },
  android: {
    backgroundColor: "#121212"
  }
};

export default config;
