import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'App2Frontend',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
