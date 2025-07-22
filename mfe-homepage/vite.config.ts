import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSingleSpa from 'vite-plugin-single-spa'

export default defineConfig({
  server: {
    port: 9001,
    hmr: false
  },
  plugins: [
    react(),
    vitePluginSingleSpa({
      orgName: 'bytebank-grupo-15',
      projectName: 'homepage',
      spaEntryPoints: ['src/main.tsx']
    })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `bytebank-grupo-15-dashboard.js`
      }
    }
  }
})