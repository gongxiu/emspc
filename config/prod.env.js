'use strict'
const config = require('./index');
module.exports = {
  NODE_ENV: '"production"',
  // 打包发布时修改下面地址
  // BASE_API:'"http://localhost:8080/"',
  // BASE_API: '"http://x.ycyh56.com:8080/cargoods-web/"', // JAVA 测试接口
  // PHP_API: '"https://test.api.ycyh56.com/company/"', // PHP 测试接口
  // 违章
  // VIOLATION: '"https://test.api.ycyh56.com"', //测试

  STATIC_URL: '"' + config.build.assetsPublicPath + config.build.assetsSubDirectory + '/"',


  BASE_API: '"https://cargoods.ycyh56.com/cargoods-web/"', // JAVA正式接口
  PHP_API: '"https://api.ycyh56.com/company/"', // PHP 正式接口
  // 违章
  VIOLATION:'"https://api.ycyh56.com"', //正式
}

