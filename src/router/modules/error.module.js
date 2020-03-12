export default [
    {
        path: '/([1-9]\\d{0,2})',
        name: 'Error',
        component: () => import(/* webpackChunkName: "error" */ '@/views/error/index.vue')
    }
]
