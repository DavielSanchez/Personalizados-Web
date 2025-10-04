import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/personalizadosrd/', // ✅ IMPORTANTE para que cargue bien en el subdominio
  plugins: [react()]
})
