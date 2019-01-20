<template>
    <ul class="links">
        <li><a href="https://github.com/telerytech/piccolo" v-on:click="clicked">Github</a></li>
        <li v-on:click="clicked"><router-link to="/tutorial">Tutorials</router-link></li>
        <li v-on:click="clicked"><router-link to="/blog">Blog</router-link></li>
    </ul>
</template>

<script>
export default {
    methods: {
        clicked: function() {
            this.$emit('navigating')
        }
    }
}
</script>
