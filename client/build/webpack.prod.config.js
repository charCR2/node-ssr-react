const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config")

const {CleanWebpackPlugin} = require('clean-webpack-plugin') 
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer') 
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin =require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = webpackMerge.merge(baseWebpackConfig,{
    // 指定构建环境  
    mode:"production",
    devtool: 'cheap-module-source-map',
    optimization: {
      splitChunks: {
        // async表示只从异步加载得模块（动态加载import()）里面进行拆分
        // initial表示只从入口模块进行拆分
        // all表示以上两者都包括
        chunks: "all",
        minSize: 30000,   // 大于30k会被webpack进行拆包
        minChunks: 1,     // 被引用次数大于等于这个次数进行拆分
        // import()文件本身算一个
        // 只计算js，不算css
        // 如果同时有两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
        maxAsyncRequests: 5,  // 最大的按需加载（异步）请求次数
        // 最大的初始化加载请求次数,为了对请求数做限制，不至于拆分出来过多模块
        // 入口文件算一个
        // 如果这个模块有异步加载的不算
        // 只算js，不算css
        // 通过runtimeChunk拆分出来的runtime不算在内
        // 如果同时又两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
        maxInitialRequests: 5,
        automaticNameDelimiter: '~', // 打包分隔符
        name:true,
        cacheGroups: {
            // 默认的配置
            // vendors: {
            //     test: /[\\/]node_modules[\\/]/,
            //     priority: -10
            // },
            antdui: {
              priority: 2,  
              test: /[\\/]node_modules[\\/](antd)[\\/]/,  //(module) => (/antd/.test(module.context)),
            },
            // 拆分基础插件
            basic: {
                priority: 3, 
                test: /[\\/]node_modules[\\/](moment|react|react-dom|react-router|react-router-dom|axios|redux|react-redux|lodash)[\\/]/,
            },
            // 默认的配置，vendors规则不命中的话，就会命中这里
            default: {
                minChunks: 2, // 引用超过两次的模块 -> default
                priority: -20,
                reuseExistingChunk: true
            },
        },
      },
      // 压缩css
      minimizer: [
          new OptimizeCSSAssetsPlugin({
              cssProcessorOptions: { 
                  discardComments: { removeAll: true } // 移除注释
              } 
          }),
          
          // 自定义js优化配置，将会覆盖默认配置
          new UglifyJsPlugin({
            parallel: true,  //使用多进程并行运行来提高构建速度
            sourceMap: false,
            uglifyOptions: {
                warnings: false,
                compress: {
                    unused: true,
                    drop_debugger: true,
                    drop_console: true, 
                },
                output: {
                    comments: false // 去掉注释
                }
            }
          })
      ]
    },
    
    // 插件
    plugins:[
      new MiniCssExtractPlugin({
        // 类似 webpackOptions.output里面的配置 可以忽略
        filename: '[name].[hash].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
      //在打包的时候会删除之前的打包目录
      new CleanWebpackPlugin(),
      //在打包结束的时候，会启动启动一个服务在浏览器查看打包的大小和包含的内容等
      new BundleAnalyzerPlugin(),
    ],
})