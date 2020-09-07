'use strict'
const utils = require('./utils')

const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? '#source-map'
  : 'cheap-module-eval-source-map'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
