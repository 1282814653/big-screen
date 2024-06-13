import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// 自动导入 API
import AutoImport from 'unplugin-auto-import/vite'
// Vue 的按需组件自动导入
import Components from 'unplugin-vue-components/vite'

import { viteMockServe } from 'vite-plugin-mock'

// 1. svg 使用方式一 ElementPlus组件 按需引入 无需再 main.js  中 use
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// 2. svg 使用方式二
import svgLoader from 'vite-svg-loader'

// 3. svg 使用方式三  配置 本地 图标
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 5. svg 使用方式五 Icon 自动导入 配置 iconify 和 elementPlus icon
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'

function resolvePathDir(dir) {
  return path.join(__dirname, dir)
  // return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const env = loadEnv(mode, process.cwd())
  let isDev = env.VITE_USER_NODE_ENV == 'development' ? true : false

  return {
    base: isDev ? '/' : './',

    // 插件
    plugins: [
      vue({
        reactivityTransform: true
      }),
      VueDevTools(),
      svgLoader(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        resolvers: [ElementPlusResolver()],
        vueTemplate: true // 是否在 vue 模板中自动导入
      }),
      Components({
        // 全局组件导入 自动导入 组件目录
        dirs: ['./src/components/'],
        extensions: ['vue'],
        deep: true, // 搜索子目录
        dts: false, // 不使用ts
        include: [/\.vue$/, /\.vue\?vue/], // 只识别vue文件
        directoryAsNamespace: true, // 命名冲突
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            // prefix: 'icon', // 设置图标组件的默认前缀 不设置 为 i
            customCollections: ['wm'], // 设置自定义图标集合
            enabledCollections: ['ep', 'twemoji']
          })
        ]
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // iconDirs: [fileURLToPath(new URL('./src/icons', import.meta.url))],
        // 指定symbolId格式
        symbolId: 'icon-[name]'
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        customCollections: {
          wm: FileSystemIconLoader('./src/icons') // 获取本地 图标路径
        }
      }),

      viteMockServe({
        mockPath: 'mock', // 设置模拟数据的存储文件夹，如果不是index.js需要写明完整路径
        logger: true, // 是否在控制台显示请求日志
        enable: command === 'serve'
      })
    ],
    //
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      // 导入时想要省略的扩展名列表
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },

    // 运行服务的配置
    server: {
      host: 'localhost', // 服务器地址 可设置为"0.0.0.0"
      port: Number(env.VITE_APP_PORT), // 端口号
      open: true, // 自动打开浏览器
      cors: true, // 跨域设置为 true
      strictPort: false, //  严格的端口号 true 时若端口已被占用则会直接退出, false 时端口占用后启动一个新的端口
      hmr: true, // 开启热更新
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: false, // 开启 websockets
          secure: true, // 如果是https接口，需要配置这个参数
          rewrite: (path) => path.replace(/^\/api/, '')
          // rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        }
      }
    },
    css: {
      devSourcemap: false, // 是否将 source map 文件输出到单独的文件夹中
      sourceMap: isDev ? true : false, // 开启 CSS source maps?
      preprocessorOptions: {
        sass: {
          // additionalData: `@import "@/styles/variables.less";` // 全局引入变量
        }
      }
    },
    // 打包配置
    build: {
      target: 'es2015', // 设置最终构建的浏览器兼容目标
      outDir: 'dist', // 指定构建输出目录，默认为 'dist'。
      assetsDir: 'assets', // 指定静态资源的输出目录，默认为 'assets'。
      sourcemap: isDev ? true : false, // 构建后是否生成 source map 文件
      assetsInlineLimit: 4096, // 设置资源阈值，小于该值将内联为 base64 编码，避免额外的 http 请求
      chunkSizeWarningLimit: 2000, //  chunk 大小警告的限制（以 kb 为单位）
      reportCompressedSize: isDev ? false : true, // 启用/禁用 gzip 压缩大小报告
      emptyOutDir: true, // 是否清空 outputDir 在构建之前
      minify: 'terser', // 混淆器，terser构建后文件体积更小 只需要安装不需要再此页面引入
      terserOptions: {
        // 压缩配置
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true // 生产环境移除debugger
        }
      },
      rollupOptions: {
        // rollup 打包配置
        output: {
          //  分包 把 大于 2000kb 的文件进行分包
          manualChunks(id) {
            // 分割代码
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  }
})
