import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost'
        }
    },

    plugins: [
        laravel({
            input: ['resources/scss/app.scss', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
        }
    }
});
