import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueGlobalComponent  from "unplugin-vue-components/vite"
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import { VitePWA as vitePWA } from 'vite-plugin-pwa'
import vitePersist from 'vite-plugin-optimize-persist'
import vitePackageAccess from 'vite-plugin-package-config'
import vitePackageVersion from 'vite-plugin-package-version'
import viteChecker from 'vite-plugin-checker'
import viteFonts from 'vite-plugin-fonts'
import windiCSS from 'vite-plugin-windicss'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueI18n({
      include: resolve(__dirname, "./src/lang/**"),
      runtimeOnly: false
    }),
    vueGlobalComponent({
      dts: true,
      resolvers: [HeadlessUiResolver()],
    }),
    windiCSS(),
    viteChecker({ vueTsc: true }),
    viteFonts({
      google: {
        families: [{
          name: 'Raleway',
          styles: 'wght@200;400;700',
          defer: true
        }, {
          name: 'Poppins',
          styles: 'wght@200;400;700',
          defer: true
        }]
      },
    }),
    vitePersist(),
    vitePackageAccess(),
    vitePackageVersion(),
    vitePWA({
      base: '/',
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
      manifest: {
        name: 'Better Write',
        short_name: 'Better Write',
        description: 'A editor for creative writers.',
        theme_color: '#1F2937',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
      workbox: {
        sourcemap: false  
      } 
    })
  ],
  build: {
    outDir: resolve(__dirname, 'dist/render'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 3000, // pdfmake
    minify: 'esbuild',
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      strict: false,
    },
    hmr: {
      overlay: false
    }
  },
});
