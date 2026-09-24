import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // The project may live behind a Windows junction/symlink (e.g. packaged-app
    // redirected AppData). Keep Vite from canonicalizing paths so the dev
    // server root and module ids stay consistent.
    preserveSymlinks: true,
  },
  server: {
    // Respect a harness/host-assigned port; fall back to Vite's default.
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion', 'gsap'],
          charts: ['recharts'],
        },
      },
    },
  },
})
