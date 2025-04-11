import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/maxbitsolution-test/',
  server: {
    proxy: {
      '/api': {
        target: 'https://www.thecocktaildb.com/api/json/v1/1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
