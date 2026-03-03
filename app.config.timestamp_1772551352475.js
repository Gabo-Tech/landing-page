// app.config.ts
import { defineConfig } from "@solidjs/start/config";
var app_config_default = defineConfig({
  server: {
    routeRules: {
      "/": { swr: 300 },
      "/about": { swr: 3600 },
      "/contact": { swr: 600 },
      "/privacy": { swr: 86400 },
      "/terms": { swr: 86400 },
      "/admin/**": {
        headers: {
          "cache-control": "no-store"
        }
      },
      "/api/admin/**": {
        headers: {
          "cache-control": "no-store"
        }
      },
      "/api/content/**": {
        headers: {
          "cache-control": "no-store"
        }
      }
    }
  }
});
export {
  app_config_default as default
};
