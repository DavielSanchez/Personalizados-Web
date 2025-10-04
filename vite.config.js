import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/', // ya que el subdominio apunta a /personalizadosrd
    plugins: [react()],
});
