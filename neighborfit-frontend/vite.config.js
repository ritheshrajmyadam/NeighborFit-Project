import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* //actual code
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',  // Your backend URL
    },
  },
})*/
//added code
export default defineConfig({
  plugins: [react()],
})
