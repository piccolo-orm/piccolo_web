<template>
    <div class="sidebar_tab">
        <a href="#" v-on:click.prevent="showSidebar"><span><font-awesome-icon icon="caret-right" /></span> Tutorials menu</a>
    </div>
</template>

<script>
export default {
    methods: {
        showSidebar: function() {
            this.$emit('showSidebar');
        }
    }
}
</script>

<style scoped lang="less">
@import "../../variables.less";

div.sidebar_tab {
    background-color: @purple;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    padding-top: 4rem;

    @media(min-width: @mobile_width) {
        display: none;
    }

    a {
        color: rgba(255,255,255,0.9);
        display: block;
        font-size: 0.7rem;
        font-weight: bolder;
        padding: 0.8rem;
        text-transform: uppercase;
        text-align: center;
        text-decoration: none;

        span {
            margin-right: 0.2em;
        }
    }
}
</style>
