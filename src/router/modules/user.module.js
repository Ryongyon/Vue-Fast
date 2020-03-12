export default [
    {
        path: '/user',
        name: 'User',
        redirect: {
            name: 'Login'
        },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
        children: [
            {
                path: 'login',
                name: 'Login',
                meta: {
                    title: '登录'
                },
                component: () => import(/* webpackChunkName: "login" */ '@/views/user/login.vue')
            },
            {
                path: 'register',
                name: 'Register',
                meta: {
                    title: '注册'
                },
                component: () => import(/* webpackChunkName: "register" */ '@/views/user/register.vue')
            },
            {
                path: 'profile/:username',
                name: 'Profile',
                component: () => import(/* webpackChunkName: "profile" */ '@/views/user/profile.vue')
            }
        ]
    }
]
