<template>
    <ul class="links">
        <li v-on:click="clicked">
            <router-link to="/blog">Blog</router-link>
        </li>
        <li v-on:click="clicked">
            <router-link to="/tutorial">Tutorials</router-link>
        </li>
        <li>
            <a href="https://piccolo-orm.readthedocs.io/en/latest/">
                Docs
                <font-awesome-icon icon="external-link-alt" />
            </a>
        </li>
        <li>
            <a
                href="https://github.com/telerytech/piccolo"
                v-on:click="clicked"
            >
                Github
                <font-awesome-icon icon="external-link-alt" />
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    methods: {
        clicked: function() {
            this.$emit("navigating")
        }
    }
}
</script>

<style scoped lang="less">
svg {
    font-size: 0.7em;
    padding-left: 0.1rem;
    vertical-align: top;
}
</style>