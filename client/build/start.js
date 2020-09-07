const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production' 
const sites = require('../../config/router')
const { merge } = require("webpack-merge");
const router = require('../../config/router')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const requireContext = require('require-context')
const path = require('path')
 
// const router = requireContext(path.join(__dirname,'./routes'), false, /.js$/);
// router.keys().forEach( (key) => {
//   exports[key] = router[key]
// })
const config = 
isProd 
? require('./webpack.prod.config')
: require('./webpack.dev.config')

console.log('当前环境' +  process.env.NODE_ENV)
// chunk排序方法
// const chunkSortFun = sortChunksKeys => {
// 	if (!sortChunksKeys || !sortChunksKeys.length) {
// 		return "dependency";
// 	}
// 	return (chunk1, chunk2) => {
// 		let orders = sortChunksKeys;
// 		let order1 = orders.indexOf(chunk1.names[0]);
// 		let order2 = orders.indexOf(chunk2.names[0]);

// 		if (order1 > order2) {
// 			return 1;
// 		} else if (order1 < order2) {
// 			return -1;
// 		} else {
// 			return 0;
// 		}
// 	};
// };

// 创建html-webpack-plugin实例方法
const newHtmlWebpackPlugin = config => {
	// let chunks = ['manifest', 'wechat_react_common', 'wechat_react_vendor', 'common', config.bundle];
    const chunks = [config.name, 'runtime', 'vendors', 'common', config.bundle ];
    let params = {
        filename: `${config.name}.html`,
		template: path.join(config.template, "/index.html"),
		chunks: chunks,
		// chunksSortMode: chunkSortFun(chunks),
		inject: true,
		showErrors: true,
    }
    if(isProd){
        params.hash = true;// 在打包的资源插入html会加上hash
        //  html 文件进行压缩
        params.minify =  {
            removeComments: true,               //去注释
            collapseWhitespace: true,           //压缩空格
            removeAttributeQuotes: true         //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
        }
    } 
	return new HtmlWebpackPlugin(params);
};

const entryMap = {	vendors: [ 'react', 'react-dom', 'redux', 'react-router-dom', 'react-redux'] };
const htmlMap = [];

// const configMap = requireContext(path.join(__dirname,'./routes'), false, /.js$/);
router.forEach( item => {
    entryMap[item.name] = path.join(item.main ,'/index.js');
    htmlMap.push( newHtmlWebpackPlugin({name: item.name, bundle: item.name + '_bundle', template: item.main }) )
})

const filly = merge(
  config, 
  require("../sites/vueDemo/build/webpack.config"), 
  {
    entry: entryMap,
    plugins: [ ...htmlMap ],
  }
)
console.log(filly.module.rules)

function start () {
  const compiler = webpack(filly);
  console.log('开始编译dev·····')

  if(isProd){
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
      }
    })
  }else{
    compiler.watch({}, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
        console.log(stats.toString({
            colors: true,    // 在控制台展示颜色
            modules: false,
            cachedAssets: false,
            cached: false,
            children: false,
            chunkOrigins: false,
            chunkModules: false,
        }))
      }else{
        const statJson = stats.toJson()
        // console.log(stats.toJson({
        //   assets: true,  // 添加资源信息
        //   chunks: false,  // 使构建过程更静默无输出
        //   colors: true,    // 在控制台展示颜色
        //   modules: false,
        //   cachedAssets: false,
        //   cached: false,
        //   children: false,
        //   chunkOrigins: false,
        //   chunkModules: false,
        // }));
        // console.log('编译结束·····')
        console.log(`编译结束,用时 --- ${statJson.time}ms`)
        // console.log(stats.toString({
        //     assets: true,  // 添加资源信息
        // }))
      }
    });
  }
}

start()