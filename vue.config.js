const path = require('path')
const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')

const pathSrc = path.resolve(__dirname, 'src')

module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        views: '@/views'
      }
    },
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://152.136.185.210:5000',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    },
    plugins: [
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],

        imports: ['vue', 'vue-router'],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      // 让unplugin-icons自动安装图标库
      Icons({
        autoInstall: true
      })
    ]
  }
})
