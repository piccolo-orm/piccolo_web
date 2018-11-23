<template>
    <div class="center_wrapper">
        <p><router-link :to="{name: 'blog'}">All posts</router-link></p>
        <div v-html="html"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['articleName'],
    data: function() {
        return {
            html: '',
        }
    },
    computed: {
        posts: function() {
            return this.$store.state.posts
        },
    },
    created: function() {
        let currentPost = this.posts.filter(
            (element) => element.slug == this.articleName
        )[0]

        let app = this;
        axios.get('/html/' + currentPost.src).then(
            response => app.html = response.data
        )
    }
}
</script>

<style lang="less">
h2 {
    margin-top: 2.5rem;
}
p, li {
    font-size: 1.1rem;
}
</style>
