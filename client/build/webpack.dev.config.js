const webpackMerge = require("webpack-merge");
const path = require('path')
const baseWebpackConfig = require("./webpack.config")
const Paths = require("../../config/paths");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const utils = require('./utils')
const LiveReloadPlugin = require("webpack-livereload-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')


module.exports = webpackMerge.merge(baseWebpackConfig,{
    // 指定构建环境  
    mode:"development",
    devtool: "cheap-module-eval-source-map",
    // 出口
    output: {
      path : utils.resolve("../dist"),
      filename: "[name].js",
      chunkFilename: '[name].chunk.js',
      publicPath: "/" // 打包后的资源的访问路径前缀
    },
    // 插件
    plugins:[
      new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
      //在打包结束的时候，会启动启动一个服务在浏览器查看打包的大小和包含的内容等
      new MiniCssExtractPlugin({
        // 类似 webpackOptions.output里面的配置 可以忽略
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new LiveReloadPlugin({
        appendScriptTag: true,
        ignore: /\.(map|ttf|eot|woff|woff2|png|jpg|gif|svg)$/
      }),
      // 缓存编译结果
      new HardSourceWebpackPlugin({
        info: {
          // 'none' or 'test'.
          mode: 'none',
          // 'debug', 'log', 'info', 'warn', or 'error'.
          level: 'info',
        },
      }),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        {
          test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
        },
      ]),
    ],

  //   devServer: {
  //     historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
  //     hot: true,
  //     contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
  //     compress: true, // 一切服务都启用gzip 压缩：
  //     port: "8081", // 指定段靠谱
  //     publicPath: "/", // 访问资源加前缀
  //     proxy: {
  //         // 接口请求代理
  //     },

  // }
});