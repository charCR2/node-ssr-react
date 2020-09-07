const vueLoaderConfig = require('./vue-loader.conf')

module.exports = {
  resolve: {
      extensions: ['.vue'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
  },

  // 模块
  module:{
      rules:[
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
      ]
  },

}