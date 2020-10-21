const vueHandle = require('../middleware/html-handle/vue-handle')
const path = require('path')
import { vueHandleDefault } from './vueDemo'

exports.routerDemoHeadler = vueHandle({
    htmlPath: path.resolve(path.join(__dirname, '../../client/dist/vueDemo.html')),
    store: require('../../client/sites/vueDemo/src/store').default,
    defaultHandlers: [ vueHandleDefault ]
})

// module.exports = [
//     ["GET", "/routerDemo/*", routerDemoHeadler]
// ]