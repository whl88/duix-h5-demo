module.exports = {
  publicPath: '/duix-sdk-demo',
  assetsDir: 'static',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'DUIX-DEMO'
        return args
      })
  },
  devServer: {
    inline:true,
    https: true
  }
}