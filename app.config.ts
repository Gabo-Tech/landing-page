import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    routeRules: {
      '/': { swr: 300 },
      '/about': { swr: 3600 },
      '/contact': { swr: 600 },
      '/services': { swr: 900 },
      '/work': { swr: 900 },
      '/web-development': { swr: 1800 },
      '/ecommerce-development': { swr: 1800 },
      '/performance-seo': { swr: 1800 },
      '/privacy': { swr: 86400 },
      '/terms': { swr: 86400 },
      '/admin/**': {
        headers: {
          'cache-control': 'no-store',
        },
      },
      '/api/admin/**': {
        headers: {
          'cache-control': 'no-store',
        },
      },
      '/api/content/**': {
        headers: {
          'cache-control': 'no-store',
        },
      },
    },
  },
});
