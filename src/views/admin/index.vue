<template>
    <div id="Admin">
        <keep-alive :include="$store.state.router.cache">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'Admin'
}
</script>

<style scoped lang="scss">
</style>
