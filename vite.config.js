import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
    base: '/',
    plugins: [react()],
    build: {
        minify: 'terser', // usa Terser para poder eliminar logs
        terserOptions: {
            compress: {
                drop_console: mode === 'production',
                drop_debugger: mode === 'production',
            },
        },
    },
}))