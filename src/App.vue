<template>
    <div id="app">
        <keep-alive :include="$store.state.router.cache">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
