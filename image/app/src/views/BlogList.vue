<template>
    <div>
        <div class="center_wrapper">
            <h1>Blog</h1>
            <ul>
                <li v-for="post in posts" v-bind:key="post.title">
                    <router-link :to="{name: 'blog_single', params: {articleName: post.slug}}">{{ post.title }}</router-link>
                </li>
            </ul>
        </div>
        <custom-footer></custom-footer>
    </div>
</template>

<script>
import Footer from '../components/Footer.vue';

export default {
    name: 'blog',
    data: function() {
        return {}
    },
    components: {
        'custom-footer': Footer
    },
    computed: {
        posts: function() {
            return this.$store.state.posts
        }
    }
}
</script>


<style lang="less" scoped>
@purple: #490188;

ul {
    padding: 0;

    li {
        font-size: 1.2rem;
        list-style: none;
        padding: 0.5rem 0;

        a {
            font-size: 1.3rem;
            font-weight: bolder;
            text-decoration: none;
        }
    }
}
</style>
