import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Listen on all interfaces
    port: 3000, 
    strictPort: true, // Don't try alternate ports if 3000 is taken
    hmr: {
      clientPort: 3000  // Ensure HMR works correctly through Docker
    }
  },
})
