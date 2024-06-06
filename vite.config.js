import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    base: './',
    plugins: [
      vue({
        reactivityTransform: true
      }),
      VueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
        vueTemplate: true // 是否在 vue 模板中自动导入
      }),
      Components({
        // 全局组件导入 自动导入 组件目录
        dirs: ['./src/components/'],
        resolvers: [ElementPlusResolver()]
      }),
      viteMockServe({
        // default
        mockPath: 'mock'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      // 导入时想要省略的扩展名列表
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      // host: 'localhost',
      // port: env.VITE_PROT,
      // open: true,
      // cors: true,
      // strictPort:false //  true 时若端口已被占用则会直接退出, false 时端口占用后启动一个新的端口
      // proxy: {
      //     [env.VITE_PROXY_DOMAIN]: {
      //         target: env.VITE_BASE_API,
      //         changeOrigin: true,
      //         // rewrite: (path) => path.replace(/^\/api/, ''),
      //         // rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
      //         rewrite: {
      //             ['^' + env.VITE_BASE_API]: '',
      //         },
      //     },
      // },
    },
    build: {
      target: 'es2015', // 设置最终构建的浏览器兼容目标
      outDir: 'dist', // 指定构建输出目录，默认为 'dist'。
      assetsDir: 'assets', // 指定静态资源的输出目录，默认为 'assets'。
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 2000, //  chunk 大小警告的限制（以 kbs 为单位）
      reportCompressedSize: false // 启用/禁用 gzip 压缩大小报告
    }
  }
})
