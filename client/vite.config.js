import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      // Requests starting with /api will be proxied
      '/api': {
        target: 'http://localhost:5000', // <--- CHANGE THIS to your actual backend server address and port
        changeOrigin: true, // Recommended for virtual hosted sites
        // secure: false,      // Uncomment if your backend server is not using HTTPS
        // rewrite: (path) => path.replace(/^\/api/, '') // Uncomment if your backend routes DON'T start with /api (e.g., backend expects /auth/login instead of /api/auth/login)
      }
    }
  }
})
