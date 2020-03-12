<template>
    <div id="User">
        <keep-alive :include="$store.state.router.cache">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'User'
}
</script>

<style scoped lang="scss">
</style>
