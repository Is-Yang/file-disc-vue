module.exports = {
    devServer: {
      host: 'localhost',
      port: 8081,
      proxy: {
        '/': {
          target: 'http://47.112.111.9', 
          changeOrigin: true,
        }
      }
    },
  }