<template>
    <div id="profile">
        <centered-Layout>
            <h1>用户页</h1>
            <figure class="avatar"><img :src="this.user.avatar" alt="avatar"></figure>
            <p>昵称: {{ this.user.nickname }}</p>
            <a v-if="$store.state.user.data.username === this.user.username" href="javascript:;" @click="logOut()">退出登录</a>
        </centered-Layout>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data: () => ({
        user: {
            username: '',
            nickname: '加载中...',
            avatar  : 'https://cdn.v2ex.com/gravatar?s=200&r=G&d=mm'
        }
    }),
    created() {
        this.init(this.$route.params.username)
    },
    beforeRouteUpdate(to, from, next) {
        this.init(to.params.username)
        next()
    },
    methods: {
        init(username) {
            this.$axios({
                url: "https://my-json-server.typicode.com/ryongyon/vue-fast/users?username=" + username
            }).then(res => {
                // 修改标题
                document.title = `${res[0].nickname} - ${process.env.VUE_APP_TITLE}`
                // 赋值数据
                this.user = res[0]
            }).catch(err => {
                console.log(err)
                // 用户不存在跳转到404页面
                this.$router.replace({ path: '/404' })
            })
        },
        logOut() {
            // 删除 Token
            this.$cookie.del('token')
            // 跳转到首页
            this.$router.replace({ path: '/' })
        }
    }
}
</script>

<style scoped lang="scss">
.avatar {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border-radius: 50%;
    background-color: #eee;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &:not([src]), &[src=""] {
            opacity:0
        }
    }
}
</style>
