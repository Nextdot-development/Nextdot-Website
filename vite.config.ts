import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    css: {
      // Keep PostCSS local to this project so home-directory configs are never inherited.
      postcss: {
        plugins: [],
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? '';
            const ext = path.extname(name).toLowerCase();

            if (ext === '.css') {
              return 'assets/styles-[hash][extname]';
            }

            if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }

            if (['.mp4', '.webm', '.ogg', '.mov'].includes(ext)) {
              return 'assets/videos/[name]-[hash][extname]';
            }

            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  };
});
