<template>
    <ul class="links">
        <li v-on:click="clicked">
            <g-link to="/ecosystem/">Ecosystem</g-link>
        </li>
        <li v-on:click="clicked">
            <g-link to="/blog/">Blog</g-link>
        </li>
        <li v-on:click="clicked">
            <g-link to="/tutorial/">Tutorials</g-link>
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
        clicked: function () {
            this.$emit("navigating")
        },
    },
}
</script>

<style scoped lang="less">
ul.links {
    li {
        a.active {
            border-bottom: 3px solid rgba(255, 255, 255, 0.5);
        }
        svg {
            font-size: 0.7em;
            padding-left: 0.1rem;
            vertical-align: top;
        }
    }
}
</style>
