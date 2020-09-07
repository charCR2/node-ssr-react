const path = require("path");
const Paths = require("../../config/paths");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const isProd = process.env.NODE_ENV === 'production' 
const babelLoader = `babel-loader?cacheDirectory=${isProd}`

module.exports = {
    // 出口
    output: {
        path : utils.resolve("../dist"),
        filename: "[name].[chunkhash].js",
        chunkFilename: '[id].[chunkhash].js',
        publicPath: "/" // 打包后的资源的访问路径前缀
    },
    resolve: {
        extensions: ['.js', '.json', '.html', 'scss'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
        alias: {
            'config': path.join(__dirname, '../../', "config"), // 在项目中使用@符号代替src路径，导入文件路径更方便
            'utils': path.join(__dirname, '../../', "utils") // 在项目中使用@符号代替src路径，导入文件路径更方便
        }
    },

    // 模块
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: isProd ? 'happypack/loader?id=happyBabel' : babelLoader
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader, // 创建 <style></style>
                        options:{
                            hmr: true, // 开发的时候，修改css热更新，但是试了下不起作用
                            reloadAll:true,
                        }
                    },
                    { 
                        loader: 'css-loader',  // 转换css
                    }
                ]
            },
            
            {
                test: /\.scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader, // 创建 <style></style>
                        options:{
                            hmr: true, // 开发的时候，修改css热更新，但是试了下不起作用
                            reloadAll:true,
                        }
                    },
                    { 
                        loader: 'css-loader',  // 转换css
                    },
                    { 
                        loader: 'sass-loader',  // 转换css
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },

}