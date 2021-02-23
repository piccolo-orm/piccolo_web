<template>
    <div id="app">
        <MainNav />
        <slot></slot>

        <MainFooter />
        <PermissionPopup />
    </div>
</template>


<script>
import MainFooter from "@/components/MainFooter.vue"
import MainNav from "@/components/MainNav/Index.vue"
import PermissionPopup from "@/components/PermissionPopup.vue"

export default {
    components: {
        PermissionPopup,
        MainNav,
        MainFooter,
    },
}
</script>


<style lang="less">
@import "../variables.less";

#app {
    font-family: "Open Sans", "Source Sans Pro", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: lighten(black, 20%);
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

h1,
h2,
h3 {
    color: @medium_blue;
}

p,
li {
    color: darken(@medium_blue, 5%);
    line-height: 1.5;
    font-size: 1.1rem;
}

a {
    color: @light_blue;
    text-decoration: none;
}

div.center_wrapper {
    max-width: 48rem;
    box-sizing: border-box;
    padding: 1rem;
    margin: 0 auto;

    h1 {
        font-size: 1.8rem;

        @media (max-width: @mobile_width) {
            font-size: 1.4rem;
        }
    }

    img {
        max-width: 100%;
    }
}
</style>
