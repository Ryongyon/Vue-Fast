<template>
    <div id="Index">
        <centered-Layout>
            <h1>首页</h1>
            <router-link to="/admin">后台</router-link>
            <router-link to="/user/login">登录</router-link>
            <router-link to="/404">错误页</router-link>
        </centered-Layout>
    </div>
</template>

<script>
export default {
    name: 'Index'
}
</script>

<style scoped lang="scss">
</style>
