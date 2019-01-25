<template>
    <div class="blog_single">
        <div class="center_wrapper">
            <p><router-link :to="{name: 'blog'}">All posts</router-link></p>
            <div v-html="html"></div>
        </div>
        <MainFooter></MainFooter>
    </div>
</template>

<script>
import axios from 'axios';
import MainFooter from '@/components/MainFooter.vue';

export default {
    props: ['articleName'],
    data: function() {
        return {
            html: '',
        }
    },
    components: {
        MainFooter,
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
        axios.get('/html/posts/' + currentPost.src).then(function(response) {
            app.html = response.data
        })
    }
}
</script>

<style lang="less">
div.blog_single {
    padding-top: 4rem;

    h2 {
        margin-top: 2.5rem;
    }
    p, li {
        font-size: 1.1rem;
    }
}
</style>
