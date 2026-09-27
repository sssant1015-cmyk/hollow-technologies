import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the site under /hollow-technologies/ — build asset paths
  // must match. Dev (command === 'serve') stays at root.
  base: command === 'build' ? '/hollow-technologies/' : '/',
  build: {
    target: 'es2022',
  },
}));
