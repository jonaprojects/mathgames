import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "kefel.vercel.app",
  appName: "חשבון קליל (לוח הכפל)",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
