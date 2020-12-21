
//额外的配置 webpack打包会将此配置合并到默认配置中
module.exports = {
  configureWebpack: {
    resolve: {
      //路径别名  @路径为src目录
      alias: {
        'assets' : '@/assets',
        'common' : '@/common',
        'network' : '@/network',
        'components' : '@/components',
        'views' : '@/views'
      }
    }
  }
}
