import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
// @ts-ignore
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "assets": resolve(__dirname, "src/assets"),
    },
    extensions: ['.js', '.json', '.ts']
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ]
})
