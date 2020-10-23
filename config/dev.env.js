'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const config  = require('./index');
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.8.111:8080/"', // JAVA 开发配置
  // BASE_API:'"https://x.ycyh56.com/cargoods-web/"', // JAVA测试接口
  // PHP_API: '"http://localhost:8260/company/"', // PHP 开发接口
  // PHP_API: '"http://192.168.8.114:8260/company/"', // PHP 测试接口
  // PHP_API: '"https://test.api.ycyh56.com/company/"', // PHP 测试接口
  BASE_API: '"https://cargoods.ycyh56.com/cargoods-web/"', // JAVA正式接口
    PHP_API: '"https://m.ycyh56.com/php/company/"', // PHP 正式接口

  //违章
  VIOLATION:'"https://test.api.ycyh56.com"', //测试
  // VIOLATION：    '"https://api.ycyh56.com"', //正式
  STATIC_URL: '"' + config.dev.assetsPublicPath + config.dev.assetsSubDirectory + '/"'
})
