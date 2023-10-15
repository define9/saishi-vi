import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        version: '0.0.1',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          '*://saishi.cnki.net/exam/*',
          '*://saishi.cnki.net/m/exam/*',
          '*://saishi.cnki.net/PaperIndex/*',
        ],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://qdu-soft.syhu.com.cn/api',
        changeOrigin: true,
      }
    }
  }
});
