import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 
// PUT YOUR ANTHROPIC API KEY HERE ↓
const ANTHROPIC_API_KEY = "sk-ant-YOUR-KEY-HERE"
// Get your key from: https://console.anthropic.com/settings/keys
// 

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Don't proxy /api/chat — that goes to Anthropic
        bypass: (req) => {
          if (req.url.startsWith('/api/chat')) return req.url;
        }
      },
      '/api/chat': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        secure: true,
        rewrite: () => '/v1/messages',
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Remove browser headers that confuse the API
            proxyReq.removeHeader('origin')
            proxyReq.removeHeader('referer')
            // Set required Anthropic headers
            proxyReq.setHeader('x-api-key', ANTHROPIC_API_KEY)
            proxyReq.setHeader('anthropic-version', '2023-06-01')
            proxyReq.setHeader('content-type', 'application/json')
          })
          proxy.on('error', (err) => {
            console.error('Proxy error:', err.message)
          })
        }
      }
    }
  }
})
