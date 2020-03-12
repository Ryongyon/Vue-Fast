<template>
    <div id="Error">
        <centered-Layout>
            <h1>{{ this.code }}</h1><p>{{ this.msg }}</p>
        </centered-Layout>
    </div>
</template>

<script>
export default {
    name: 'Error',
    data: () => ({
        code: '',
        msg : ''
    }),
    created() {
        this.init(this.$route.path)
    },
    beforeRouteUpdate(to, from, next) {
        this.init(to.path)
        next()
    },
    methods: {
        init(path) {
            const msgRules  = { '/401': '登录信息已失效，请重新登录', '/403': '拒绝访问', '/404': '页面不存在', '/500': '服务器错误' }
            this.code = this.$route.params.code || path.replace('/', '') || '000'
            this.msg  = this.$route.params.msg  || msgRules[path]  || '未知错误'
        }
    }
}
</script>

<style scoped lang="scss">
#Error::v-deep {
    h1 {
        font-size: 8rem;
    }
    p {
        font-size: 1rem;
        font-weight: 600;
    }
    h1, p {
        margin: 0;
    }
}
</style>
