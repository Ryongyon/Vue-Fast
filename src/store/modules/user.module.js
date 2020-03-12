export default {
    namespaced: true,
    keepAlive: 'localStorage',
    state: {
        // 用户数据
        data: {}
    },
    mutations: {
        init(state) {
            state.data = {}
        },
        set(state, data) {
            state.data = data
        }
    },
    actions: {
        init(context) {
            context.commit('init')
        },
        set(context, data) {
            context.commit('set', data)
        }
    }
}