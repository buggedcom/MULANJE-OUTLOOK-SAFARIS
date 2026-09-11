import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built static site works at any path (root or a
// GitHub Pages subpath). HashRouter keeps client routing off the server.
export default defineConfig({
  base: './',
  plugins: [react()],
});
