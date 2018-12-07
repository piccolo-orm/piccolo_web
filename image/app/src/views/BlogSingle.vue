<template>
    <div>
        <div class="center_wrapper">
            <p><router-link :to="{name: 'blog'}">All posts</router-link></p>
            <div v-html="html"></div>
        </div>
        <custom-footer></custom-footer>
    </div>
</template>

<script>
import axios from 'axios';
import Footer from '../components/Footer.vue';

export default {
    props: ['articleName'],
    data: function() {
        return {
            html: '',
        }
    },
    components: {
        'custom-footer': Footer
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
            setTimeout(
                () => Prism.highlightAll(),
                0
            )
        })
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
