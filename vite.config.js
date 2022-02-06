import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: ['.js', '.json', '.ts', '.vue']
  },
  plugins: [vue()]
})
