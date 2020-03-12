/*********************
    自动化注册：状态
**********************/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 模块列表
const moduleList  = []

// 模块文件
const moduleFiles = require.context('./modules', true, /\.module\.js/)

// 状态缓存
const keepAlive = (name, type) => {
    // 判断缓存方式
    const storageRules = {
        'localStorage'  : localStorage,
        'sessionStorage': sessionStorage
    }
    // 变量赋值
    let storage = storageRules[type]
    // 赋值缓存
    moduleList[name].state = JSON.parse(storage.getItem('_' + name)) || moduleList[name].state
    // 清理缓存
    storage.removeItem('_' + name)
    // 注册事件：页面隐藏时进行缓存
    window.addEventListener('pagehide', () => {
        storage.setItem('_' + name, JSON.stringify(moduleList[name].state))
    })
}

// 遍历文件
moduleFiles.keys().forEach(key => {
    let fileName  = key.match(/\.\/(\S*)\.module\.js/)[1]
    moduleList[fileName] = moduleFiles(key).default
    if (moduleList[fileName].keepAlive) keepAlive(fileName, moduleList[fileName].keepAlive)
})

// 创建实例
export default new Vuex.Store({
    // 模块规则
    modules: moduleList,
    // 严格模式
    strict: process.env.NODE_ENV !== 'production'
})
