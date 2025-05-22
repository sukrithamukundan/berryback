
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ede44dcabd1940c799faea69df08cfb2',
  appName: 'waste-to-table-connect',
  webDir: 'dist',
  server: {
    url: 'https://ede44dca-bd19-40c7-99fa-ea69df08cfb2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: "#472D21"
  }
};

export default config;
