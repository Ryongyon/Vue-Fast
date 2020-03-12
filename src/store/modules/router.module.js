export default {
    namespaced: true,
    keepAlive: 'sessionStorage',
    state: {
        // 路由缓存
        cache: []
    },
    mutations: {
        push(state, name) {
            if (!state.cache.includes(name)) state.cache.push(name)
        }
    },
    actions: {
        push(context, name) {
            context.commit('push', name)
        }
    }
}