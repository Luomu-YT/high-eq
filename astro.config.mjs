import { defineConfig } from 'astro/config'
import unocss from '@unocss/astro'
import solidJs from '@astrojs/solid-js'

import node from '@astrojs/node'
import AstroPWA from '@vite-pwa/astro'
import vercel from '@astrojs/vercel/edge'
import netlify from '@astrojs/netlify/edge-functions'
import disableBlocks from './plugins/disableBlocks'

const envAdapter = () => {
  switch (process.env.OUTPUT) {
    case 'vercel': return vercel()
    case 'netlify': return netlify()
    default: return node({ mode: 'standalone' })
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://Luomu-YT.github.io',
  base: '/',
  integrations: [
    unocss(),
    solidJs(),
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        name: 'high-eq Demo',
        short_name: 'high-eq Demo',
        description: 'A demo repo based on QWen API',
        theme_color: '#212129',
        background_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon.svg',
            sizes: '32x32',
            type: 'image/svg',
            purpose: 'any maskable',
          },
        ],
      },
      client: {
        installPrompt: true,
        periodicSyncForUpdates: 20,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  server: {
    port: 443,
  },
  vite: {
    plugins: [
      process.env.OUTPUT === 'vercel' && disableBlocks(),
      process.env.OUTPUT === 'netlify' && disableBlocks(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://[2408:844e:9d1:22b8:3df0:2428:28c2:273c]:8081', // 替换为你的后端服务器地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})
