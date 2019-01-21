<template>
    <div class="blog">
        <div class="center_wrapper">
            <h1>Blog</h1>
            <ul>
                <li v-for="post in posts" v-bind:key="post.title">
                    <router-link :to="{name: 'blog_single', params: {articleName: post.slug}}">{{ post.title }}</router-link>
                </li>
            </ul>
        </div>
        <MainFooter></MainFooter>
    </div>
</template>

<script>
import MainFooter from '@/components/MainFooter.vue';

export default {
    name: 'blog',
    data: function() {
        return {}
    },
    components: {
        MainFooter,
    },
    computed: {
        posts: function() {
            return this.$store.state.posts
        }
    }
}
</script>


<style lang="less" scoped>
@import "../variables.less";

div.blog {
    min-height: 100vh;
    padding-top: 4rem;
    box-sizing: border-box;

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
}
</style>
