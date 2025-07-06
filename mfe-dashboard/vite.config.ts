import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSingleSpa from 'vite-plugin-single-spa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: false
  },
  plugins: [
    react(),
    vitePluginSingleSpa({
      serverPort: 9002,
      spaEntryPoints: ['src/main.tsx']
    })
  ],
})
