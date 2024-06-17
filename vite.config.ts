import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

//todo перенести index.html в директорию public
export default defineConfig({
  // root: 'public',
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve('src/'),
    },
  },
  // build: {
  //   outDir: 'dist',
  //   rollupOptions: {
  //     input: 'public/index.html',
  //   },
  // },
})
