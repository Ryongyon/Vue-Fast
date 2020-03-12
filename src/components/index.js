/*********************
    自动化注册：组件
**********************/
import Vue from 'vue'

// 模块文件
const moduleFiles = require.context('./modules', true, /\.module\.vue/)

// 遍历文件
moduleFiles.keys().forEach(key => {
    let fileName = key.match(/\.\/(\S*)\.module\.vue/)[1]
    Vue.component(fileName, moduleFiles(key).default || moduleFiles(key))
})
