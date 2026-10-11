import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// Vendors in aparte chunks: ze veranderen zelden en blijven zo in de browsercache bij een nieuwe deploy.
const VENDOR_CHUNKS: Record<string, RegExp> = {
  react: /node_modules\/(react|react-dom|scheduler|react-router)\//,
  supabase: /node_modules\/@supabase\//,
  motion: /node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//,
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [name, pattern] of Object.entries(VENDOR_CHUNKS)) if (pattern.test(id)) return name;
        },
      },
    },
  },
});
