export default {
    namespaced: true,
    state: {
        width : window.screen.width,
        height: window.screen.height,
        clientWidth : document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
        userAgent: navigator.userAgent
    },
    mutations: {},
    actions: {}
}