<template>
    <div class="sidebar_tab">
        <a href="#" v-on:click.prevent="showSidebar">></a>
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
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    top: 50%;
    left: 0;
    z-index: 100;

    @media(min-width: @mobile_width) {
        display: none;
    }

    a {
        color: white;
        display: block;
        padding: 3rem 1rem;
        text-decoration: none;
    }
}
</style>
