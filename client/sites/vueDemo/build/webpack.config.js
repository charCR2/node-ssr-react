const vueLoaderConfig = require('./vue-loader.conf')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const path = require('path') 
//__dirname表示文件相对于工程的路径
module.exports = {
    resolve: {
      extensions: ['.vue'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, '../src')  //给src目录起个别名@ ，引用src目录的时候，可用@替代
      }
  },
  plugins:[
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
       {//通过vue-loader来识别以vue结尾的文件
         test: /.vue$/, 
         loader: 'vue-loader',
        //  options: vueLoaderConfig
       },
       {
        test: /\.(styl|stylus)$/, 
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
    ]
  }
}
