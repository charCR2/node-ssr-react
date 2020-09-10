// const requireContext = require('require-context')
// const path = require('path')
 
// const router = requireContext(path.join(__dirname,'./routes'), false, /.js$/);
// router.keys().forEach( (key) => {
//   exports[key] = router[key]
// })
const path = require('path')
const defaultRouterParams = ( fn ) => {
  let params;
  typeof fn == 'function' ? params = fn() : params = fn
  
  let defaultParams = {
    // 入口
    main: path.join( __dirname, `../client/sites/${params.name}` ),
    // 是否有自定义配置文件
    haveWebpackConfig: false
  }
  return {
    ...defaultParams,
    ...params
  }
}

module.exports = [
  defaultRouterParams({
    name: 'routerDemo',
    discribe: 'react 实例',
    path: '/routerDemo'
  }),

  defaultRouterParams({
    name: 'todolist',
    discribe: '列表demo',
    path: '/todolist'
  }),

  defaultRouterParams({
    name: 'vueDemo',
    discribe: 'vue 实例',
    path: '/vueDemo',
    haveWebpackConfig: true
  }),
]