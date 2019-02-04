<template>
    <div id="app">
        <MainNav/>
        <router-view/>
        <PermissionPopup />
    </div>
</template>


<script>
import MainNav from './components/MainNav/Index.vue'
import PermissionPopup from './components/PermissionPopup.vue'

export default {
    components: {
        PermissionPopup,
        MainNav
    },
    watch: {
        $route: function (route) {
            // Reset default title and description.
            this.$seo.updateTags({
                title: 'Piccolo ORM',
                description: "A fast, async ORM for Python, that's easy to learn."
            })
        }
    }
}
</script>


<style lang="less">
@import "./variables.less";

#app {
    font-family: 'Open Sans', 'Source Sans Pro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
}

html {
   margin: 0px;
   padding: 0px;
   min-height: 100vh;
}

body {
    margin: 0px;
    min-height: 100vh;
    position: relative;
}

a {
    color: lighten(@purple, 15%);
}
</style>
