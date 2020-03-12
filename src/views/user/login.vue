<template>
    <div id="Login">
        <centered-Layout>
            <h1>登录页</h1>
            <a href="javascript:;" @click="login('13OnTheTrack')">模拟登录 - 管理员</a>
            <a href="javascript:;" @click="login('Jack')">模拟登录 - 普通用户</a>
        </centered-Layout>
    </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        login(username) {
            this.$axios({
                url: "https://my-json-server.typicode.com/ryongyon/vue-fast/users?username=" + username
            }).then(res => {
                // 将用户数据存储到 Vuex
                this.$store.dispatch('user/set', res[0])
                // 将 Token 存储到 Cookie 7天后过期
                this.$cookie.set('token', res[0].token, 7)
                // 根据用户角色跳转后台
                if (res[0].role === 'Admin') {
                    this.$router.replace({ path: '/admin' });
                } else {
                    this.$router.replace({ path: `/user/profile/${res[0].username}` });
                }
                //console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped lang="scss">
</style>
