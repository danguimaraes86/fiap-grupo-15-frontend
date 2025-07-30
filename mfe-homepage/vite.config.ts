import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSingleSpa from 'vite-plugin-single-spa'

export default defineConfig({
  base: './',
  server: {
    hmr: false,
    port: 9001
  },
  plugins: [
    react(),
    vitePluginSingleSpa({
      serverPort: 9001,
      spaEntryPoints: ['src/main.tsx']
    })
  ],
  esbuild: {
    target: 'es2022',
  },
  build: {
    target: 'es2022',
  }
})