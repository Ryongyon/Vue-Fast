module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'static',
  // 生产环境生成 Source Map
  productionSourceMap: false,
  // CSS 预处理器配置
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/variables.scss";`
      }
    }
  },
  // Webpack 相关配置
  configureWebpack: {
    // 配置 webpack-dev-server 行为
    devServer: {
      // 本地代理
      /* proxy: {
        '/proxy': {
          target: 'https://api.example.com',
          changeOrigin: true,
          pathRewrite: {
            '^/proxy': ''
          }
        }
      } */
    }
  }
}
