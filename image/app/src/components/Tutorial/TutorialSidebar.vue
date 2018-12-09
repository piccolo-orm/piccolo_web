<template>
    <ul>
        <li v-for="tutorial in tutorials" :key="tutorial.slug">
            <a href="#" v-on:click.prevent="navigate">{{ tutorial.title }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    computed: {
        tutorials: function() {
            return this.$store.state.tutorials
        }
    },
    methods: {
        navigate: function() {
            console.log('Navigating ...')
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
