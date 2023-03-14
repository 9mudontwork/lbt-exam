import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  //   host: true,
  //   strictPort: true,
  //   port: 5173,
  // },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros'],
      },
    }),
    Icons({
      defaultClass: 'unplugin-icon',
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
