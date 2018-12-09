<template>
    <ul>
        <li v-for="tutorial in tutorials" :key="tutorial.slug">
            <router-link :to="{name: 'tutorial_single', params: {tutorialName: tutorial.slug}}">{{ tutorial.title }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    computed: {
        tutorials: function() {
            return this.$store.state.tutorials
        }
    }
}
</script>

<style scoped lang="less">
ul {
    background-color: #490188;
    margin: 0;
    padding-left: 0;

    li {
        list-style: none;

        a {
            color: white;
            display: block;
            padding: 1rem;
            text-decoration: none;
        }

        &:hover {
            background-color: rgba(255,255,255,0.3);
        }
    }
}
</style>
