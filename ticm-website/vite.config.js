import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'

  return {
    plugins: [react()],
    // En prod, les appels /api et /storage vont vers VITE_API_BASE_URL
    // En dev, le proxy redirige vers Laravel local
    server: !isProd ? {
      proxy: {
        '/api':     'http://127.0.0.1:8000',
        '/storage': 'http://127.0.0.1:8000',
      },
    } : undefined,
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    },
  }
})
