import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { VitePWA } from 'vite-plugin-pwa'
import dotenv from 'dotenv'
import manifest from './manifest';


dotenv.config()


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({ 
    registerType: 'autoUpdate',
    manifest
   })
   ,react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  define: {
    '__GMAPS_API_KEY__': `"${process.env.GMAPS_API_KEY}"`,
  }
})
