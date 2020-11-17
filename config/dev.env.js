'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const config  = require('./index');
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://www.emsapi.norain.top/api/"',

  STATIC_URL: '"' + config.dev.assetsPublicPath + config.dev.assetsSubDirectory + '/"'
})
