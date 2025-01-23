import { defineConfig } from 'astro/config'
import unocss from '@unocss/astro'
import solidJs from '@astrojs/solid-js'

import node from '@astrojs/node'
import AstroPWA from '@vite-pwa/astro'
import disableBlocks from './plugins/disableBlocks'

import { loadEnv } from "vite";


const { PUBLIC_HTTPS_PROXY } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

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
    port: 80,
  },
  vite: {
    plugins: [
      process.env.OUTPUT === 'vercel' && disableBlocks(),
      process.env.OUTPUT === 'netlify' && disableBlocks(),
    ],
    server: {
      proxy: {
        '/api': {
          target: PUBLIC_HTTPS_PROXY, // 替换为你的后端服务器地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})
