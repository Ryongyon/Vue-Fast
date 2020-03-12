export default [
    {
        path: '/admin',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/index.vue'),
        children: [
            {
                path: '',
                name: 'Welcome',
                meta: {
                    title: '后台管理',
                    roles: ['Admin'],
                    requireAuth: true
                },
                component: () => import(/* webpackChunkName: "welcome" */ '@/views/admin/welcome.vue')
            }
        ]
    }
]
