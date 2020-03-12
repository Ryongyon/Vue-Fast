/*********************
  自动化注册：公共方法
**********************/
import Vue from 'vue'

// 模块文件
const moduleFiles = require.context('./modules', true, /\.module\.js/)

// 遍历文件
moduleFiles.keys().forEach(key => {
    let fileName = '$' + key.match(/\.\/(\S*)\.module\.js/)[1]
    Vue.prototype[fileName] = moduleFiles(key).default || moduleFiles(key)
})
