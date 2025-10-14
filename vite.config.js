import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Optimización de build para mejor SEO y performance
  build: {
    // Minificar código
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true
      }
    },
    
    // Optimizar chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['react-icons']
        }
      }
    },
    
    // Generar source maps para debugging
    sourcemap: false,
    
    // Tamaño de chunk warnings
    chunkSizeWarningLimit: 1000
  },
  
  // Optimización de assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],
  
  // Configuración del servidor de desarrollo
  
  // Preview server
  preview: {
    port: 4173,
    open: true
  }
})
