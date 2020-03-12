export default [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true
        },
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/index.vue')
    }
]
