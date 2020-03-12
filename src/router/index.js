/*********************
    自动化注册：路由
**********************/
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 模块列表
const moduleList  = []

// 模块文件
const moduleFiles = require.context('./modules', true, /\.module\.js/)

// 遍历文件
moduleFiles.keys().forEach(key => {
    moduleList.push(...moduleFiles(key).default)
})

// 创建实例
const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes: moduleList
})

// 赋值全局变量
const utils = Vue.prototype

// 全局前置守卫：匹配不到路由跳转到404页面
router.beforeEach((to, from, next) => {
    to.matched.length === 0 ? next({ path: '/404', replace: true }) : next()
})

// 全局前置守卫：判断是否需要重获用户数据
router.beforeEach((to, from, next) => {
    let store = router.app.$store
    if (!store.state.user.data.token && utils.$cookie.get('token')) {
        utils.$axios({
            url: "https://my-json-server.typicode.com/ryongyon/vue-fast/users?token=" + utils.$cookie.get('token')
        }).then(res => {
            console.log('okok')
            store.dispatch('user/set', res[0])
        }).catch(err => {
            console.log(err)
            next({ path: '/401', replace: true })
        })
    }
    next()
})

// 全局前置守卫：判断是否需要初始化用户数据
router.beforeEach((to, from, next) => {
    let store = router.app.$store
    if (store.state.user.data.token && !utils.$cookie.get('token')) store.dispatch('user/init')
    next()
})

// 全局前置守卫：已登录状态访问「 登录 / 注册 」跳转个人主页
router.beforeEach((to, from, next) => {
    let username = router.app.$store.state.user.data.username
    username && ['Login','Register'].includes(to.name) ? next({ path: `/user/profile/${username}`, replace: true }) : next()
})

// 全局前置守卫：判断「 路由缓存 」标识
router.beforeEach((to, from, next) => {
    let store = router.app.$store
    if (to.meta.keepAlive && !store.state.router.cache.includes(to.name)) store.dispatch('router/push', to.name)
    next()
})

// 全局前置守卫：判断「 需要登录 」标识
router.beforeEach((to, from, next) => {
    let token = router.app.$store.state.user.data.token
    to.meta.requireAuth && !token ? next({ path: '/user/login', replace: true }) : next()
})

// 全局前置守卫：判断「 需要权限 」标识
router.beforeEach((to, from, next) => {
    let role = router.app.$store.state.user.data.role
    to.meta.roles && !to.meta.roles.includes(role) ? next({ path: '/403', replace: true }) : next()
})

// 全局前置守卫：路由发生变化时修改页面标题
router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
    next()
})

export default router
