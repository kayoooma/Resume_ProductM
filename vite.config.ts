import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This ensures assets are loaded correctly on GitHub Pages
  // by using relative paths (e.g., "./assets/..." instead of "/assets/...")
  base: './', 
});