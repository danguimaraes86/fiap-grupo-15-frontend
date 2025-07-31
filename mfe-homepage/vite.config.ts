import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSingleSpa from 'vite-plugin-single-spa'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

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
    }),
    cssInjectedByJsPlugin()
  ],
  build: {
    target: 'es2022',
  }
})