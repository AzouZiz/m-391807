
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1db1430852a34b8ab6217c8446946a19',
  appName: 'm-391807',
  webDir: 'dist',
  server: {
    url: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://1db14308-52a3-4b8a-b621-7c8446946a19.lovableproject.com',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'android/app/release-key.keystore',
      keystorePassword: 'password',
      keystoreAlias: 'release',
      keystoreAliasPassword: 'password',
      releaseType: 'APK'
    },
    path: 'android'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
